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
              <Select v-model="searchContent.customerType" style="width:200px" placeholder="请选择客户类型">
                <Option v-for="item in cuntomerType" :value="item.value" :key="item.value">{{ item.name }}</Option>
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
          pageSizeList:[10,50,100],
          pageSize:10,
          total:0,
          currentPage:1,
          visible:false,
          loading:true,
          cuntomerType: [
            {
              name:"请选择客户类型",
              value:"DEFAULT"
            },
            {
              name:"门店",
              value:"STORE"
            },
            {
              name:"代理商",
              value:"AGENT"
            },
            {
              name:"大客户",
              value: "BIGCUSTOMER"
            },
          ],
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
              width:110,
            },
            {
              title: '状态',
              key: 'status',
            },
            {
              title: '进货价',
              key: 'price',
            },
            {
              title: '关联系统账户',
              key: 'user',
            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              width:180,
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
            customerType: 'DEFAULT',
            mobilePhone:""
          },
          listData:""
        }
      },
      mounted() {
        //初始请求分页
        let params = {
          currentPage:this.currentPage,
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

          //如果没有查询条件，查询所有
          if(this.searchContent.customerName === "" &&this.searchContent.customerType==="DEFAULT"&&this.searchContent.mobilePhone==="" ){
            this.pagination();
            return
          }

          //加上分页参数

          this.searchContent.currentPage = `${this.currentPage}`;
          this.searchContent.pageSize= `${this.pageSize}`;
          this.$http.post(`${this.$api}/base/customer/solrCustomer`,{
            ...this.searchContent
          }).then(response=>{
            let res = response.data;
            console.log(res)

              this.listData = res.customerList;
            //记录总页数
              this.total = res.count;


          })
        },
        //查看信息
        show (params) {
          this.$router.push({path:'/baseData/client/edit-client',query:{id:params.row.id,checked:true}})
        },
        //编辑
        edit(params){
          this.$router.push({path:'/baseData/client/edit-client',query:{id:params.row.id}})
        },
        //删除
        remove (params) {
          let id = params.row.id;
          console.log(typeof id)
          this.$Modal.confirm({
            content: '<p>确认删除此条数据吗？</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('modalLoading');
              this.$http.get(`${this.$api}/base/customer/delCustomer`,{params:{ id }}).then(response=>{
                let res = response.data;
                console.log(res)
                if(res.result){
                  this.pagination();//请求列表数据
                  this.$Modal.remove();
                  this.$Message.info('删除成功');
                }
              })
            }
          });
        },

        //分页函数
        pagination(customsParams){
          let defaultParams = {
            currentPage :1,
            pageSize : 10
          };
          let params = customsParams || defaultParams;

          this.$http.get(`${this.$api}/base/customer/findCustomerAll`,{params}).then(response=>{
            let res = response.data;

            this.listData = res;
            if(res.count === 0){
              this.listData = []
            }else{
              this.listData = res.pageList;
              this.total = res.count;
            }
            console.log(res)
          })
        },
        searchPagination(pageParams){
          let params={...pageParams,...this.searchContent}
          console.log(params)
        },
        //点击分页
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          let params = {
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };
          if(this.searchContent.customerType!==""){
            this.searchPagination(params);
          }
          this.pagination(params)
        },
        changePageSize(currentPageSize){
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          let params = {
            currentPage:this.currentPage,
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
