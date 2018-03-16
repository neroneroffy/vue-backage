// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iView'
import 'iview/dist/styles/iview.css';

import store from './store'
import './interceptor'
import axios from 'axios';
import echarts from 'echarts'
Vue.use(iView);
Vue.prototype.$echarts = echarts;
axios.create({
  headers: 'X-Auth-Token'
});
Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://192.168.31.13:8080';
//Vue.prototype.$api = '/api';
Vue.prototype.$host = 'http://192.168.31.34:8080';

//Vue.prototype.$host = 'http://m1.baobaofarm.com';


// Vue.prototype.$host = 'http://m1.baobaofarm.com';


Vue.config.productionTip = false;

//Vue.prototype.HOST = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
