<template>
  <div class="edit-member">
    <BastTitle :title="title"></BastTitle>
    <Form ref="editData" :model="editData" :label-width="40" v-if="editData" label-position="left">
      <FormItem label="账户" prop="id">
        <Input v-model="editData.userName" :disabled="isChecked" placeholder="用户账户" />
      </FormItem>
      <FormItem label="昵称" prop="account">
        <Input v-model="editData.nickName" :disabled="isChecked" placeholder="用户昵称"/>
      </FormItem>
      <FormItem label="角色" prop="role">
        <Select v-model="editData.roleId" :disabled="isChecked"  placeholder="请选择角色" @on-change = 'roleChange'>
          <Option :value="v.id" :key="v.id" v-for="v in editRoleList">{{v.roleName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="头像">
        <FormItem prop="date">
          <Upload

            ref="upload"
            :headers="headers"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            action="http://192.168.31.174:8080/base/attachment/upload/signal/uploadImg"
            v-if="!isChecked"
          >
            <Button type="ghost" icon="ios-cloud-upload-outline" v-if="!isChecked" >上传头像</Button>
          </Upload>
          <Avatar shape="square" icon="person" size="large" class="avatar-edit-display" :src="editData.thumbnail"/>
        </FormItem>
      </FormItem>
      <FormItem label="电话" prop="phone">
        <Input v-model="editData.mobile" placeholder="请输入电话" :disabled="isChecked"/>
      </FormItem>
      <FormItem v-if="!isChecked" >
        <Button type="primary" @click="submit">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import BastTitle from '@/components/base-title'
  import { Form,Select,Upload,Avatar,Button } from 'iview'

    export default {
        name: "editmember",
      data(){
          return {
            api:"http://192.168.31.174:8080",
            title:this.$route.query.id?this.$route.query.checked?"查看成员":'编辑成员':'新增成员',
            isChecked:this.$route.query.checked?true:false,
            editData:{
              id:this.$route.query.id?this.$route.query.id:"",
              userName:"",
              nickName:"",
              roleId:"",
              mobile:"",
              thumbnail:""
            },
            checkMember:false,
            editRoleList: [],
            headers:{
              token:localStorage.getItem('xAuthToken')
            }
          }
      },
      components:{
        BastTitle
      },
      mounted(){
          if(window.location.hash.indexOf('checkmember')>0){
            this.checkMember = true
          }else{
            this.checkMember = false
          }
          //请求角色列表
        this.$http.get(`${this.api}/sys/user/addPre`).then(response=>{
          let res = response.data;
          if(res.result){
            this.editRoleList = res.data;
          }
        });
          //请求用户数据，回显
        if(this.$route.query.id){
          this.$http.get(`${this.api}/sys/user/updatePre`,{
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

          if(this.$route.query.id){
            this.$http.post(`${this.api}/sys/user/update`,{...this.editData}).then(response=>{
              let res = response.data;
              if(res.result){
                this.$Message.success('编辑成功!');
                this.$router.push('/sys/user')
              }else{
                this.$Message.error(res.msg);
              }
            })
            return
          }
          this.$http.post(`${this.api}/sys/user/add`,{...this.editData}).then(response=>{
            let res = response.data;
            if(res.result){
              this.$Message.success('新增成功!');
              this.$router.push('/sys/user')
            }else{
              this.$Message.error(res.msg);
            }
            console.log(res)
          })

        },
        handleView (name) {
          this.imgName = name;
          this.visible = true;
        },
        handleRemove (file) {
          const fileList = this.$refs.upload.fileList;
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (response, file, fileList) {
          this.editData.thumbnail = response.data
          console.log(response);

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
