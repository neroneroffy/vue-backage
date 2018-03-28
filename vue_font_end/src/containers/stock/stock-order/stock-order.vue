<template>
  <div class="stock-order">
    <div class="materiel">
      <!--新增 表单搜索部分-->
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="add" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem>
              <Input type="text" v-model="searchContent.orderNo" placeholder="采购单编号"/>
            </FormItem>
            <FormItem>
              <Input type="text" v-model="searchContent.nickName" placeholder="请输入采购员"/>
            </FormItem>
            <FormItem>
              <Select v-model="searchContent.status" style="width:200px" placeholder="采购单状态">
                <Option v-for="item in status" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="searchContent.auditStatus" style="width:200px" placeholder="审核状态">
                <Option v-for="item in checkStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Tabs :value="currentTab" @on-click="tabChange">
        <TabPane label="商品" name="商品">
          <Table :columns="columns" :data="data" class="table" ></Table>
        </TabPane>
        <TabPane label="赠品" name="赠品">
          <Table :columns="columns" :data="data" class="table" ></Table>
        </TabPane>
        <TabPane label="物料" name="物料">
          <Table :columns="columns" :data="data" class="table" ></Table>
        </TabPane>
      </Tabs>
      <div class="pagination">
        <Page show-sizer :current="pageCount" @on-change="changePage" @on-page-size-change="changePageSize"  placement="top" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
      </div>

    </div>
  </div>

</template>

