<template>
  <div class="edit-materiel">
    <BastTitle :title="title"></BastTitle>
    <Form ref="editData" :model="editData" :label-width="80" v-if="editData">
      <FormItem label="名称" prop="materielName">
        <Input v-model="editData.materielName"  :disabled="isChecked" placeholder="请输入名称" />
      </FormItem>
      <FormItem label="编号" prop="materielCode">
        <Input v-model="editData.materielCode"  :disabled="isChecked" placeholder="请输入单位"/>
      </FormItem>
      <FormItem label="条形码" prop="barCode">
        <Input v-model="editData.barCode" :disabled="isChecked" placeholder="请输入价格"/>
      </FormItem>
      <FormItem label="物料分类" prop="category">
        <Input v-model="editData.category" :disabled="isChecked" placeholder="请输入分类"/>
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
            title:this.$route.query.id?this.$route.query.checked?'查看物料':'编辑物料':'新增物料',
              editData:{
                materielName:"",
                materielCode:"",
                barCode:"",
                category:"",
                mark:""
              },
            isChecked:this.$route.query.checked?true:false
          }
        },
        mounted(){
          if(this.$route.query.id){
            console.log(this.$route.query.id)
            //{id:this.$route.query.id}
            this.$http.get(`http://192.168.31.34:8080/base/materiel/updatePre`,{
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

            //物料添加接口/base/materiel/addMateriel
            //更新物料/base/materiel/updateMateriel
            let url='/base/materiel/addMateriel';
            let data=this.editData;
            if(this.$route.query.id){
              url = '/base/materiel/updateMateriel';
            }
            this.$http.post(`http://192.168.31.34:8080${url}`,data).then(response=>{
              let res = response.data;

              if(!res.result){
                this.$Message.error(res.msg);
              }else{
                this.$Message.info('成功');
                this.$router.push('/baseData/materiel')
              }
            })
          }
        }
    }
</script>

<style scoped lang="stylus">
  @import "edit-materiel.styl";
</style>
