<template>
  <div class="role">
    <div class="new-role">
      <Button type="primary" icon="plus-round" @click="addRole" class="add" >新增</Button>
    </div>

    <Table v-if="this.$store.state.role.list" :columns="columns" :data="this.$store.state.role.list" class="table"></Table>
    <Modal
      v-model="visible"
      title="查看权限"
      :loading="loading"
      @on-cancel = "cancel"
      @on-ok="done">

      <div class=" first-level" v-for="v in authInfo">
        <div class="first-level-title">
          <Checkbox
            :value="v.status"
            :key="v.id"
            disabled
          >
            {{v.name}}
          </Checkbox>
        </div>
        <div v-model="secondCheckGroup" class="second-level">
          <div class="second-level-title">
            <Checkbox
              v-for="(item,k) in v.children"
              :label="item.id"
              :value="item.status"
              :key="item.id"
              disabled
            >
              {{item.name}}
              <div class="third-level">
                <Checkbox v-for="m in item.children" :value="m.status" disabled :key="m.id">
                  {{m.name}}
                </Checkbox>
              </div>
            </Checkbox>
          </div>
        </div>
      </div>


    </Modal>
    <Modal
      v-model="editVisible"
      title="编辑成员"
      @on-cancel="cancel"
      @on-ok="editDone"
    >
      <Form :model="formItem" :label-width="40">
        <FormItem label="名称">
          <Input v-model="formItem.name" placeholder="请填写名称"></Input>
        </FormItem>
        <FormItem label="编码">
          <Input v-model="formItem.code" placeholder="请输入编码"></Input>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注信息"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import axios from 'axios';
  import { API } from '../../const/api';
  import { Menu,Modal,Button,Checkbox,Form,Input,SelectRow,Col, } from 'iview';
  export default {
    name: "role",
    data(){
      return {
        formItem:{
          id:"",
          name:"",
          code:"",
          remark:""
        },
        visible:false,
        loading:true,
        editVisible:false,
        columns: [
          {
            title: 'ID',
            key: 'roleId',
          },
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
            key: 'remark',
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
        text:["99763783"]
    }
    },
    created(){
      this.$store.dispatch('getRoleList')
    },
    methods:{
      show(params){
        this.visible = true;
        axios.get(`${API}/authinfo/getauthinfo`,{
          params:{
            id:params.row.roleId
          }
        }).then(response=>{
          let res = response.data;
        if(res.result){
          this.authInfo = res.data[0].data;
          console.log(this.authInfo);
        }
      })
      },
      addRole(){
        this.$router.push("/sys/role/edit-role")
      },
      editDone(){
        this.editVisible = false;
      },
      auth(params){
        this.$router.push({path:"/sys/role/auth",query:{id:params.row.roleId}});

      },
      edit(params){
        this.editVisible = true;
        this.formItem.name = params.row.roleName;
        this.formItem.code = params.row.roleCode;
        this.formItem.remark = params.row.remark;
        console.log(666);
        //this.$router.push({path:"/sys/role/editrole",query:{id:params.row.roleId}})
      },
      cancel(){
        this.visible = false;
        this.editVisible = false;
      },
      done(){
        this.visible = false;
      },
    },
    computed:{
      listData(){
        return this.$store.role.list
      }
    }

  }
</script>

<style lang="stylus">
  @import './role.styl'
</style>
