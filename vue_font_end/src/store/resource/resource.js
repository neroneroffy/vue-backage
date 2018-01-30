import axios from 'axios';
import { API } from '../../const/api'
const resource = {
  state:{
    list:null
  },
  mutations:{
    GET_LIST(state,payload){
      state.list = payload
    }
  },
  actions:{
    getList({commit}){
      axios.get(`${API}/resource/getlist`).then(res=>{
        if(res.data.result){
          commit("GET_LIST",res.data.data)
        }
      })
    }

  }
};
export default resource
