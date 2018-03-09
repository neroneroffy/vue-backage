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
          title:this.$route.query.id?this.$route.query.checked?'查看客户':'编辑客户':'新增客户',
          editData:{
            "customerName":"",
            "customerType":"",
            "mobilePhone":"",
            "telephone":"",
            "wechat":"",
            "user":"",
            "address":"",
            "detailAddress":"",
            "price":""
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
          areaData:[
            {
              value: 'beijing',
              label: '北京',
              children: [],
              loading: false
            },
            {
              value: 'hangzhou',
              label: '杭州',
              children: [],
              loading:false
            }
          ]
        }
      },
      components:{
        BastTitle
      },
      mounted(){

        if(this.$route.query.id){
          this.$http.get(`${this.$api}/base/customer/Customerinfo`,{
            params:{ id:this.$route.query.id }
          }).then(response=>{
            let res = response.data;

            if(res){
              this.editData = res;
            }
          });
        }

        if(this.$route.query.id){
          this.setCascader("北京/西雅图","block","")
        }

      },
      methods:{
        loadData (item, callback) {
          item.loading = true;
          setTimeout(() => {
            if (item.value === 'beijing') {
              item.children = [
                {
                  value: 'talkingdata',
                  label: 'TalkingData'
                },
                {
                  value: 'baidu',
                  label: '百度'
                },
                {
                  value: 'sina',
                  label: '新浪'
                }
              ];

            } else if (item.value === 'hangzhou') {
              item.children = [
                {
                  value: 'ali',
                  label: '阿里巴巴'
                },
                {
                  value: '163',
                  label: '网易'
                }
              ];
            }
            item.loading = false;
            callback();
          }, 1000);
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
          this.editData.address = val;
          this.setCascader("","block","")
        },
        dateChange(date){

          this.editData.firstPurchaseTime = date
        },
        submit(){
          if(this.$route.query.id){
            this.editData.id = this.$route.query.id
          }
          this.$http.post(`${this.$api}/base/customer/addCustomer`,this.editData).then(response=>{
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
@import './edit-client.styl';
</style>
