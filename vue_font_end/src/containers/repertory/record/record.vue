<template>
  <!--盘点查询-->
  <div class="stock">
    <Row type="flex" justify="space-between">
          <Form  inline>
            <DatePicker type="daterange" v-model="time" :value="time"></DatePicker>
            <FormItem prop="id">
              <Select v-model="id" :value="id" style="width:200px" placeholder="请选择仓库">
                <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form >
    </Row>
    <Table border :columns="commodityType" :data="commodity"></Table>
    <div class="pagination">
      <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" placement="top"
            :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
    </div>
  </div>
</template>

<script>
    export default {
        name: "record",
        data(){
          return{
            pageSizeList: [5, 10, 20],
            pageSize: 5,
            total: 0,
            currentPage: 1,
            commodityType:[
              {
                title:'时间',
                key:"time"
              },
              {
                title: '仓库名称',
                key: 'warehouseId'
              },
              {
                title:'类型',
                key:'status'
              },
              {
                title: '负责人',
                key: 'goodsId'
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
                          this.$router.push({path:'/repertory/record/edit-record',query:{id:params.row.goodsId}})
                        }
                      }
                    }, '查看详情'),
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
                          this.$router.push({path:'',query:{id:params.row.id}})
                        }
                      }
                    }, '盘盈'),
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
                          this.$router.push({path:'',query:{id:params.row.id}})
                        }
                      }
                    }, '盘亏')
                  ]);
                }
              }
            ],
            commodity:[
              {
                time:"3/13:3:10.",
                warehouseId:"555",
                status:"商品",
                goodsId:"王大宝"
              }
            ],
            time:[new Date(new Date().getTime() - 86400000), new Date()],
            id:"",
            cityList1:[
              {
                value:"123",
                label:'123'
              }
            ]
          }
        },
        mounted(){
          /*this.$http.get("http://192.168.31.168/base/warehouse/warehouseFindAll").then(response=>{
            console.log(response)
            let res=response.data;
            this.cityList=res.data;
            this.pagination()
          })*/
        },
        methods:{
          pagination(customsParams) {
            let defaultParams = {
              time:[new Date(new Date().getTime() - 86400000), new Date()],
              id:'',
              currentPage: 1,
              pageSize: 5
            };
            let params = customsParams || defaultParams;
            /*/base/gift/findAllGift*/
            console.log(params)
            this.$http.post("http://192.168.31.34:8080/base/gift/findAllGift", params).then(response => {
              console.log(response)
              let data = response.data;
              this.listData = data.content;
              this.total = data.totalElements;
            })
          },
          //点击分页
          changePage(currentPageNum) {
            this.currentPage = currentPageNum;
            let params = {
              time:this.time,
              id:this.id,
              currentPage: this.currentPage,
              pageSize: this.pageSize
            };

            this.pagination(params)
          },
          changePageSize(currentPageSize) {
            this.pageSize = currentPageSize;
            this.currentPage = 1;
            let params = {
              time:this.time,
              id:this.id,
              currentPage: this.currentPage,
              pageSize: this.pageSize
            };
            this.pagination(params)
          },
        }
    }
</script>

<style scoped>
   @import "record.styl";
</style>

