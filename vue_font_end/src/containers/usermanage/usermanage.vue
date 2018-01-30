<template>
    <div class="manager">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem prop="user">
              <Input type="text" v-model="searchContent.id" placeholder="请输入ID"/>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="searchContent.account" placeholder="请输入搜索账户"/>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="searchContent.account" placeholder="请输入搜索电话"/>
            </FormItem>
            <FormItem prop="password">
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
          <Table :columns="columns" :data="listData" class="table"></Table>
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
  import axios from 'axios';
  import { API } from '../../const/api';
  import { HOST } from '../../const/api';
  import { Table,Page,Form,Input,Select,Modal,Row,Col,Upload,Avatar } from 'iview';
    export default {
        name: "usermanage",
        data(){
            return {
              pageSizeList:[30,50,100],
              pageSize:30,
              currentPage:1,
              visible:false,
              loading:true,
              searchContent: {
                id: '',
                account: '',
                phone:"",
                role:""
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
                  title: '账户',
                  key: 'account',

                },
                {
                  title: '头像',
                  key: 'avatar',
                  width:100,
                  render: (h, params) => {
                    return h('div', [
                      h('Avatar', {
                        props: {
                          shape:"square",
                          src: `${params.row.avatar}`,
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
                },
                {
                  title: '角色',
                  key: 'roleName',
                },
                {
                  title: '电话',
                  key: 'phone',

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
              /*ruleValidate: {
                id: [
                  { required: true, message: 'ID不能为空', trigger: 'blur' }
                ],
                account: [
                  { required: true, message: '账户不能为空', trigger: 'blur' }
                ],
                phone: [
                  { required: true, message: '请填写电话', trigger: 'blur' }
                ]
              },*/

              imgName: '',
              visible: false,
              uploadList: []
            }
        },
      mounted() {
        //初始请求分页
        this.pagination()
      },

      methods:{
        done(){
          this.visible = false
        },
        addMember(){
          this.$router.push('/sys/user/addmember')
        },
        cancel(){
          setTimeout(()=>{
          },200)

        },
        //提交搜索
        handleSubmit(name) {
          axios.get(`${HOST}/myshop/validate`).then(res=>{
            console.log(res)
          })
/*
              this.$refs[name].validate((valid) => {
                if (valid) {
                  this.$Message.success('Success!');
                } else {
                  this.$Message.error('Fail!');
                }
              })
*/
            },
        //查看信息
        show (params) {
          //this.formValidate.roleId = params.row.roleId;
          this.formValidate.roleName = params.row.roleName;
          this.formValidate.id = params.row.id;
          this.formValidate.avatar = params.row.avatar;
          this.formValidate.account = params.row.account;
          this.formValidate.phone = params.row.phone;
          this.formValidate.remark = params.row.remark;
          this.visible = true
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
              axios.post(`${API}/auth/delete`,{id}).then(response=>{
                let res = response.data;
                if(res.result){

                  this.$store.dispatch('getList');
                  this.$Modal.remove();
                  this.$Message.info('删除成功');
                }
              })
            }
          });
        },
        //切换状态
        statusEdit(params){
          //更新管理员状态
            axios.post(`${API}/auth/updatestatus`,{id:params.row.id,status:params.row.status}).then(response=>{
              let res = response.data;
              if(res.result){
                console.log(res)
                this.$Message.info('修改成功');
                //更新成功后重新获取表格数据
                this.$store.dispatch('getList');
              }
            })
        },
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        //分页函数
        pagination(){
          let params = {
            pageNum:this.currentPage,
            pageSize:this.pageSize
          };
          this.$store.dispatch('getList',params)
        },
        //点击分页
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          this.pagination()
        },
        changePageSize(currentPageSize){
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          this.pagination()
        },
        /*-------上传头像--------*/
        },
        computed:{
          listData(){
            return this.$store.state.usermanage.list
          },
          total(){
            return this.$store.state.usermanage.total
          }
        }
    }
</script>

<style lang="stylus">
  @import 'usermanager.styl'
</style>
