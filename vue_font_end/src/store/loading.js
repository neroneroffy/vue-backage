const loading = {
  state:{
    isLoading:false,
    showModal:true
  },
  mutations:{
    BEGIN_LOADING(state){
      state.isLoading = true
    },
    END_LOADING(state){
      state.isLoading = false
    },
    MODAL_LOADING(state){
      state.showModal = false
    }
  },
  actions:{
    beginLoading({ commit }){
      commit('BEGIN_LOADING')
    },
    endLoading({ commit }){
      commit('END_LOADING')
    },
    modalLoading({ commit }){
      commit('MODAL_LOADING')
    }
  }
};
export default loading
