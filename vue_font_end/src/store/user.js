const user = {
  state:{
    user:""
  },
  mutations:{
    USER_INFO(state,payload){
      state.user = payload
    }
  },
  actions:{
    saveUserInfo({ commit },data){
      commit('USER_INFO',data)
    }
  }
};
export default user
