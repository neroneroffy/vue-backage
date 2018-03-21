<template>
  <div class="edit-client">
    <BastTitle :title="title"></BastTitle>
    <Form ref="editData" :model="editData" :label-width="90" v-if="editData">
      <FormItem label="赠品名称" prop="giftName">
        <Input v-model="editData.giftName" placeholder="请输入赠品名称" :disabled="isChecked"  />
      </FormItem>
      <FormItem label="赠品编号" prop="giftCode">
        <Input v-model="editData.giftCode" placeholder="请输入赠品编号" :disabled="isChecked"  />
      </FormItem>
      <FormItem label="条形码" prop="barCode">
        <Input v-model="editData.barCode" placeholder="请输入条形码" :disabled="isChecked"  />
      </FormItem>
      <FormItem label="赠品类型" prop="barCode">
        <Input v-model="editData.category" placeholder="请输入赠品类型" :disabled="isChecked"  />
      </FormItem>

      <FormItem label="赠品型号" prop="modelSize">
        <Select v-model="editData.modelSize" style="width:200px" :value="editData.modelSize" :disabled="isChecked" placeholder="请选择赠品型号">
          <Option v-for="item in status" :value="item.label" :key="item.label">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="备注" prop="mark">
        <Input v-model="editData.mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :disabled="isChecked" placeholder="请输入详细的备注信息"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" v-if="!isChecked" @click="submit">提交</Button>
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
        title:this.$route.query.id?this.$route.query.checked?'查看赠品':'编辑赠品':'新增赠品',
        editData:{
          "giftName":"",
          "giftCode":"",
          "barCode":"",
          "category":"",
          "modelSize":"",
          "mark":""
        },
        type:[
          {
            name:"请选择赠品类型",
            id:""
          },
          {
            name:"A赠品",
            id:"43264"
          },
          {
            name:"B赠品",
            id:"65464564"
          },
          {
            name:"C赠品",
            id:"875765"
          }
        ],
        status:[
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
        isChecked:this.$route.query.checked?true:false
    }},
    components:{
      BastTitle
    },
    mounted() {
      if(this.$route.query.id){
        this.$http.get(`http://192.168.31.34:8080/base/gift/updatePre`,{
          params:{ id:this.$route.query.id}
        }).then(response=>{
          this.editData = response.data;
          console.log(this.editData);
        });
      }
    },
    methods:{
      submit(){
        ///base/gift/addGift添加赠品
        ///base/gift/updateGift 更新赠品
        let url='/base/gift/addGift';
        if(this.$route.query.id){
          url='/base/gift/updateGift'
        }
        this.$http.post(`http://192.168.31.34:8080${url}`,this.editData).then(response=>{
          let res = response.data;
          if(res.result){
            this.$router.push('/baseData/present')
          }else{
            this.$Message.info(res.msg);
          }
        })
      }
    }

  }
</script>

<style scoped lang="stylus">
  @import "./edit-present.styl";
</style>
