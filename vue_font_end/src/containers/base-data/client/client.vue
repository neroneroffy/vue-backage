<template>
    <div class="client">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem prop="user">
              <Input type="text" v-model="searchContent.customerName" placeholder="请输入客户名"/>
            </FormItem>
            <FormItem prop="phone">
              <Input type="text" v-model="searchContent.mobilePhone" placeholder="请输入手机号"/>
            </FormItem>
            <FormItem >
              <Select v-model="searchContent.customerType" style="width:200px" placeholder="请选择客户状态">
                <Option v-for="item in roleList" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Table :columns="columns" :data="listData" class="table" v-if="listData"></Table>
      <div class="pagination">
        <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" placement="top" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
      </div>

    </div>
</template>

<script>
  import { Table,Page,Form,Input,Select,Modal,Row,Col } from 'iview';
    export default {
      name: "client",
      data(){
        return {
          pageSizeList:[30,50,100],
          pageSize:30,
          total:0,
          currentPage:1,
          visible:false,
          loading:true,
          roleList: ["请选择客户状态","大客户","中客户","小客户"],
          columns: [
            {
              title: '客户名称',
              key: 'customerName',
            },
            {
              title: '客户类型',
              key: 'customerType',
            },
            {
              title: '手机',
              key: 'mobilePhone',
            },
            {
              title: '座机',
              key: 'telephone',
            },
            {
              title: '微信',
              key: 'wechat',
            },
            {
              title: '首次成交时间',
              key: 'firstPurchaseTime',
            },
            {
              title: '状态',
              key: 'status',
            },
            {
              title: '关联系统账户',
              key: 'user',
            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              width:200,
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.show(params)
                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.edit(params)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.remove(params)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          searchContent: {
            customerName: '',
            customerType: '',
            mobilePhone:""
          },
          listData:""
        }
      },
      mounted() {
        //初始请求分页
        let params = {
          pageNum:this.currentPage,
          pageSize:this.pageSize
        };
        this.pagination(params)
      },

      methods:{
        done(){
          this.visible = false
        },
        addMember(){
          this.$router.push('/baseData/client/edit-client')
        },
        cancel(){

        },
        //提交搜索
        handleSubmit() {
          if(this.searchContent.customerType === "请选择客户状态"){
            this.searchContent.customerType = ""
          }
          console.log(this.searchContent)
          /*
                    this.$http.post(`${this.$api}/search`,{data:this.searchContent}).then(response=>{
                      let res = response.data;
                      this.listData = res.data;
                    })
          */
        },
        //查看信息
        show (params) {
          this.$router.push({path:'/baseData/client/edit-client',query:{id:params.row._id,checked:true}})
        },
        //编辑
        edit(params){
          this.$router.push({path:'/baseData/client/edit-client',query:{id:params.row._id}})
        },
        //删除
        remove (params) {
          let id = params.row._id;
          this.$Modal.confirm({
            content: '<p>确认删除此条数据吗？</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('modalLoading');
              this.$http.post(`${this.$api}/customer/delete`,{id}).then(response=>{
                let res = response.data;
                if(res.result){
                  this.pagination();//请求列表数据
                  this.$Modal.remove();
                  this.$Message.info('删除成功');
                }
              })
            }
          });
        },

        handleSelectAll (status) {
          this.$refs.selection.selectAll(status);
        },
        //分页函数
        pagination(customsParams){
          let defaultParams = {
            pageNum :1,
            pageSize : 30
          };
          let params = customsParams || defaultParams;
          this.$http.get(`${this.$api}/customer/getList`,{params}).then(response=>{
            let res = response.data;
            if(res.result){
              this.listData = res.list;
              this.total = res.total;
            }
          })
        },
        //点击分页
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          let params = {
            pageNum:this.currentPage,
            pageSize:this.pageSize
          };

          this.pagination(params)
        },
        changePageSize(currentPageSize){
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          let params = {
            pageNum:this.currentPage,
            pageSize:this.pageSize
          };

          this.pagination(params)
        },

      },
      computed:{

      }

    }
</script>

<style scoped lang="stylus">
@import './client.styl';
</style>