<script>
  import formatDate from '@/util/convertTime';
  export default {
    name: "stock-order",
    data(){
      return{
        pageSizeList:[30,50,100],
        pageSize:30,
        total:0,
        data:[],
        api:"http://192.168.31.168:8080",
        loading:false,
        pageCount:1,
        columns:[
          {
            title: '采购单编号',
            key: 'orderNo',
          },
/*          {
            title: '供货商',
            key: 'supplierName',
          },
          {
            title: '采购员',
            key: 'nickName',
          },*/
          {
            title: '总金额',
            key: 'totalPurchasePrice',
          },
/*
          {
            title: '采购单含税总价',
            key: 'totalTaxPrice',
            width:"150"
          },
*/
/*
          {
            title: '折扣率',
            key: 'discountRate',
            width:"90"
          },
*/
/*
          {
            title: '优惠金额',
            key: 'discountAmount'
          },
*/
          {
            title: '实际总金额',
            key: 'realTotalPrice',

          },
          {
            title: '交货日期',
            key: 'receiveTime',

          },
          {
            title: '状态',
            key: 'status',
          },
          {
            title: '审核状态',
            key: 'auditStatus',
          },
          {
            title: '备注',
            key: 'mark',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width:180,
            render: (h, params) => {

              return this.user.roleCode === "finance"? h('div', [
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
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params)
                    }
                  }
                }, '编辑'),
                h('Button', {
                    props: {
                      type: 'default',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {

                        this.$http.get(`${this.$host}/base/PurchaseOrder/updateAndItStatus`,{
                          params:{
                            id:params.row.id
                          }
                        }).then(response=>{
                          let res = response.data;
                          if(res.result){
                            this.$Message.success(res.msg);
                            let params = {
                              ...this.searchContent,
                              pageCount: this.pageCount,
                              pageSize: this.pageSize
                            };
                            this.pagination(params)
                          }

                        })
                      }
                    }
                  }, '审核')

              ])
                :
                h('div', [
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
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params)
                    }
                  }
                }, '编辑'),

              ]);
            }
          }
        ],
        currentTab:"商品",
        searchContent:{
          name:"",
          orderNo:"",
          status:"",
          auditStatus:"",
          purchaseType:"GOODS",

        },
        status: [
          {
            name: '采购单状态',
            id:""
          },
          {
            name: '未入库',
            id:"UNSTORAGE"
          },
          {
            name: '部分入库',
            id:"STORAGE"
          },
          {
            name: '全部入库',
            id:"ALLSTORAGE"
          },
          {
            name: '已关闭',
            id:"CLOSE"
          },
        ],
        checkStatus: [
          {
            id: "",
            name: '审核状态'
          },
          {
            id: 'UNAUDIT',
            name: '未审核'
          },
          {
            id: 'AUDIT',
            name: '已审核'
          },
        ],
        type:"GOODS",
        user:""
      }
    },
    create(){
    },
    mounted(){
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(`角色标识${this.user.roleCode}`);

      //初始请求分页
      this.pagination()
    },
    methods:{
      //新增
      add(){
        this.$router.push({path:`/stock/stock-order/edit-stock-order`,query:{name:this.currentTab,type:this.type}})
      },
      //切换tabs的时候
      tabChange(name){
        this.currentTab = name;
        sessionStorage.setItem("currentTab",this.currentTab);
        this.pagination();

      },
      //提交搜索
      handleSubmit() {
        this.searchContent.purchaseType = this.type;
        this.searchContent.pageCount = 1;
        this.searchContent.pageSize = this.pageSize;

        this.$http.post(`${this.$host}/base/PurchaseOrder/findAllPurchaseOrder`,{...this.searchContent}).then(response=>{
          let res = response.data;

          res.content.forEach(v=>{
            v.status = this.storageStatus(v.status);
            v.auditStatus = this.auditStatus(v.auditStatus);
            v.receiveTime = formatDate(v.receiveTime)
          })


          this.data = res.content;
          this.total = res.count;
          console.log(res);
        })
      },
      //查看
      show(params){
        this.$router.push({path:`/stock/stock-order/edit-stock-order`,query:{id:params.row.id,checked:true,name:this.currentTab,type:this.type}})
      },
      //编辑
      edit(params){
        this.$router.push({path:`/stock/stock-order/edit-stock-order`,query:{id:params.row.id,name:this.currentTab,type:this.type}})
      },
      //删除
      remove(params){
        //获取id
        let id =  params.row.id;
        this.$Modal.confirm({
          content:'<p>确认删除此条数据吗?</p>',
          loading:true,
          onOk:()=>{
            this.$store.dispatch('modalLoading');
            this.$http.post(`${this.$api}/materiel/delete`,{id}).then(response  => {
              let res = response.data;
              if(res.result){
                this.pagination();
                this.$Modal.remove();
                this.$Message.info("删除成功");
              }
            })
          }
        })
      },
      storageStatus(status){
        switch (status){
          case "UNSTORAGE":
            return "未入库";
            break;
          case "STORAGE":
            return "部分入库";
            break;
          case "ALLSTORAGE":
            return "全部入库";
            break;
          case "CLOSE":
            return "已关闭";
        }
      },
      auditStatus(status){
        switch (status){
          case "UNAUDIT":
            return "未审核";
            break;
          case "AUDIT":
            return "已审核";
        }
      },
      //分页函数
      pagination(customsParams) {
        let defaultParams = {
          name:"",
          orderNo:"",
          status:"",
          auditStatus:"",
          pageCount:1,
          pageSize:30,
          purchaseType:this.tab
        };
        let params = customsParams || defaultParams;
        let url = `${this.$host}/base/PurchaseOrder/findAllPurchaseOrder`;
        this.$http.post(`${url}`,{
          ...params
        }).then(response => {
          if(response){
            let res = response.data;
            console.log(res);
            res.content.forEach(v=>{
              v.status = this.storageStatus(v.status);
              v.auditStatus = this.auditStatus(v.auditStatus);
              v.receiveTime = formatDate(v.receiveTime)
            })
            this.data = res.content;
            this.total = res.numberOfElements;

          }

          //this.data = data.list;
        })
      },
      //点击分页
      changePage(currentPageNum) {
        console.log(currentPageNum);
        this.pageCount = currentPageNum;
        let params = {
          ...this.searchContent,
          pageCount: this.pageCount,
          pageSize: this.pageSize
        };
/*        this.$http.post(`${this.$host}/base/PurchaseOrder/findAllPurchaseOrder`,{...this.params}).then(response=>{
          let res = response;
          this.data = res.pageList;
          this.total = res.count;
        })
        console.log(params);*/
        this.pagination(params)
      },
      changePageSize(currentPageSize) {
        this.pageSize = currentPageSize;
        this.pageCount = 1;
        let params = {
          ...this.searchContent,
          pageCount: this.pageCount,
          pageSize: this.pageSize
        };
        this.pagination(params)
      },
    },
    computed:{
      tab(){
        switch (this.currentTab){
          case "商品":
            this.type="GOODS";
            return "GOODS";
            break;
          case "赠品":
            this.type="GIFT";
            return "GIFT";
            break;
          case "物料":
            this.type="MATERIEL";
            return "MATERIEL";
          default:
            this.type="GOODS";
            return "GOODS"
        }
      },

      //跳转路由
/*      url(){
        switch(this.currentTab){
          case "goods":
            return `/stock/stock-order/edit-stock-order`;
          case "present":
            return `/stock/stock-order/edit-stock-order-present`;
          case "material":
            return `/stock/stock-order/edit-stock-order-material`;
        }
      }*/
    }
  }
</script>

<style scoped lang="stylus">
  @import "./stock-order.styl";
</style>
