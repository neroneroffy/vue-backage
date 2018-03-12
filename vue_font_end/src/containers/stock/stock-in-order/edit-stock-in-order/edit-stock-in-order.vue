<template>
  <div class="edit-stock-in-order">
    <BastTitle :title="title"></BastTitle>

  </div>
</template>

<script>
  import BastTitle from  "@/components/base-title";
  import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
  export default {
    name: "edit-stock-in-order",
    data(){
      return{
        title:this.$route.query.id?this.$route.query.checked?'查看入库单':'编辑入库单':'新增入库单',
        isChecked:this.$route.query.checked?true:false,
        column:[
          {
            title:"入库单",
            key:"inboundOrderId"
          },
          {
            title:"入库单",
            key:"inboundOrderId"
          },
        ]
      }
    },
    mounted(){
      if(this.$route.query.id!==""){
        /*this.$http.get("",{
          params:{ id:this.$route.query.id }
        }).then(response =>{
          this.editData = response.data.data;
        })*/
      }
    },
    components:{
      BastTitle
    },
    methods:{
      submit(){
        console.log(this.editData)
      }
    }
  }
</script>

<style scoped>

</style>

