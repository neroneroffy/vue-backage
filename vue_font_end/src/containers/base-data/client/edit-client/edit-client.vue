<template>
    <div class="edit-client">
      <BastTitle :title="title"></BastTitle>
      <Form ref="editData" :model="editData" :label-width="90" v-if="editData">
        <FormItem label="客户名称" prop="customerName">
          <Input v-model="editData.customerName" placeholder="请输入客户名称" :disabled="isChecked"  />
        </FormItem>
        <FormItem label="客户类型" prop="customerType">
          <Select v-model="editData.customerType" style="width:200px" :value="editData.customerType" :disabled="isChecked" placeholder="请选择客户类型">
            <Option v-for="item in type" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="联系电话" prop="mobilePhone">
          <Input v-model="editData.mobilePhone" placeholder="请输入联系电话" :disabled="isChecked" />
        </FormItem>
        <FormItem label="座机" prop="telephone">
          <Input v-model="editData.telephone" placeholder="请输入座机号码" :disabled="isChecked" />
        </FormItem>
        <FormItem label="微信" prop="wechat">
          <Input v-model="editData.wechat" placeholder="请输入微信号" :disabled="isChecked"/>
        </FormItem>
        <FormItem label="首次交易时间" prop="firstPurchaseTime" v-if="isChecked" >
          <DatePicker type="date" placeholder="请选择时间" :value="editData.firstPurchaseTime" @on-change="dateChange" :disabled="isChecked"></DatePicker>
        </FormItem>
        <FormItem label="状态" prop="status" v-if="isChecked">
          <Select v-model="editData.status" style="width:200px" :value="editData.status" :disabled="isChecked" placeholder="请选择客户状态">
            <Option v-for="item in status" :value="item" :key="item">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="进货价格" prop="user">
          <Input v-model="editData.price" placeholder="请输入进货价格" :disabled="isChecked"/>
        </FormItem>
        <FormItem label="关联账号" prop="user" v-if="title!='新增客户'">
          <Input v-model="editData.user" placeholder="请输入关联账号" :disabled="isChecked"/>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Cascader :data="areaData" :load-data="loadData" @on-change="selectAreaDone" :disabled="isChecked" ></Cascader>
        </FormItem>
        <FormItem label="详细地址">
          <div class="detail-address">
            <Input v-model="editData.detailAddress" :disabled="isChecked" type="textarea" placeholder="请填写详细地址"></Input>
          </div>
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
      name: "edit-client",
      data(){
        return {
          api:"http://192.168.31.13:8080",
          title:this.$route.query.id?this.$route.query.checked?'查看客户':'编辑客户':'新增客户',
          editData:{
            "customerName":"",
            "customerType":"",
            "mobilePhone":"",
            "telephone":"",
            "wechat":"",
            "id":"",
            "addressIds":"",
            "detailAddress":"",
            "price":"",
            "userAccount":""
          },
          type:[
            {
              name:"门店",
              id:"STORE"
            },
            {
              name:"代理商",
              id:"AGENT"
            },
            {
              name:"大客户",
              id:"BIGCUSTOMER"
            },
          ],
          status:["请选择客户状态","初次拜访","二次拜访","多次拜访","已签约"],
          isChecked:this.$route.query.checked?true:false,
          checked:this.$route.query.id?true:false,
          areaData:[]
        }
      },
      components:{
        BastTitle
      },
      mounted(){
        //三级联动

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
          this.$http.get(`${this.api}/base/customer/updatePre`,{
            params:{ id:this.$route.query.id }
          }).then(response=>{
            let res = response.data;
            if(res){
              console.log(res)
              this.editData = res;
              this.setCascader(`${this.editData.address[0]}/${this.editData.address[1]}/${this.editData.address[2]}`,"block","")

            }
          });
        }

        if(this.$route.query.id){
        }

      },
      methods:{
        //三级联动
        loadData (item, callback) {
          item.loading = true;
          console.log(item.value)
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
          this.editData.addressIds = val;
          console.log(val)
          this.setCascader("","block","")
        },
        dateChange(date){
          this.editData.firstPurchaseTime = date
        },
        submit(){
          console.log(this.editData);
          let url="/base/customer/add";
          if(this.$route.query.id){
            this.editData.id = this.$route.query.id;
            url="/base/customer/update";
          }

          this.$http.post(`${this.api}${url}`,this.editData).then(response=>{
            let res = response.data;
            console.log(response.data)
            if(!res.result){
              this.$Message.error('手机号已注册');
            }else{
             this.$Message.info('添加成功');
             this.$router.push('/baseData/client')
            }
          })

        }
      }
    }
</script>

<style scoped lang="stylus">
@import './edit-client.styl';
</style>
