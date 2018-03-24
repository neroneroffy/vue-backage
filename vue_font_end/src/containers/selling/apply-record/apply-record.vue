<template>
    <div class="apply-record">

      <div class="search-wrapper">
        <BaseTitle title="申请记录"/>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
<!--            <FormItem>
              <Input type="text" v-model="searchContent.customerName" placeholder="客户名称"/>
            </FormItem>-->
            <FormItem>
              <Input type="text" v-model="searchContent.mobilePhone" placeholder="客户电话"/>
            </FormItem>
            <FormItem>
              <Input type="text" v-model="searchContent.applyNo" placeholder="申请单编号"/>
            </FormItem>

            <FormItem>
              <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Tabs  v-model="currentTab" :value="currentTab" @on-click="tab">
        <TabPane label="赠品" name="GIFT">
          <Table :columns="columns" :data="listData" class="table"></Table>
        </TabPane>
        <TabPane label="物料" name="MATERIEL">
          <Table :columns="columns" :data="listData" class="table"></Table>
        </TabPane>
      </Tabs>
      <div class="pagination">
        <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" placement="top" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
      </div>
    </div>
</template>

<script>
  import BaseTitle from "@/components/base-title";
    export default {
        name: "apply-record",
      data(){
          return {
            searchContent: {
              mobilePhone:'',
              applyNo:''
            },
            status:[
              {
                name:"已审核",
                id:"PASS"
              },
              {
                name:"未审核",
                id:"NAVER"
              },
              {
                name:"未通过",
                id:"NO"
              }
            ],
            columns:[
              {
                title:"客户名称",
                key:"customerName"
              },
              {
                title:"客户电话",
                key:"mobilePhone"
              },
              {
                title:"申请日期",
                key:"date"
              },
              {
                title:"申请单编号",
                key:"applyNo"
              },
              {
                title:"所属销售人员帐户",
                key:"salesAccount"
              },
              {
                title:"申请单状态",
                key:"status",
                render:(h,params)=>{
                  return h('Tag',{
                    props:{
                      color:this.tagColor(params.row.status).color,
                      type:"dot"
                    }
                  },
                    this.tagColor(params.row.status).txt)
                }
              },

              {
                title:"备注",
                key:"mark"
              },
              {
                title:"操作",
                key:"option",
                render:(h,params)=>{
                  return ("div",[
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
                    }, '查看')
                  ])

                }
              },
            ],
            pageSizeList:[5,10,20],
            pageSize:5,
            total:0,
            currentPage:1,
            api:"",
            listData:[],
            currentTab:'GIFT',

          }
      },
      components:{
        BaseTitle
      },
      mounted(){
        this.pagination()
        let params= {
          customerId:"1",
          stockType:this.status
        }
      },
      methods:{
        tagColor(flag){
          switch (flag){
            case "UNAUDIT":
              return {
                color:"blue",
                txt:"待审核"
              };
              break;
            case "UNSEND":
              return {
                color:"yellow",
                txt:"未发货"
              };
            case "ALLSEND":
              return {
                color:"#9F8EFF",
                txt:"已发货"
              };
              break;
            case "COMPLETE":
              return {
                color:"green",
                txt:"已完成"
              };
              break;
            case "REPULSE":
              return {
                color:"red",
                txt:"已拒绝"
              };
              break;
            case "CLOSE":
              return {
                color:"#c9c9c9",
                txt:"已拒绝"
              };
              break;
            default:
              return {
                color:"#c2c99f",
                txt:"未定义状态"

              }
          }
        },
        handleSubmit(){
          this.pagination();
        },
        tab(name){
          console.log(name);
          this.currentTab = name;
          this.pagination();
        },
//查看
        show(params){
          console.log(params)
          this.$router.push({path:"/selling/apply-record/edit-apply-record",query:{
              id:params.row.id
          }})
        },
        //分页函数
        pagination(customsParams){
          let defaultParams = {
            ...this.searchContent,
            applyType:this.currentTab,
            currentPage :1,
            pageSize : 5
          };
          let params = customsParams || defaultParams;
          ///base/product/findAllProduct  查询所有产品
          this.$http.post(`${this.$host}/base/goodsApply/findAllGoodApply`,{...params})
            .then(response=>{
              if(response){
                console.log(response.data);
                let res = response.data;
                this.listData = res.pageList;
                this.total = res.totalElements;
              }
              })

        },
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          let params = {
            ...this.searchContent,
            applyType:this.currentTab,
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };

          this.pagination(params)
        },
        changePageSize(currentPageSize){
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          let params = {
            ...this.searchContent,
            applyType:this.currentTab,
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };
          this.pagination(params)
        },

      }
    }
</script>

<style scoped lang="stylus">
@import './apply-record.styl'
</style>
