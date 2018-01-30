import Vue from 'vue';
import Vuex from 'vuex';
import resource from './resource/resource';
import usermanage from './usermanage/usermanage';
import user from './user';
import loading from './loading';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    usermanage,
    loading,
    user,
    resource
  }
});
export default store
