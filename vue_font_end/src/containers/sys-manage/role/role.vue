<template>
  <div class="role">
    <div class="new-role">
      <Button type="primary" icon="plus-round" @click="addRole" class="add" >新增</Button>
    </div>

    <Table v-if="listData" :columns="columns" :data="listData" class="table"></Table>

  </div>
</template>

<script>

  import { Menu,Modal,Button,Checkbox,Form,Input,SelectRow,Col, } from 'iview';
  export default {
    name: "role",
    data(){
      return {
        api:"http://192.168.31.174:8080",
        formItem:{
          id:"",
          name:"",
          code:"",
          remark:""
        },
        loading:true,
        columns: [
          {
            title: '名称',
            key: 'roleName',
          },
          {
            title: '编码',
            key: 'roleCode',
          },
          {
            title: '备注',
            key: 'mark',
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
                  this.showAuth(params)
              }
              }
          }, '查看权限'),
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
              type: 'success',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
              this.auth(params)
          }
        }
        }, '授权'),
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
        indeterminate: true,
        firstCheckAll: false,
        firstCheckGroup:[],
        secondCheckAll: false,
        secondCheckGroup: [],
        thirdCheckAll: false,
        thirdCheckGroup: [],
        authInfo:[],
        text:["99763783"],
        listData:""
    }
    },
    created(){
      //请求角色列表
      this.$http.get(`${this.api}/sys/role/list`).then(response=>{
        let res = response.data;
        if(res.result){
          this.listData = res.data;
        }
      })
    },
    methods:{
      showAuth(params){
        this.$router.push({path:"/sys/role/auth",query:{id:params.row.id,checked:true}});
      },
      addRole(){
        this.$router.push("/sys/role/edit-role")
      },

      auth(params){
        this.$router.push({path:"/sys/role/auth",query:{id:params.row.id}});
      },
      edit(params){
        //this.$router.push("/sys/role/edit-role")
        /*this.editVisible = true;
        this.formItem.name = params.row.roleName;
        this.formItem.code = params.row.roleCode;
        this.formItem.remark = params.row.remark;*/

        this.$router.push({path:"/sys/role/edit-role",query:{id:params.row.id}})
      },
      remove(params){
        this.$Modal.confirm({
          title: '警告',
          content: '<p>确认删除该角色吗</p>',
          loading: true,
          onOk: () => {
            this.$store.dispatch("modalLoading");
            this.$http.get(`${this.api}/sys/role/del`,{
              params:{id:params.row.id}
            }).then(response=>{
              let res = response.data;

              this.$http.get(`${this.api}/sys/role/list`).then(response=>{
                let res = response.data;
                if(res.result){
                  this.$Modal.remove();
                  this.$Message.info('删除成功');
                  this.listData = res.data;
                }else{
                  this.$Message.info(res.msg);
                }
              })
            })
          }
        });
      }
    },
    computed:{

    }

  }
</script>

<style lang="stylus">
  @import './role.styl'
</style>
