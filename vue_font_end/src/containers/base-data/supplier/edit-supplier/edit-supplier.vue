<template>
    <div class="edit-supplier">
      <BastTitle :title="title"></BastTitle>

      <Form ref="editData" :model="editData" :label-width="80" v-if="editData">
        <FormItem label="供货商名称" prop="name">
          <Input v-model="editData.name" placeholder="请输入ID" />
        </FormItem>
        <FormItem label="类型" prop="unit">
          <Input v-model="editData.type" placeholder="请输入单位"/>
        </FormItem>
        <FormItem label="地区" prop="area">
          <Input v-model="editData.area" placeholder="请输入价格"/>
        </FormItem>
        <FormItem label="欠款" prop="money">
          <Input v-model="editData.money" placeholder="请输入价格"/>
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
      name: "edit-supplier",
      data(){
        return {
          title:this.$route.query.id?'编辑供货商':'新增供货商',
          editData:{
            name:"",
            type:"",
            money:"",
            area:""
          }

        }
      },
      components:{
        BastTitle
      },
      mounted(){
        if(this.$route.query.id){
          this.$http.get(`${this.$api}/supplier/query`,{
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
@import './edit-supplier.styl'
</style>
