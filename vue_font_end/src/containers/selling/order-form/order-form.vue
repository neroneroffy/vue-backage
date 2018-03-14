
<template>
  <div class="order-form">
    <div class="search-wrapper">
      <div class="search">
        <Form ref="formInline"  inline>
          <span>供货商：</span>
          <Input v-model="value4" icon="more" placeholder="供货商" style="width: 150px"></Input>

          <FormItem prop="user">
            <span>单据日期：</span>
            <DatePicker type="date" placeholder="单据日期" style="width: 150px"></DatePicker>
          </FormItem>
          <FormItem prop="user">
            <span>交货日期：</span>
            <DatePicker type="date" placeholder="交货日期" style="width: 150px"></DatePicker>
          </FormItem>
          <FormItem prop="user">
            <span>查询：</span>
            <Input type="text" style="width: 150px" placeholder="请输入编号"/>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="ios-search" >搜索</Button>
          </FormItem>

        </Form>
      </div>
      <div>
        <Button type="primary" icon="plus-round" >保存订单</Button>
      </div>
    </div>
    <Table :columns="columns" :data="data" > </Table>

  </div>

</template>

<script>
  import BastTitle from  "@/components/base-title";
  import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
  export default {
    name: "order-form",
    data(){
      return{

        value4:"爸爸的选择",
        columns:[
          {
            title:"单据编号",
            width:100,
            key:"orderNo",

          },
          {
            title:"客户唯一标识",
            key:"customerId",
            width:110,
          },
          {
            title:"销售人员唯一标识",
            key:"salesId",
            width:140,

          },

          {
            title:"订单状态",
            key:"status",

          },
          {
            title:"发货时间",
            key:"sendTime",


          },
          {
            title:"收货信息",
            key:"address",


          },
          {
            title:"商品金额",
            key:"totalGoodsPrice",

          },
          {
        title:"运费",
          key:"dispatchPrice",

      },
          {
            title:"物流单号",
            key:"logisticCode",

          },
          {
            title: "备注",
            key: "mark",

          }
    ],
        data:[
          {
            orderNo:"没有的啊",
            customerId:"没有标识",
            salesId:"22334",
            status:"222",
            sendTime:"1",
            address:"frf",
            totalGoodsPrice:"22445",
            dispatchPrice:"3333",
            logisticCode:"1",
            mark:"33445"
          }
        ],
        goodsData:""
      }
    },
    mounted(){
      if(this.$route.query.id!==""){
        // this.$http.get("",{
        //   params:{ id:this.$route.query.id }
        // }).then(response =>{
        //   this.editData = response.data.data;
        // })
      }
    },
  }
</script>

<style scoped lang="stylus">
  @import "order-form.styl";
</style>

