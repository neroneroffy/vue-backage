<template>
  <div class="edit-warehouse">
    <BastTitle :title="title"></BastTitle>

    <Form ref="editData" :model="editData" :label-width="80">
      <FormItem label="仓库名称" prop="name">
        <Input v-model="editData.name" placeholder="请输入ID" />
      </FormItem>
      <FormItem label="最大库存" prop="unit">
        <Input v-model="editData.max" placeholder="请输入单位"/>
      </FormItem>
      <FormItem label="预警库存" prop="area">
        <Input v-model="editData.min" placeholder="请输入价格"/>
      </FormItem>
      <FormItem label="联系人" prop="money">
        <Input v-model="editData.contact" placeholder="请输入价格"/>
      </FormItem>
      <FormItem label="联系人电话" prop="money">
        <Input v-model="editData.phone" placeholder="请输入价格"/>
      </FormItem>
      <FormItem label="仓库地址" prop="money">
        <Input v-model="editData.address" placeholder="请输入价格"/>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="editData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"/>
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
        editData:{
          name:"",
          max:"",
          min:"",
          contact:"",
          phone:"",
          remark:""
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
        console.log(this.editData)
      }
    }

  }
</script>

<style scoped lang="stylus">
@import './edit-warehouse.styl'
</style>
