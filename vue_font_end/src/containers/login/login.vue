<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" :loading="loading" type="primary" long>登录</Button>
            </FormItem>
          </Form>

        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import { Form,Input,Button } from 'iview';
  import { HOST } from '../../const/api'
    export default {
        name: "login",
      data () {
        return {
          form: {
            userName: '',
            password: ''
          },
          loading:false,
          rules: {
            userName: [
              { required: true, message: '账号不能为空', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        handleSubmit () {
          //this.$router.push('/manager')
          this.loading = true;
          this.$http.post(`${this.$host}/login`,{
            userName:this.form.userName,
            password:this.form.password
          }).then(response=>{
            if(response.data.result){
              for (let k in response.headers){
                if(k === "x-auth-token"){
                  //this.$store.dispatch('saveUserInfo',response.data.data);//请求回来后，把用户信息存储到VUEX里
                  sessionStorage.setItem('user',JSON.stringify(response.data.data));//为了防止刷新后用户数据丢失，存到sessionStorege里一份
                  localStorage.setItem('xAuthToken',response.headers[k]);//将token长期存储，便于下次进入系统验证
                  function defaultUri(menu){
                    if(menu.children){
                      defaultUri(menu)
                    }else{
                      return menu.uri
                    }
                  }
                  sessionStorage.setItem('currentPath','/index');
                  this.loading = false;
                  this.$router.push('/index');//登陆成功后跳转到首页
                  return
                }
              }
            }
          })
        }
      }
    }
</script>

<style lang="stylus">
  @import './login.styl';
</style>
