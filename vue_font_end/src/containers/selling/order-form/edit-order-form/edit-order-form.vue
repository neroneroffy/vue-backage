
<template>
  <div class="edit-order-form">
    <div class="search-wrapper">
      <div class="search">
        <Form ref="formInline":model="searchContent"  inline>
          <FormItem>
            <span>供货商：</span>
            <Select  style="width:200px"  placeholder="请选择供货商">
              <Option v-for="item in supplierList" :value="item.id" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>

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
    </div>
              <Table :columns="columns" :data="data"  > </Table>
  </div>
</template>

<script>
  import BastTitle from  "@/components/base-title";
  import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
  export default {
    name: "edit-order-form",
    data() {
      return {
        api:"http://192.168.31.13:8080",
        value4: "爸爸的选择",
        pageSizeList: [5, 10, 20],
        pageSize: 5,
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
            title: "订单唯一标识",
            key: "orderId",

          },
          {
            title: "货物唯一标识",
            key: "goodsId",
          },
          {
            title: "货物名",
            key: "goodsName",
          },
          {
            title: "计量单位唯一标识",
            key: "unitsId",
          },
          {
            title: "单位名",
            key: "units",
          },
          {
            title: "单价",
            key: "price",
          },
          {
            title: "数量",
            key: "num",
          },
          {
            title: "总价",
            key: "total",
          },
          {
            title: "实付金额",
            key: "realPay",
          },
          {
            title: "备注",
            key: "mark",
          },

        ],
        data: [
          {
            orderId: "",
            goodsId: "",
            goodsName: "",
            unitsId: "",
            units: "",
            price: "",
            num: "",
            total: "",
            realPay: "",
            mark: ""
          }
        ],
        supplierList:[
          {
            name:"供货商1",
            id:"1"
          },
          {
            name:"供货商2",
            id:"2"
          }
        ],
        goodsData: ""
      }
    },
    // mounted() {
    //   //初始请求分页
    //   let params = {
    //     currentPage: this.currentPage,
    //     pageSize: this.pageSize
    //   };
    //   this.pagination(params)
    // },
    mounted(){
      let id = this.$route.query.id
      this.$http.get(`${this.api}/base/orderItem/findAll`,{
        params:{ id:this.$route.query.id }
      }).then(response => {
        console.log(response.data)
        let res = response.data;
        this.data = res.pageList;
        this.total = res.content;
      })
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
          pageSize: 5
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
        // let defaultParams = {
        //   productNum: this.searchContent.productNum,
        //   productCode: this.searchContent.productCode,
        //   currentPage: 1,
        //   pageSize: 5
        // };
        let params = customsParams || defaultParams;
        ///base/product/findAllProduct  查询所有产品
        this.$http.post(`http://192.168.31.13:8080/base/product/findAllProduct`, data).then(response => {
          console.log(response.data)
          let res = response.data;
          this.listData = res.content;
          this.total = res.totalElements;
        })
      },
      // //点击分页
      // changePage(currentPageNum) {
      //   this.currentPage = currentPageNum;
      //   let params = {
      //     productNum: this.searchContent.productNum,
      //     productCode: this.searchContent.productCode,
      //     currentPage: this.currentPage,
      //     pageSize: this.pageSize
      //   };
      //
      //   this.pagination(params)
      // },
      // changePageSize(currentPageSize) {
      //   this.pageSize = currentPageSize;
      //   this.currentPage = 1;
      //   let params = {
      //     productNum: this.searchContent.productNum,
      //     productCode: this.searchContent.productCode,
      //     currentPage: this.currentPage,
      //     pageSize: this.pageSize
      //   };
      //   this.pagination(params)
      // },
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

