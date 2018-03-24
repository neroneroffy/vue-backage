<template>
  <div class="stock">
    <Row type="flex" justify="space-between">
      <Form inline>

        <FormItem prop="id">
          <Select v-model="id" :value="id" @on-change="tab" style="width:200px" placeholder="所有">
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.contacts }}</Option>
          </Select>
        </FormItem>
      </Form>
      <Form>
      <FormItem>
        <Button type="primary" icon="plus-circled" @click="make()">保存盘点记录</Button>
      </FormItem>
      </Form>
    </Row>
    <Tabs v-model="status" :value="status" @on-click="tab()">
      <TabPane label="商品" name="GOODS" >
      </TabPane>
      <TabPane label="赠品" name="GIFT" ></TabPane>
      <TabPane label="物料" name="MATERIEL" ></TabPane>
    </Tabs>
    <Table :border="false" :columns="commodityType" :data="commodity"></Table>
  </div>
</template>

<script>
  import iview from 'iview'
  import Collapse from "iview/src/components/collapse/collapse"
  import BaseTitle from "@/components/base-title"
  export default {
    components: {Collapse},
    name: "stock-taking",
    data() {
      return {
        /*
        {
            id:"123",
            pres:"12345",
            num:'',
            tho:""
          }
        * */
        id:"",
        visible:false,
        commodity:[
          {
             warehouseId:"21312",
             goodsId:"21312",
             unitsId:"12331",
             total:"21312",
             num:"12312",
             inventoryNum:"12",
             inventoryResult:"45",
             inventoryType:"GOODS",
          }
        ],
        commodityType:[
          {
            title: '仓库名称',
            key: 'warehouseName'
          },
          {
            title: '货物',
            key: 'goodsName'
          },
          {
            title: '单位',
            key: 'units'
          },
          {
            title: '金额',
            key: 'total'
          },
          {
            title: '数量',
            key: 'num'
          },
          {
            title: '盘点库存',
            key: 'inventoryNum',
            render: (h, params) => {
              return h('Input', {
                props: {
                  size: 'small',
                  value: params.row.inventoryNum
                },
                on: {
                  input: (val) => {
                    //赋值行内数据
                    console.log(params)
                    params.row.inventoryNum = val;
                    params.row.inventoryResult=parseInt(params.row.inventoryNum)-parseInt(params.row.num);
                    if(params.row.inventoryNum === ""){
                      params.row.inventoryResult = 0
                    }

                    this.commodity[params.index]=params.row;
                    console.log(this.commodity)
                  }
                }
              })
            }
          },
          {
            title: '盈亏',
            key: 'inventoryResult'
          },
        ],
        status:"GOODS",
        cityList:[
          {
            id:"",
            contacts:"所有"
          }
        ]
      }
    },
    mounted(){
      /*this.$http.get("http://192.168.31.168:8080/base/orderItem/export").then(response=>{
        console.log(response)
      })*/
       ///base/warehouse/warehouseFindAll查询仓库http://192.168.31.222:8080
       this.$http.get("http://192.168.31.168:8080/base/warehouse/warehouseFindAll").then(response=>{
          console.log(response)
          let res=response.data;
          this.cityList=this.cityList.concat(res);
       })
      let params= {
        warehouseId:this.id,
        stockType:this.status
      }
      this.$http.post("http://192.168.31.168:8080/base/stockInfo/search",params).then(response=>{

        let res = response.data;
        if(res){
          console.log(res);
          res.forEach((item)=>{
            item['inventoryNum']='';
            item['inventoryResult']='';
            item['inventoryType']=item['stockType'];
          })
          this.commodity=res;
        }else{
          this.commodity=[];
        }
      })
    },
    methods:{
      //保存盘点单base:inventoryRecord:addInventoryRecord
      make(){
        /*
          {
             warehouseId:"21312",
             goodsId:"21312",
             unitsId:"12331",
             total:"21312",
             num:"12312",
             inventoryNum:"12",
             inventoryResult:"45",
             inventoryType:"GOODS",
          }
         * */
        console.log(this.commodity)
        let params=[];
        this.commodity.forEach(item=>{
          if(item.inventoryNum){
            let obj = {
              warehouseId:item.warehouseId,
              goodsId:item.goodsId,
              unitsId:item.unitsId,
              total:item.total,
              num:item.num,
              inventoryNum:item.inventoryNum,
              inventoryResult:item.inventoryResult,
              inventoryType:item.inventoryType,
            }
            params.push(obj)
          }
        })
        console.log(params)
        this.$http.post("http://192.168.31.168:8080/base/inventoryRecord/addInventoryRecord",params).then(response => {
          if(response.data.result){
            this.$Message.success(response.data.msg)
          }

        })
      },
      tab(){
        console.log(this.status)
        let params={
          stockType:this.status,
          warehouseId:this.id
        }
        this.$http.post("http://192.168.31.168:8080/base/stockInfo/search",params).then(response=>{
          console.log(response)
          let res = response.data;
          if(res){
            res.forEach((item)=>{
              item['inventoryNum']='';
              item['inventoryResult']='';
              item['inventoryType']=item['stockType'];
            })
            this.commodity=res;
          }else{
            this.commodity=[];
          }

        })
      }
    }
  }
</script>
<!--
    仓库唯一标识 warehouseld
    货物唯一标识 goodsld
    单位唯一标识 unitsld
    库存金额 total
    库存数量 num
    盘点库存 inventoryNum
    盘亏或盘盈数量 inventoryResult
    盘点人 userId
-->
<style scoped>

</style>
