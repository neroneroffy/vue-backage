<template>
  <div class="stock-in-order">
    <div class="materiel">
      <!--新增 表单搜索部分-->
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="add" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem>
              <Input type="text" v-model="searchContent.orderNo" placeholder="请输入编号"/>
            </FormItem>
            <FormItem>
              <DatePicker type="date" placeholder="选择日期" @on-change="selectDate" style="width: 200px"></DatePicker>
            </FormItem>

            <FormItem>
              <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Tabs :value="currentTab" @on-click="tabChange">
        <TabPane label="商品" name="商品">
          <Table :columns="columns" :data="data" class="table" v-if="data"></Table>
        </TabPane>
        <TabPane label="赠品" name="赠品">
          <Table :columns="columns" :data="data" class="table" v-if="data"></Table>
        </TabPane>
        <TabPane label="物料" name="物料">
          <Table :columns="columns" :data="data" class="table" v-if="data"></Table>
        </TabPane>
      </Tabs>
      <div class="pagination">
        <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" :current="pageCount"  placement="top" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]"  :total="total"></Page>
      </div>
    </div>
  </div>

</template>

<script>
  import formatDate from '@/util/convertTime';
  export default {
    name: "stock-in-order",
    data(){
      return{
        api:"http://192.168.31.168:8080",
        pageSizeList:[5,50,100],
        pageSize:5,
        total:0,
        data:"",
        loading:false,
        pageCount:1,
        columns:[
          {
            title: '单据编码',
            key: 'orderNo',

          },
          {
            title: '关联采购单',
            key: 'purchaseOrderNo'
          },
          {
            title: '单据日期',
            key: 'createTime'
          },

          {
            title: '入库人员',
            key: 'operatorId',
          },
          {
            title: '备注',
            key: 'mark'
          },

          {
            title: '操作',
            key: 'action',
            width:180,
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
                /*h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params)
                    }
                  }
                }, '删除')*/
              ]);
            }
          }
        ],
        currentTab:"商品",
        searchContent:{
          orderNo:"",
          createTime:""
        },

      }
    },

    mounted(){
      //初始请求分页

      this.pagination()
    },
    methods:{
      //新增
      add(){
        this.$router.push({path:'/stock/stock-in-order/edit-stock-in-order',query:{name:this.currentTab,type:this.type}})
      },
      selectDate(date){
        this.searchContent.createTime = date;
      },
      //切换tabs的时候
      tabChange(name){
        this.currentTab = name;
        sessionStorage.setItem("currentTab",this.currentTab);
        this.pagination();

      },
      //提交搜索
      handleSubmit() {

        this.searchContent.inboundType = this.type;
        this.$http.post(`${this.$host}/base/inboundOrder/findAllInboundOrder`,{...this.searchContent,pageCount:1,pageSize:this.pageSize}).then(response=>{
          if(response){
            let res = response.data;
            res.pageList.forEach(v=>{
              v.createTime = formatDate(parseInt(v.createTime))
            })
                this.data = res.pageList;
                this.total = res.count;
          }
        })
      },
      //查看
      show(params){
        this.$router.push({path:`/stock/stock-in-order/edit-stock-in-order`,query:{id:params.row.id,checked:true,name:this.currentTab}})
      },
      //编辑
      edit(params){
        this.$router.push({path:`/stock/stock-in-order/edit-stock-in-order`,query:{id:params.row.id,name:this.currentTab,type:this.type}})
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
      //分页函数

      pagination(customsParams) {

        let defaultParams = {
            ...this.searchContent,
          inboundType:this.type,
          pageCount:1,
          pageSize:5
        };
        let params = customsParams || defaultParams;
        let url = `${this.$host}/base/inboundOrder/findAllInboundOrder`;
        this.$http.post(url,params).then(response => {
          if(response){
            let res = response.data;
            //转换时间戳

            res.pageList.forEach(v=>{
              v.createTime = formatDate(parseInt(v.createTime))
            });

            this.data = res.pageList;
            this.total = res.count
          }

        })
      },
      //点击分页
      changePage(currentPageNum) {
        this.pageCount = currentPageNum;
        this.searchContent.inboundType = this.type;
        let params = {
          ...this.searchContent,
          pageCount: this.pageCount,
          pageSize: this.pageSize
        };
        this.pagination(params)
      },
      changePageSize(currentPageSize) {
        this.pageSize = currentPageSize;
        this.pageCount = 1;
        let params = {
          ...this.searchContent,
          inboundType:this.type,
          pageCount: this.pageCount,
          pageSize: this.pageSize
        };
        this.pagination(params)
      },
    },
    computed:{
      type(){
        switch (this.currentTab){
          case "商品":
            return "GOODS";
            break;
          case "赠品":
            return "GIFT";
            break;
          case "物料":
            return "MATERIEL";
            break;
          default:
            return "GOODS";
        }

      },
      //跳转路由；由于字段都一样，所以暂时用一个页面
/*      url(){
        switch(this.currentTab){
          case "goods":
            return `/stock/stock-in-order/edit-stock-in-order`;
          case "present":
            return `/stock/stock-in-order/edit-stock-in-order-present`;
          case "material":
            return `/stock/stock-in-order/edit-stock-in-order-material`;
        }

      }*/
    }
  }
</script>

<style scoped lang="stylus">
  @import "./stock-in-order.styl";
</style>
