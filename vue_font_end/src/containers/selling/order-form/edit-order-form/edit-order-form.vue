
<template>
  <div class="edit-order-form">
    <div class="search-wrapper">
      <div class="search">
        <Form ref="formInline":model="searchContent"  inline>
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

        </Form>
      </div>
      <!--<div>-->
      <!--<Button type="primary" icon="plus-round" >保存订单</Button>-->
      <!--</div>-->
    </div>
    <Table :columns="columns" :data="data"  > </Table>
    <div class="pagination">
      <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize"  placement="top" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
    </div>
  </div>

</template>

<script>
  import BastTitle from  "@/components/base-title";
  import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
  export default {
    name: "edit-order-form",
    data() {
      return {
        value4: "爸爸的选择",
        pageSizeList: [5, 10, 20],
        // pageSize: 5,
        total:1,
        currentPage:1,
        visible:false,
        loading:true,
        searchContent: {
          productNum: '',
          productCode: ''
        },
        columns: [
          {
            title: "单据编号",
            width: 100,
            key: "orderNo",

          },
          {
            title: "客户唯一标识",
            key: "customerId",
            width: 110,
          },
          {
            title: "销售人员唯一标识",
            key: "salesId",
            width: 140,
          },
          {
            title: "订单状态",
            key: "status",
          },
          {
            title: "发货时间",
            key: "sendTime",
          },
          {
            title: "收货信息",
            key: "address",
          },
          {
            title: "商品金额",
            key: "totalGoodsPrice",
          },
          {
            title: "运费",
            key: "dispatchPrice",
          },
          {
            title: "物流单号",
            key: "logisticCode",

          },
        ],
        data: [
          {
            orderNo: "156*423582",
            customerId: "爸爸的选择",
            salesId: "宝宝的依赖",
            status: "已发",
            sendTime: "12：30",
            address: "代收",
            totalGoodsPrice: "224元",
            dispatchPrice: "15",
            logisticCode: "1225223320",
            mark: "这个商品已经被售出"
          }
        ],
        goodsData: ""
      }
    },
    mounted() {
      //初始请求分页
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.pagination(params)
    },
    methods: {
      done() {
        this.visible = false
      },
      cancel() {

      },
      //提交搜索
      handleSubmit() {
        console.log(this.searchContent)
        let data = {
          productNum: this.searchContent.productNum,
          productCode: this.searchContent.productCode,
          currentPage: 1,
          // pageSize: 5
        }
        this.$http.post(`http://192.168.31.13:8080/base/product/findAllProduct`, data).then(response => {
          console.log(response)
          let res = response.data;
          this.listData = res.content;
          this.total = res.totalElements;
        })
      },
      //
      pagination(customsParams) {
        let defaultParams = {
          productNum: this.searchContent.productNum,
          productCode: this.searchContent.productCode,
          currentPage: 1,
          // pageSize: 5
        };
        let params = customsParams || defaultParams;
        ///base/product/findAllProduct  查询所有产品
        this.$http.post(`http://192.168.31.13:8080/base/product/findAllProduct`, params).then(response => {
          console.log(response.data)
          let res = response.data;
          this.listData = res.content;
          this.total = res.totalElements;
        })
      },
      //点击分页
      changePage(currentPageNum) {
        this.currentPage = currentPageNum;
        let params = {
          productNum: this.searchContent.productNum,
          productCode: this.searchContent.productCode,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        };

        this.pagination(params)
      },
      changePageSize(currentPageSize) {
        this.pageSize = currentPageSize;
        this.currentPage = 1;
        let params = {
          productNum: this.searchContent.productNum,
          productCode: this.searchContent.productCode,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        };
        this.pagination(params)
      },
      // mounted(){
      //   if(this.$route.query.id!==""){
      //     // this.$http.get("",{
      //     //   params:{ id:this.$route.query.id }
      //     // }).then(response =>{
      //     //   this.editData = response.data.data;
      //     // })
      //   }
      // },
    }
  }
</script>

<style scoped lang="stylus">
  @import "edit-order-form.styl";
</style>

