<template>
    <router-view></router-view>
</template>

<script>
  import axios from 'axios';
  import { HOST } from './const/api'
export default {
  name: 'App',
  created(){
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
