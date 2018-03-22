<template>
  <div class="edit-warehouse">
    <BastTitle :title="title"></BastTitle>

    <Form ref="editData" :model="editData" :label-width="80">
      <FormItem label="仓库名称" prop="warehouseName">
        <Input v-model="editData.warehouseName" :disabled="checked" placeholder="请输入名称" />
      </FormItem>
      <FormItem label="负责人" prop="contacts">
        <Input v-model="editData.contacts" :disabled="checked"  placeholder="请输入负责人" />
      </FormItem>
      <FormItem label="电话" prop="mobilePhone">
        <Input v-model="editData.mobilePhone"  :disabled="checked" placeholder="请输入电话"/>
      </FormItem>
      <FormItem label="座机" prop="telephone">
        <Input v-model="editData.telephone" :disabled="checked"  placeholder="请输入座机"/>
      </FormItem>
      <FormItem label="微信" prop="wechat">
        <Input v-model="editData.wechat"  :disabled="checked" placeholder="请输入微信"/>
      </FormItem>
      <FormItem label="仓库面积" prop="acreage">
        <Input v-model="editData.acreage" :disabled="checked"  placeholder="请输入仓库面积">
        <span slot="append">平方米</span>
        </Input>
      </FormItem>
      <FormItem label="仓库地址" prop="addressld">
        <Cascader :data="areaData" :load-data="loadData" @on-change="selectAreaDone" :disabled="isChecked" ></Cascader>
      </FormItem>
      <FormItem label="详细地址">
        <div class="detail-address">
          <Input v-model="editData.address" :disabled="isChecked" type="textarea" placeholder="请填写详细地址"></Input>
        </div>
      </FormItem>
      <FormItem v-if="!checked">
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
        title:this.$route.query.id?this.$route.query.checked?'查看仓库':'编辑仓库':'新增仓库',
        api:'http://192.168.31.222:8080',
        checked:this.$route.query.checked,
        editData:{
          warehouseName:'',
          contacts:'',
          mobilePhone:'',
          telephone:'',
          wechat:'',
          acreage:'',
          addressList:"",
          address:'',
        },
        areaData:[]
      }
    },
    components:{
      BastTitle
    },
    mounted(){
      this.$http.get(`${this.api}/base/area/province`).then(response => {
        this.areaData = response.data;
        this.areaData.forEach(v=>{
          v.label = v.areaName;
          v.value = v.id;
          v.loading = false;
          v.children = []
        })
      });
      if(this.$route.query.id){
        this.$http.get(`${this.api}/base/warehouse/updatePre`,{
          params:{ id:this.$route.query.id }
        }).then(response=>{
          let res = response.data;
          if(res){
            this.editData = res;
            this.setCascader(`${this.editData.addressList[0]}/${this.editData.addressList[1]}/${this.editData.addressList[2]}`,"block","")
          }
        });
      }
    },
    methods:{
      loadData (item, callback) {
        item.loading = true;
        this.$http.get(`${this.api}/base/area/cityOrDistrict`,{
          params:{parentId:item.value}
        }).then(response=>{
          let res = response.data;
          item.children = res;
          //请求回来，展开列表
          item.children.forEach(v=>{
            v.value = v.id;
            v.label = v.areaName;
            v.children = [];
            if(v.areaType !== "DISTRICT"){
              v.loading = false
            }
          });
          callback();
          item.loading = false;
        });
      },
      setCascader(val,style,placeholoder){
        document.getElementsByClassName("ivu-cascader-label")[0].innerHTML = val;
        document.getElementsByClassName("ivu-cascader-label")[0].style.display = style;
        if(this.isChecked){
          document.getElementsByClassName("ivu-cascader-label")[0].style.color = "#ccc";
        }
        document.getElementsByClassName("ivu-cascader-rel")[0].getElementsByClassName("ivu-input-wrapper")[0].getElementsByClassName("ivu-input")[0].placeholder = placeholoder

      },
      selectAreaDone(val){
        this.editData.addressList = val;
        console.log(val)
        this.setCascader("","block","")
      },
      submit(){
        ///base/warehouse/saveWareHouse添加接口
        ///base/warehouse/updateWareHouse更新接口
        console.log(this.editData);
        let url='/base/warehouse/saveWareHouse';
        if(this.$route.query.id){
          url="/base/warehouse/updateWareHouse"
          delete this.editData['addressList'];
          delete this.editData['address'];
        }
        this.$http.post(`${this.api}${url}`,{...this.editData}).then(response=>{
          let res = response.data;
          console.log(res)
          if(res.result){
            this.$Message.info('操作成功');
            this.$router.push('/baseData/warehouse')
          }else{
            this.$Message.info('操作失败');
          }
        })
      }
    }

  }
</script>

<style scoped lang="stylus">
@import './edit-warehouse.styl'
</style>
