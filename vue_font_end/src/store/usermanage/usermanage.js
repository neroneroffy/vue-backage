import axios from 'axios';
import { API } from '../../const/api'
const usermanage = {
  state:{
    list:[],
    total:0
  },
  mutations:{
    GET_PAGINATION_DATA(state,payload){
      state.list = payload.list;
      state.total = payload.total
    },
    GET_DEL_DATA(state,payload){

    }
  },
  actions:{
/*
    getList(context){
      axios.get(`${API}/auth/manager`).then(response=>{
        let res = response.data;
        if(res.result){
          context.commit("GET_LIST",res.data)
        }
      })
    },
*/
    getList({ commit },params){
      let defaultParams = {
        pageNum :1,
        pageSize : 30
      };
      params = params? params:defaultParams;
      axios.get(`${API}/auth/manager`,{params}).then(response=>{
        let res = response.data;
        if(res.result){
          commit('GET_PAGINATION_DATA',res)
        }
      })
    },
    delData({ commit },param){

    }
  }
};
export default usermanage
