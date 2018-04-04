<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  created(){
    this.$router.push('/authRoute')
  },
  updated(){
    let xAuthToken = localStorage.getItem('xAuthToken');
    //验证token是否有效
    //首先验证xAuthToken有没有，没有直接登陆
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    console.log(to)
    // 可以访问组件实例 `this`
  },
  mounted(){

  }
}
</script>

<style>
  html,body{
    height: 100%;
  }
</style>
