<template>
    <div class="edit-role">
      editrole
    </div>
</template>

<script>
    import axios from 'axios';
    import { API } from '../../const/api';
    export default {
      name: "editrole",
      data(){
        return {
          roleInfo:""
        }
      },
      created(){

        axios.get(`${API}/role/info`,{
          params:{
            id:this.$route.query.id
          }
        }).then(response=>{
          let res = response.data;
          if(res.result){
            this.roleInfo = res.data;
            console.log(this.roleInfo)
          }
        });

      }
    }
</script>

<style lang="stylus">
  @import './editrole.styl'
</style>
