<template>
    <div class="edit-commodity">
      <BastTitle :title="title"></BastTitle>

      <Form ref="editData" :model="editData" :label-width="40" v-if="editData" label-position="left">
        <FormItem label="名称" prop="id">
          <Input v-model="editData.id" placeholder="请输入ID" />
        </FormItem>
        <FormItem label="单位" prop="unit">
          <Input v-model="editData.unit" placeholder="请输入单位"/>
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input v-model="editData.unit" placeholder="请输入价格"/>
        </FormItem>
        <FormItem label="重量" prop="weight">
          <Input v-model="editData.weight" placeholder="请输入重量"/>
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
      name: "edit-commodity",
      data(){
        return {
          title:this.$route.query.id?'编辑商品':'新增商品',
          editData:{
            name:"",
            unit:"",
            price:"",
            weight:""
          }

        }
      },
      components:{
        BastTitle
      },
      mounted(){
        if(this.$route.query.id){
          this.$http.get(`${this.$api}/commodity/querycommodity`,{
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
@import './edit-commodity.styl'
</style>
