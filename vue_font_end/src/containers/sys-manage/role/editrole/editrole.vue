<template>
  <div class="edit-role">
    <div class="title">{{this.$route.query.id?"编辑角色":"新增角色"}}</div>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="role-info">
      <FormItem label="角色名称" prop="roleName">
        <Input type="text"  v-model="formCustom.roleName"/>
      </FormItem>
      <FormItem label="角色编码" prop="roleCode">
        <Input type="text" v-model="formCustom.roleCode"/>
      </FormItem>
      <FormItem label="备注" prop="mark">
        <Input type="textarea" v-model="formCustom.mark"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit('formCustom')">提交</Button>
        <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>

  </div>
</template>

<script>
  import { Form,Input,Button,Modal } from 'iview';
  export default {
    name: "editrole",
    data(){
      const validateName = (rule, value, callback) => {
        let reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\s\.,]/g;
        if (reg.test(value) || value === "") {
          callback(new Error('请填写正确的角色名称'));
        } else {
          callback();
        }
      };
      const validateCode = (rule, value, callback) => {
        let reg = /[\u4e00-\u9fa5]+/g;
        if (reg.test(value) || value === "") {
          console.log(reg.test(value));
          callback(new Error('请填写正确的角色编码'));
        }else {
          callback();
        }
      };

      return {
        formCustom: {
          roleName: '',
          roleCode: '',
          mark: ''
        },
        api:"http://192.168.31.174:8080",
        ruleCustom: {
          roleName: [
            { validator: validateName, trigger: 'blur' }
          ],
          roleCode: [
            { validator: validateCode, trigger: 'blur' }
          ]
        },
        roleInfo:""
      }
    },
    created(){
      if(this.$route.query.id){
        this.$http.get(`${this.api}/sys/role/updatePre`,{
          params:{
            id:this.$route.query.id
          }
        }).then(response=>{
          let res = response.data;
          if(res.result){
            this.formCustom = res.data;

          }
        });
      }

    },
    methods:{
      submit(name){
/*        this.$refs[name].validate((valid) => {
          if (valid) {

          } else {

            return
          }
        });*/
        if(this.formCustom.roleName === "" ||this.formCustom.roleCode === ""){
/*          this.$Modal.warning({
            title: "提交失败",
            content: "角色名称或者角色编码不能为空"
          });*/
          this.$Message.error('角色名称或者角色编码不能为空!');
          return

        };
        this.$http.post(`${this.api}/sys/role/update`,{...this.formCustom}).then(response=>{
          let res = response.data;
          console.log(res);
          if(res.result){
            this.$Message.success('编辑成功!');
            this.$router.push('/sys/role')
          }else{
            this.$Message.error("编辑失败");
          }
        })

      },
      handleReset(name){
        this.$refs[name].resetFields();
        /*this.formCustom.roleName = "";
        this.formCustom.roleCode = "";
        this.formCustom.roleRemark = "";*/
      }
    }
  }
</script>

<style lang="stylus">
  @import 'editrole.styl'
</style>
