import axios from 'axios';
import store from './store'
axios.interceptors.request.use((config)=>{
  let xAuthToken = localStorage.getItem('xAuthToken');

  if(xAuthToken){
    config.headers['token'] = xAuthToken
  }else{
    console.log(888)
  }

  store.dispatch('beginLoading');
  //携带token
  return config
});
axios.interceptors.response.use((config)=>{
  //console.log(config);
  if(config.data.flag === 'SESSION_INVALID'){
    console.log('失效')
    this.$router.push('/login');
    return
  }
  store.dispatch('endLoading');

 // console.log(config.headers)

  //获取token,验证，跳转
  return config
})
