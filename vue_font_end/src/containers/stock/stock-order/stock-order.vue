<template>
    <div class="stock-order">
      <div class="materiel">
        <!--新增 表单搜索部分-->
        <div class="search-wrapper">
          <Button type="primary" icon="plus-round" @click="add" class="add">新增</Button>
          <div class="search">
            <Form ref="formInline" :model="searchContent" inline>
              <FormItem>
                <Input type="text" v-model="searchContent.materielName" placeholder="请输入名称"/>
              </FormItem>
              <FormItem>
                <Input type="text" v-model="searchContent.materielCode" placeholder="请输入编号"/>
              </FormItem>
              <FormItem>
                <Input type="text" v-model="searchContent.barCode" placeholder="请输入条形码"/>
              </FormItem>
              <FormItem>
                <Select v-model="searchContent.category" style="width:200px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <Tabs :value="currentTab" @on-click="tabChange">
          <TabPane label="商品" name="goods">
            <Table :columns="columns" :data="data" class="table" v-if="data"></Table>
          </TabPane>
          <TabPane label="赠品" name="present">
            <Table :columns="columns" :data="data" class="table" v-if="data"></Table>
          </TabPane>
          <TabPane label="物料" name="material">
            <Table :columns="columns" :data="data" class="table" v-if="data"></Table>
          </TabPane>
        </Tabs>
        <div class="pagination">
          <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize"  :total="total"></Page>
        </div>

      </div>
    </div>

</template>

<script>
  import {Table, Page, Form, Input, Select, Modal, Row, Col, Upload, Avatar} from 'iview';
    export default {
        name: "stock-order",
      data(){
        return{
          pageSizeList:[30,50,100],
          pageSize:30,
          total:0,
          data:"",
          loading:false,
          currentPage:1,
          columns:[
            {
              title: '采购单编号',
              key: 'orderNo',
              width:120,
            },
            {
              title: '供货商',
              key: 'supplierId',
              width:120,
            },
            {
              title: '采购员',
              key: 'purchaseId',
              width:120,
            },
            {
              title: '采购总价',
              key: 'totalPurchasePrice',
            },
            {
              title: '采购单含税总价',
              key: 'totalTaxPrice'
            },
            {
              title: '折扣率',
              key: 'discountRate'
            },
            {
              title: '优惠金额',
              key: 'discountAmount'
            },
            {
              title: '实际采购总金额',
              key: 'realTotalPrice'
            },
            {
              title: '交货日期',
              key: 'receiveTime'
            },
            {
              title: '采购类型',
              key: 'purchaseType',
            },
            {
              title: '采购单状态',
              key: 'status',
            },
            {
              title: '采购单审核状态',
              key: 'auditStatus',
            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              width:180,
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
                  h('Button', {
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
                  }, '删除')
                ]);
              }
            }
          ],
          currentTab:"goods",
          searchContent:{
            materielName:"",
            materielCode:"",
            barCode:"",
            category:""
          },
          cityList: [
            {
              value: '2654',
              label: 'A类'
            },
            {
              value: '2655',
              label: 'B类'
            },
            {
              value: '2656',
              label: 'C类'
            },
          ]
        }
      },
      mounted(){
        //初始请求分页
        let params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        };
        this.pagination(params)
      },
      methods:{
        //新增
        add(){
          this.$router.push({path:this.url})
        },
        //切换tabs的时候
        tabChange(name){
          this.currentTab = name;
          switch (name){
            case "goods":
              sessionStorage.setItem('orderName',"商品");
              break;
            case "presents":
              sessionStorage.setItem('orderName',"赠品");
              break;
            case "material":
              sessionStorage.setItem('orderName',"物料");
              break;
          }

          this.pagination();
          console.log(name);
        },
        //提交搜索
        handleSubmit() {
          console.log(this.searchContent)

        },
        //查看
        show(params){
          this.$router.push({path:this.url,query:{id:params.row.id,checked:true}})
        },
        //编辑
        edit(params){
          this.$router.push({path:this.url,query:{id:params.row.id}})
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
            pageNum:1,
            pageSize:30
          };
          let params = customsParams || defaultParams;
          let url = "/static/stockOrderGoods.json";
          switch (this.currentTab){
            case "goods":
              break;
            case "present":
              url = "/static/stockOrderPresents.json";
              break;
            case "material":
              url = "/static/stockOrderMaterial.json";
          }
          this.$http.get(url).then(response => {
            let data = response.data;
            this.data = data.list;
          })
        },
        //点击分页
        changePage(currentPageNum) {
          this.currentPage = currentPageNum;
          let params = {
            pageNum: this.currentPage,
            pageSize: this.pageSize
          };

          this.pagination(params)
        },
        changePageSize(currentPageSize) {
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          let params = {
            pageNum: this.currentPage,
            pageSize: this.pageSize
          };
          this.pagination(params)
        },
      },
      computed:{
        //跳转路由
        url(){
          switch(this.currentTab){
            case "goods":
              return `/stock/stock-order/edit-stock-order`;
            case "present":
              return `/stock/stock-order/edit-stock-order-present`;
            case "material":
              return `/stock/stock-order/edit-stock-order-material`;
          }
        }
      }
    }
</script>

<style scoped lang="stylus">
@import "./stock-order.styl";
</style>
