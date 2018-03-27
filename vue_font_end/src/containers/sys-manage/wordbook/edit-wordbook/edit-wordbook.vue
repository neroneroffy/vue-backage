<template>
  <div class="edit-client">
    <BastTitle :title="title"></BastTitle>
    <Form ref="editData" :model="editData" :label-width="90" v-if="editData">
      <FormItem label="字典标识" prop="dictKey">
        <Input v-model="editData.dictKey" placeholder="请输入字典标识"/>
      </FormItem>
      <FormItem label="字典值" prop="dictValue">
        <Input v-model="editData.dictValue" placeholder="请输入字典值"/>
      </FormItem>
      <FormItem label="字典类型" prop="dictType">
        <Input v-model="editData.dictType" placeholder="请输入字典类型"/>
      </FormItem>
      <FormItem label="字典名称" prop="dictName">
        <Input v-model="editData.dictName" placeholder="请输入字典类型"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit">提交</Button>
      </FormItem>
    </Form>

  </div>
</template>

<script>
  import BastTitle from "@/components/base-title";
  import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
  export default {
    name: "edit-present",
    data(){
      return {
        title:"新增字典",
        editData:{
          "dictKey":"",
          "dictValue":"",
          "dictType":"",
          "dictName":""
        }
      }},
    components:{
      BastTitle
    },
    mounted() {

    },
    methods:{
      submit(){
        let url="/base/dict/add";
        console.log(this.editData)
        //${this.$host}
        this.$http.post(`http://192.168.31.13:8080${url}`,this.editData).then(response=>{
          console.log(response);
          let res = response.data;
          if(res.result){
            this.$router.push('/wordbook')
          }else{
            this.$Message.info(res.msg);
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "./edit-wordbook.styl";
</style>
