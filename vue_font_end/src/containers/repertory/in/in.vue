<template>
  <!--盘点查询-->
  <div class="stock">
    <Row type="flex" justify="space-between">
      <div>
        <BastTitle title="盘点入库"/>
      </div>
      <div class="search">
        <Form  inline>
          <DatePicker type="daterange" :value="time" @on-change="timey"></DatePicker>
        </Form >
        <Form>
          <FormItem prop="id">
            <Select v-model="id" :value="id" style="width:200px;margin-left:30px" placeholder="请选择仓库">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.contacts }}</Option>
            </Select>
          </FormItem>
        </Form >

      </div>
    </Row>
    <Table :border="false" :columns="commodityType" :data="commodity"></Table>
    <div class="pagination">
      <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" placement="top"
            :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
    </div>
  </div>
</template>

<script>
  import BastTitle from "@/components/base-title";
  export default {
    name: "in",
    data(){
      return{
        commodity:[],
        time:[new Date(new Date().getTime() - 7 * 24 * 3600 * 1000).toLocaleDateString(),new Date(Number(new Date().getTime()) +  24 * 3600 * 1000)],
        id:"",
        cityList:[],
        pageSizeList: [5, 10, 20],
        pageSize: 5,
        total: 0,
        currentPage: 1,
        commodityType:[
          {
            title:'时间',
            key:"createTime"
          },
          {
            title: '仓库名称',
            key: 'warehouseName'
          },
          {
            title:'类型',
            key:'inboundType'
          },
/*
          {
            title: '负责人',
            key: 'userName'
          },
*/
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    disabled:!params.row.del
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:'/repertory/in/edit-in',query:{id:params.row.inventoryNo,ischecked:true}})
                    }
                  }
                }, '已入库'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled:params.row.del
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:'/repertory/in/edit-in',query:{id:params.row.inventoryNo}})
                    }
                  }
                }, '待入库')
              ])
            }
          }
        ],


      }},
    mounted(){
      let date=new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
      this.time[0]=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      date=new Date(Number(new Date().getTime()) +  24 * 3600 * 1000);
      console.log(date)
      this.time[1]=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      this.$http.get("http://192.168.31.168:8080/base/warehouse/warehouseFindAll").then(response=>{
        let res=response.data;
        this.cityList=res;
        this.id=res[0].id;
        this.pagination()
      })
    },
    components:{
      BastTitle
    },
    methods:{
      inboundType(type){
        switch(type){
          case "GOODS":
            return "商品";
            break;
          case "GIFT":
            return "赠品";
            break;
          case "MATERIEL":
            return "物料";
        }
      },
      timey(daterange){
        this.time=daterange;
        this.pagination()
      },
      pagination(customsParams) {
        //console.log(this.time)
        let defaultParams = {
          pageSize:this.pageSize,
          currentPage:this.currentPage,
          startTime:this.time[0],
          endTime:this.time[1],
          warehouseId:this.id
        };
        let params = customsParams || defaultParams;
        ///base/inventoryOutboundItem/outBound
        ///base/inventoryOutbound/find出库单
        // console.log(params);
        this.$http.post("http://192.168.31.168:8080/base/inventoryInbound/find",params).then( response =>{
          console.log(response)
          let res=response.data;
          this.commodity=res.pageList;
          if(this.commodity){
            this.commodity.forEach(item=>{
              item.createTime=new Date(Number(item.createTime)).toLocaleDateString();
              item.inboundType = this.inboundType(item.inboundType)
            })
            this.total=res.count;
          }else{
            this.commodity=[];
            this.total=0;
          }
        })
      },
      //点击分页
      changePage(currentPageNum) {
        this.currentPage = currentPageNum;
        this.pagination()
      },
      changePageSize(currentPageSize) {
        this.pageSize = currentPageSize;
        this.currentPage = 1;
        this.pagination()
      },
    }
  }
</script>

<style scoped lang="stylus">
  @import "./in.styl"

</style>

