<template>
    <div class="manager">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem prop="user">
              <Input type="text" v-model="searchContent.nickName" placeholder="用户昵称"/>
            </FormItem>
            <FormItem prop="account">
              <Input type="text" v-model="searchContent.userName" placeholder="用户账号"/>
            </FormItem>
            <FormItem prop="phone">
              <Input type="text" v-model="searchContent.mobile" placeholder="手机号"/>
            </FormItem>
            <FormItem >
              <Select v-model="searchContent.role" style="width:200px" placeholder="请选择角色">
                <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
    export default {
      name: "usermanage",
      data(){
            return {
              api:"http://192.168.31.174:8080",
              pageSizeList:[30,50,100],
              pageSize:30,
              total:0,
              currentPage:1,
              visible:false,
              loading:true,
              searchContent: {
                nickName: '',
                userName: '',
                mobile:"",
              },
              roleList: [
                {
                  value: '',
                  label: '请选择角色'
                },
                {
                  value: 'role1',
                  label: '角色1'
                },
                {
                  value: 'role2',
                  label: '角色2'
                },
                {
                  value: 'role3',
                  label: '角色3'
                },
                {
                  value: 'role4',
                  label: '角色4'
                }
              ],
              columns: [
                {
                  title: '账户',
                  key: 'userName',
                },
                {
                  title: "昵称",
                  key: 'nickName',
                },
                /*{
                  title: '头像',
                  key: 'avatar',

                  render: (h, params) => {
                    return h('div', [
                      h('Avatar', {
                        props: {
                          shape:"square",
                          src: `${params.row.thumbnail}`,
                          //
                          icon:"person"
                        },
                        style: {
                          width: '50px',
                          height:'50px',
                          margin:'5px 0',
                          lineHeight:"50px",
                          fontSize:"30px"
                        },
                        on: {
                          click: () => {
                            this.show(params.index)
                          }
                        }
                      }),
                    ]);
                  }
                },*/
/*                {
                  title: '角色',
                  key: 'roleName',
                },*/
                {
                  title: '电话',
                  key: 'mobile',

                },
                {
                  title: '操作',
                  key: 'action',
                  align: 'center',
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
                      }, '删除'),
                      /*h('Button', {
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
                        params.row.status === "NORMAL"?"禁用": '启用')*/
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
              listData:[]
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
          this.$router.push('/sys/user/addmember')
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
        //查看信息
        show (params) {
          this.$router.push({path:`/sys/user/editmember`,query:{id:params.row.id,checked:true}})
        },
        //编辑
        edit(params){
          this.$router.push({path:'/sys/user/editmember',query:{id:params.row.id}})
        },
        //删除
        remove (params) {
          let id = params.row.id;
          this.$Modal.confirm({
            content: '<p>确认删除此条数据吗？</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('modalLoading');
              this.$http.get(`${this.api}/sys/user/del`,{params:{id:id}}).then(response=>{
                let res = response.data;
                if(res.result){
                  this.pagination();//请求列表数据
                  this.$Modal.remove();
                  this.$Message.success('删除成功');
                }
              })
            }
          });
        },
        //切换状态
        statusEdit(params){
          //更新管理员状态
            this.$http.post(`${this.$api}/auth/updatestatus`,{id:params.row.id,status:params.row.status}).then(response=>{
              let res = response.data;
              if(res.result){
                console.log(res)
                this.$Message.info('修改成功');
                //更新成功后重新获取表格数据
                this.pagination()
              }
            })
        },
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        //分页函数
        pagination(customsParams){
          let defaultParams = {
            currentPage :1,
            pageSize : 30
          };
          let params = customsParams || defaultParams;
          this.$http.post(`${this.api}/sys/user/list`,{...params}).then(response=>{
            let res = response.data;
            console.log(res);

            if(res.totalElements.length!==0){
              this.listData = res.content;
              this.total = res.totalElements;
            }
          })
        },
        //点击分页
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          let params = {
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };

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

<style lang="stylus">
  @import 'usermanager.styl'
</style>
