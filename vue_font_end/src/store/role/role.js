import axios from 'axios';
import { API } from '../../const/api';
const role = {
  state:{
    list:""
  },
  mutations:{
    GET_ROLE_LIST(state,payload){
      state.list = payload;
    }
  },
  actions:{
    getRoleList({ commit }){
      axios.get(`${API}/role/list`).then(response=>{
        let res = response.data;
        if(res.result){
          console.log(res.data)
          commit('GET_ROLE_LIST',res.data)
        }
      })
    }
  }
};

export default role;
