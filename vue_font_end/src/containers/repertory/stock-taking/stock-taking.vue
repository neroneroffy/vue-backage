<template>
  <div class="stock">
    <Row type="flex" justify="end">
      <Col sapn="6">
          <Form inline>
            <FormItem prop="id">
              <Select v-model="id" :value="id" style="width:200px" placeholder="请选择仓库">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" icon="plus-circled" @click="make()">保存盘点记录</Button>
            </FormItem>
          </Form>
      </Col>
    </Row>
    <Tabs v-model="status" :value="status" @on-click="tab()">
      <TabPane label="商品" name="commodity" >
           <Table border :columns="commodityType" :data="commodity"></Table>
      </TabPane>
      <TabPane label="赠品" name="present" >标签二的内容</TabPane>
      <TabPane label="物料" name="materiel" >标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
  import iview from 'iview'
  import Collapse from "iview/src/components/collapse/collapse"

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
             inventoryNum:"",
             inventoryResult:""
          }
        ],
        commodityType:[
          {
            title: '仓库名称',
            key: 'warehouseId'
          },
          {
            title: '货物',
            key: 'goodsId'
          },
          {
            title: '单位',
            key: 'unitsId'
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
                    params.row.inventoryNum = val;
                    params.row.inventoryResult=parseInt(params.row.num)-parseInt(params.row.inventoryNum);
                    this.commodity[params.index]=params.row;
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
        searchContent: {
          id:"",
          account:"",
          phone:""
        },
        status:"commodity",
        cityList:[
          {
            value: '',
            label: '请选择仓库'
          },
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
        ]
      }
    },
    mounted(){
       ///base/warehouse/warehouseFindAll查询仓库
       this.$http.get("").then(response=>{

       })
    },
    methods:{
      //保存盘点单
      make(){
        this.$http.post("",this.commodity).then(response=>{

        })
      },
      tab(){
        console.log(this.status)
        let params={
          status:this.status,
          id:this.id
        }
        this.$http.post("",{}).then(response=>{

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
