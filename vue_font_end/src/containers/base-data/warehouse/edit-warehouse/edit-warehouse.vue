<template>
  <div class="edit-warehouse">
    <BastTitle :title="title"></BastTitle>

    <Form ref="editData" :model="editData" :label-width="80">
      <FormItem label="仓库名称" prop="warehouseName">
        <Input v-model="editData.warehouseName" placeholder="请输入名称" />
      </FormItem>
      <FormItem label="负责人" prop="contacts">
        <Input v-model="editData.contacts" placeholder="请输入负责人" />
      </FormItem>
      <FormItem label="电话" prop="mobilePhone">
        <Input v-model="editData.mobilePhone" placeholder="请输入电话"/>
      </FormItem>
      <FormItem label="座机" prop="telephone">
        <Input v-model="editData.telephone" placeholder="请输入座机"/>
      </FormItem>
      <FormItem label="微信" prop="wechat">
        <Input v-model="editData.wechat" placeholder="请输入微信"/>
      </FormItem>
      <FormItem label="仓库面积" prop="acreage">
        <Input v-model="editData.acreage" placeholder="请输入仓库面积"/>
      </FormItem>
      <FormItem label="仓库地址" prop="addressld">
        <Input v-model="editData.addressld" placeholder="请输入地址"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit">提交</Button>
      </FormItem>
    </Form>

  </div>
</template>

<script>
  import BastTitle from "@/components/base-title";
  import { Form,Select,Upload,Avatar,Button } from 'iview'

  export default {
        name: "edit-warehouse",
    data(){
      return {
        title:this.$route.query.id?'编辑仓库':'新增仓库',
        api:'http://198.168.31.222:8080',
        editData:{
          warehouseName:'',
          contacts:'',
          mobilePhone:'',
          telephone:'',
          wechat:'',
          acreage:'',
          addressld:'',
        }
      }
    },
    components:{
      BastTitle
    },
    mounted(){
      if(this.$route.query.id){
        this.$http.get(`${this.$api}/warehouse/query`,{
          params:{ id:this.$route.query.id }
        }).then(response=>{
          let res = response.data;
          if(res.result){
            this.editData = res.data;
          }
        });
      }
    },
    methods:{
      submit(){
        ///base/warehouse/saveWareHouse添加接口
        this.$http.post(`http://192.168.31.222:8080/base/warehouse/saveWareHouse`,this.editData).then(response=>{
          let res = response.data;
          console.log(res)
          if(res.msg === "手机号已注册"){
            this.$Message.error('手机号已注册');
          }else if(res.msg === "成功"){
            this.$Message.info('修改成功');
            this.$router.push('/baseData/client')
          }
        })
      }
    }

  }
</script>

<style scoped lang="stylus">
@import './edit-warehouse.styl'
</style>
