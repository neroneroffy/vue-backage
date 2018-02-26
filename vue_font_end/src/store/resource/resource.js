import axios from 'axios';
import { HOST } from '../../const/api'
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
      axios.get(`${HOST}/sys/resource/list`).then(res=>{
        if(res.data.result){
          console.log(res.data);
          commit("GET_LIST",res.data.data)
        }
      })
    }

  }
};
export default resource
