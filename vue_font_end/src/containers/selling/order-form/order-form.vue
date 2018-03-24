//客户订单管理
<template>
  <div class="order-form">
    <div class="search-wrapper">
      <BastTitle title="客户订单管理"/>
      <div class="search">
        <Form ref="formInline":model="searchContent"  inline>
          <FormItem prop="orderNo">
            <Input type="text" style="width: 200px" v-model="searchContent.orderNo"  placeholder="请输入单据编号"/>
          </FormItem>
          <FormItem prop="customerId">
            <Input type="text" style="width: 200px" v-model="searchContent.customerId" placeholder="请输入客户名称"/>
          </FormItem>
          <FormItem prop="salesId">
            <Input type="text" style="width: 200px" v-model="searchContent.salesId"  placeholder="请输入销售人员名称"/>
          </FormItem>
          <FormItem prop="logisticCode">
            <Input type="text" style="width: 200px" v-model="searchContent.logisticCode" placeholder="请输入物流单号"/>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
          </FormItem>

        </Form>
      </div>
    </div>
    <Table :columns="columns" :data="data"  > </Table>
    <div class="pagination">
      <Page  show-sizer @on-change="changePage" @on-page-size-change="changePageSize"  :total="total" :current="currentPage" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]"></Page>
    </div>
  </div>

</template>

<script>
  import BastTitle from  "@/components/base-title";
  import convertTime from  "@/util/convertTime"
  import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
  export default {
    name: "order-form",
    data() {
      return {
        value4: "爸爸的选择",
        pageSizeList: [30, 10, 20],
        pageSize: 30,
        total:0,
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
            key: "orderNo",

          },
          {
            title: "客户名称",
            key: "customerId",

          },
          {
            title: "名称",
            key: "nickName",

          },
          {
            title: "销售人员名称",
            key: "salesId",
          },
          {
            title: "订单状态",
            key: "status",
            // render:(h,params)=>{
            //   h("",{},params.row.status === "null"?"":params.row.status)
            // }
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
          {
            title: "备注",
            key: "mark",
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params)
                    }
                  }
                }, '查看'),
              ]);
            }
          }
        ],
        data: [
          {
            orderNo: "",
            customerId: "",
            salesId: "",
            status: "",
            sendTime: "",
            address: "",
            nickName:"",
            totalGoodsPrice: "",
            dispatchPrice: "",
            logisticCode: "",
            mark: ""
          }
        ],
        goodsData: "",
        id: '',
      }
    },
    components:{
      BastTitle
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
      //查看
      show(params){
        this.$router.push({path:'/selling/order-form/edit-order-form/edit-order-form',query:{id:params.row.id}})
      },
      //提交搜索
      handleSubmit() {
        console.log(this.searchContent)
        let data = {
          orderNo: this.searchContent.orderNo,
          customerId: this.searchContent.customerId,
          salesId: this.searchContent.salesId,
          logisticCode: this.searchContent.logisticCode,
          currentPage: 1,
          pageSize: 30
        }
        ///base/order/seek单条查询
        this.$http.post(`${this.$host}/base/order/find`,{...data}).then(response => {
          console.log(response)
          let res = response.data;
          this.data = res.pageList;
          this.total = res.count;
        })
      },
      //分页函数
      pagination(customsParams) {
        let defaultParams = {
          orderNo: this.searchContent.orderNo,
          customerId: this.searchContent.customerId,
          salesId: this.searchContent.salesId,
          logisticCode: this.searchContent.logisticCode,
          currentPage: 1,
          pageSize: 30
        };
        let params = customsParams || defaultParams;
        ///base/order/findAll  查询所有产品
        this.$http.post(`${this.$host}/base/order/find`, params).then(response => {
          let res = response.data;
          res.pageList.forEach(v=>{
            v.sendTime = convertTime(parseInt(v.sendTime))

          })

          this.data = res.pageList;
          console.log(this.data);
          this.total = res.count;
        })
      },
      //点击分页
      changePage(currentPageNum) {
        this.currentPage = currentPageNum;
        let params = {
          orderNo: this.searchContent.orderNo,
          customerId: this.searchContent.customerId,
          salesId: this.searchContent.salesId,
          logisticCode: this.searchContent.logisticCode,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        };

        this.pagination(params)
      },
      changePageSize(currentPageSize) {
        this.pageSize = currentPageSize;
        this.currentPage = 1;
        let params = {
          orderNo: this.searchContent.orderNo,
          customerId: this.searchContent.customerId,
          salesId: this.searchContent.salesId,
          logisticCode: this.searchContent.logisticCode,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        };
        this.pagination(params)
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
  }
</script>

<style scoped lang="stylus">
  @import "order-form.styl";
</style>

