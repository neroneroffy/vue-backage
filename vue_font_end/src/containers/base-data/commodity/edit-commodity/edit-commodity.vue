<template>
    <div class="edit-commodity">
      <BaseTitle :title="title"></BaseTitle>
     <!--
        {
          productName:名称
          productCode:编号
          barCode:条形码
          category分类
          modelSize型号
          mark备注
         }
     -->
      <Form ref="editData" :model="editData" :label-width="80" v-if="editData">
        <FormItem label="名称" prop="productName">
          <Input v-model="editData.productName" placeholder="请输入名称" />
        </FormItem>
        <FormItem label="编号" prop="productCode">
          <Input v-model="editData.productCode" placeholder="请输入编号"/>
        </FormItem>
        <FormItem label="条形码" prop="barCode">
          <Input v-model="editData.barCode" placeholder="请输入条形码"/>
        </FormItem>
        <FormItem label="请选择类型" prop="category">
          <Input v-model="editData.category" placeholder="请输入类型"/>
        </FormItem>
        <FormItem label="请选择型号" prop="modelSize">
          <Select v-model="editData.modelSize" style="width:200px" placeholder="请选择型号">
            <Option v-for="item in modelSize" :value="item.value" :key="item.value">{{ item .label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="备注" prop="mark">
          <Input v-model="editData.mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit">提交</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
  import BaseTitle from "@/components/base-title";
  import { Form,Select,Upload,Avatar,Button } from 'iview'
    export default {
      name: "edit-commodity",
      data(){
        return {
          title:this.$route.query.id?'编辑商品':'新增商品',
          editData:{
            productName:'',
            productCode:'',
            barCode:'',
            category:'',
            modelSize:'',
            mark:''
          },
          //NB("NB"), S("S"), M("M"), L("L"), XL("XL"), XXL("XXL"), XXXL("XXXL");
          modelSize:[
            {
              value: 'NB',
              label: 'NB'
            },
            {
              value: 'S',
              label: 'S'
            },
            {
              value: 'M',
              label: 'M'
            },
            {
              value: 'L',
              label: 'L'
            },
            {
              value: 'XL',
              label: 'XL'
            },
            {
              value: 'XXL',
              label: 'XXL'
            },
            {
              value: 'XXXL',
              label: 'XXXL'
            }
          ],
        }
      },
      components:{
        BaseTitle
      },
      mounted(){
        ///base/product/updatePre  查看单条信息
        if(this.$route.query.id){
          this.$http.get(`http://192.168.31.34:8080/base/product/updatePre`,{
            params:{ id:this.$route.query.id }
          }).then(response=>{
            let res = response.data;
              this.editData = res;
          });
        }
      },
      methods:{
        submit(){
          ///base/product/addProduct增加产品
          ///base/product/updateProduct  更新产品
          let url='/base/product/addProduct';
          let data=this.editData;
          if(this.$route.query.id){
            url = '/base/product/updateProduct';
          }
          this.$http.post(`http://192.168.31.34:8080${url}`,data).then(response=>{
            let res = response.data;
            if(res.result){
              this.$Message.success("成功");
              this.$router.push('/baseData/commodity')
            }else{
              this.$Message.success(res.msg);
            }
          })
        }
      }
    }
</script>

<style scoped lang="stylus">
@import './edit-commodity.styl'
</style>
