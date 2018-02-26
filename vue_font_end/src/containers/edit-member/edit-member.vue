<template>
  <div class="edit-member">
    <div class="title">{{this.$route.query.id?"编辑成员":"新增成员"}}</div>
    <Form ref="editData" :model="editData" :label-width="40" v-if="editData" label-position="left">
      <FormItem label="ID" prop="id">
        <Input v-model="editData.id" :disabled="checkMember" placeholder="请输入ID" />
      </FormItem>
      <FormItem label="账户" prop="account">
        <Input v-model="editData.account" :disabled="checkMember" placeholder="请输入账户"/>
      </FormItem>
      <FormItem label="角色" prop="role">
        <Select v-model="editData.roleId" :disabled="checkMember"  placeholder="请选择角色" @on-change = 'roleChange'>
          <Option :value="v.roleId" :key="v.roleId" v-for="v in editRoleList">{{v.roleName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="头像">
        <FormItem prop="date">
          <Upload
            ref="upload"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            action="//jsonplaceholder.typicode.com/posts/"
            v-if="!checkMember"
          >
            <Button type="ghost" icon="ios-cloud-upload-outline"v-if="!checkMember"  >上传头像</Button>
          </Upload>
          <Avatar shape="square" icon="person" size="large" class="avatar-edit-display" :src="editData.avatar"/>
        </FormItem>
      </FormItem>
      <FormItem label="电话" prop="phone">
        <Input v-model="editData.phone" placeholder="请输入电话" :disabled="checkMember"/>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="editData.remark" :disabled="checkMember" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"/>
      </FormItem>
      <FormItem v-if="!checkMember" >
        <Button type="primary" @click="submit">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { API } from '../../const/api';
  import { Form,Select,Upload,Avatar,Button } from 'iview'
  import axios from 'axios';
    export default {
        name: "editmember",
      data(){
          return {
            title:"新增成员",
            editData:{
              id:"",
              account:"",
              roleId:"",
              avatar:"",
              phone:"",
              remark:""
            },
            checkMember:false,
            editRoleList: [
              {
                roleId: 'role1',
                roleName: '角色1'
              },
              {
                roleId: 'role2',
                roleName: '角色2'
              },
              {
                roleId: 'role3',
                roleName: '角色3'
              },
              {
                roleId: 'role4',
                roleName: '角色4'
              }
            ],
          }
      },
      mounted(){
          if(window.location.hash.indexOf('checkmember')>0){
            this.checkMember = true
          }else{
            this.checkMember = false
          }

        if(this.$route.query.id){
          axios.get(`${API}/auth/queryuser`,{
            params:{ id:this.$route.query.id }
          }).then(response=>{
            let res = response.data;

            if(res.result){
              this.editData = res.data;
            }
          });
        }


      },
      methods:{
        roleChange(){

        },
        submit(){
          console.log(this.editData)
        },
        handleView (name) {
          this.imgName = name;
          this.visible = true;
        },
        handleRemove (file) {
          const fileList = this.$refs.upload.fileList;
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
          file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
          file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {
          this.$Notice.warning({
            title: '文件格式错误',
            desc: '文件 ' + file.name + ' 的格式不正确，请选择jpg或png格式'
          });
        },
        handleMaxSize (file) {
          this.$Notice.warning({
            title: '文件超出大小',
            desc: '图片  ' + file.name + ' 太大, 不要超过2M'
          });
        },

      }
    }
</script>

<style lang="stylus">
  .edit-member{
    width: 30%;
    .title{
      font-size 20px
      color #666
      margin-bottom 35px
      position relative
      padding-left 15px
      &:before{
        content ""
        display block
        position absolute
        top 4px
        left 0
        width 5px
        height 20px
        background #2d8cf0
      }

    }

    .ivu-form-item-content{
      margin-left 40px!important

    }
  }
  .avatar-edit-display{
    width: 60px;
    height: 60px;
    line-height :60px
    font-size 35px;
    margin-top 10px
  }
</style>
