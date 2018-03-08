<template>
    <div class="supplier">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem prop="user">
              <Input type="text" v-model="searchContent.id" placeholder="请输入ID"/>
            </FormItem>
            <FormItem prop="account">
              <Input type="text" v-model="searchContent.account" placeholder="请输入搜索账户"/>
            </FormItem>
            <FormItem prop="phone">
              <Input type="text" v-model="searchContent.phone" placeholder="请输入搜索电话"/>
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
      <Modal
        v-model="visible"
        title="查看详情"
        :loading="loading"
        @on-cancel = "cancel"
        @on-ok="done">
        <div class="edit-wrapper">
          <Form ref="formValidate" :model="formValidate" :label-width="80">
            <FormItem label="ID" prop="id">
              <Input v-model="formValidate.id" disabled placeholder="请输入ID" />
            </FormItem>
            <FormItem label="账户" prop="account">
              <Input v-model="formValidate.account" disabled placeholder="请输入账户"/>
            </FormItem>
            <FormItem label="角色" prop="role">
              <Input v-model="formValidate.roleName" disabled />
            </FormItem>
            <FormItem label="头像">
              <FormItem prop="date">
                <Avatar shape="square" icon="person" size="large" :src="formValidate.avatar" class="avatar-edit-display"/>
              </FormItem>
            </FormItem>
            <FormItem label="电话" prop="phone">
              <Input v-model="formValidate.phone" disabled placeholder="请输入电话"/>
            </FormItem>
            <FormItem label="备注" prop="remark">
              <Input v-model="formValidate.remark" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"/>
            </FormItem>
          </Form>
        </div>
      </Modal>

    </div>
</template>

<script>
  import { Table,Page,Form,Input,Select,Modal,Row,Col } from 'iview';
  export default {
      name: "supplier",
      data(){
        return {
          pageSizeList:[30,50,100],
          pageSize:30,
          total:0,
          currentPage:1,
          visible:false,
          loading:true,
          searchContent: {
            id: '',
            account: '',
            phone:"",
            role:""
          },
          columns: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: 'ID',
              key: 'id',
              width:180

            },
            {
              title: '名称',
              key: 'name',

            },
            {
              title: '类型',
              key: 'type',
            },
            {
              title: '地区',
              key: 'area',
            },
            {
              title: '欠款',
              key: 'money',

            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('div', [

                  h('Button', {
                    props: {
                      type:"primary",
                      size: 'small'
                    },
                    style: {
                      color:"#fff",
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
                  }, '删除'),
                  h('Button', {
                      props: {
                        size: 'small'
                      },
                      class:"status",
                      style:{
                        background:params.row.status?"#13D149":"#ccc",
                        color:"#fff"
                      },
                      on: {
                        click: () => {
                          this.statusEdit(params)
                        }
                      }
                    },
                    params.row.status?"禁用": '启用')
                ]);
              }
            }
          ],
          formValidate: {
            id: '',
            account: '',
            roleId:"",
            phone: '',
            avatarUrl:"",
            remark:""
          },
          imgName: '',
          uploadList: [],
          listData:""
        }
      },
      mounted(){
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
          this.$router.push('/baseData/supplier/edit-supplier')
        },
        cancel(){

        },
        //提交搜索
        handleSubmit() {
          console.log(this.searchContent)
          /*
                    this.$http.post(`${this.$api}/search`,{data:this.searchContent}).then(response=>{
                      let res = response.data;
                      this.listData = res.data;
                    })
          */
        },
        //切换状态
        statusEdit(params){
          //更新管理员状态
          this.$http.post(`${this.$api}/supplier/update`,{id:params.row.id,status:params.row.status}).then(response=>{
            let res = response.data;
            if(res.result){
              console.log(res)
              this.$Message.info('修改成功');
              //更新成功后重新获取表格数据
              this.pagination()
            }
          })
        },
        //编辑
        edit(params){
          this.$router.push({path:'/baseData/supplier/edit-supplier',query:{id:params.row.id}})
        },
        //删除
        remove (params) {
          let id = params.row.id;
          this.$Modal.confirm({
            content: '<p>确认删除此条数据吗？</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('modalLoading');
              console.log(this)
              this.$http.post(`${this.$api}/supplier/delete`,{id}).then(response=>{
                let res = response.data;
                if(res.result){
                  this.pagination();
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
          this.$http.get(`${this.$api}/supplier/getList`,{params}).then(response=>{
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
@import './supplier.styl';
</style>
