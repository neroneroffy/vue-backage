<template>
  <div class="edit-materiel">
    <BastTitle :title="title"></BastTitle>
    <Form ref="editData" :model="editData" :label-width="40" v-if="editData" label-position="left">
      <FormItem label="名称" prop="materielName">
        <Input v-model="editData.materielName"  :disabled="isChecked" placeholder="请输入ID" />
      </FormItem>
      <FormItem label="编号" prop="materielCode">
        <Input v-model="editData.materielCode"  :disabled="isChecked" placeholder="请输入单位"/>
      </FormItem>
      <FormItem label="条形码" prop="barCode">
        <Input v-model="editData.barCode" :disabled="isChecked" placeholder="请输入价格"/>
      </FormItem>
      <FormItem label="物料分类" prop="category">
        <Select v-model="editData.category" :value="editData.category" :disabled="isChecked" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="备注" prop="mark">
        <Input v-model="editData.mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :disabled="isChecked" placeholder="请填写备注"/>
      </FormItem>
      <FormItem>
        <Button type="primary" v-if="!isChecked" @click="submit">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
    import BastTitle from  "@/components/base-title";
    import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
    export default {
        name: "edit-materiel",
        data(){
          return{
            title:this.$route.query.id?this.$route.query.checked?'查看赠品':'编辑赠品':'新增赠品',
              editData:{
                materielName:"",
                materielCode:"",
                barCode:"",
                category:"",
                mark:""
              },
            cityList:[
              {
                label:"请选择物料类型",
                value:""
              },
              {
                value: '2654',
                label: 'A类'
              },
              {
                value: '2655',
                label: 'B类'
              },
              {
                value: '2656',
                label: 'C类'
              }
            ],
            isChecked:this.$route.query.checked?true:false
          }
        },
        mounted(){
          if(this.$route.query.id){
            console.log(this.$route.query.id)
            //{id:this.$route.query.id}
            this.$http.get(`http://192.168.31.34:8080/base/materiel/materielInfo`,{
              params:{id:this.$route.query.id}
            }).then(response =>{
              this.editData = response.data;
            })
          }
        },
        components:{
          BastTitle
        },
        methods:{
          submit(){
            console.log(this.editData)
            //物料添加接口/base/materiel/addMateriel
            //更新物料/base/materiel/updateMateriel
            let url='/base/materiel/addMateriel';
            let data=this.editData;
            if(this.$route.query.id){
              url = '/base/materiel/updateMateriel';
            }
            this.$http.post(`http://192.168.31.34:8080${url}`,data).then(response=>{
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
  @import "edit-materiel.styl";
</style>
