<template>
  <div class="edit-stock-in-order">
    <BastTitle :title="title"></BastTitle>
    <div class="search-wrapper">
      <div class="search">
        <Form ref="formInline"  inline>
          <FormItem prop="user">
            <DatePicker type="date" placeholder="单据日期" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem prop="user">
            <DatePicker type="date" placeholder="交货日期" style="width: 200px"></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div>
        <Button type="primary" icon="plus-round" @click="save">保存入库单</Button>
      </div>

    </div>
    <Table :columns="columns" :data="data"></Table>
    <Modal
      v-model="goodsPicker"
      title="选择商品"
      @on-ok="selectDone"
      @on-cancel="cancel">
      <CommodityPicker type="goods"/>
    </Modal>
  </div>
</template>

<script>
  import BastTitle from  "@/components/base-title";
  import CommodityPicker from '@/components/commodity-picker/commodity-picker'
  import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
  export default {
    name: "edit-stock-in-order",
    data(){
      return{
        title:this.$route.query.id?this.$route.query.checked?'查看入库单':'编辑入库单':'新增入库单',
        isChecked:this.$route.query.checked?true:false,
        columns:[
          {
            title:"新增",
            key:"add",
            render:(h,params)=>{
              return h('div', [
                h('Button',{
                  props:{
                    type:"primary",
                    icon:"plus-round",
                    size:"small"
                  },
                  style:{
                    fontSize:"14px"
                  },
                  on:{
                    click:()=>{

                      this.addRow(params)
                    }
                  }
                }),
                h('Button',{
                  props:{
                    type:"error",
                    icon:"close-round",
                    size:"small"
                  },
                  style:{
                    marginLeft:"10px",
                    fontSize:"14px"
                  },
                  on:{
                    click:()=>{
                      this.closeRow(params.index)
                    }
                  }
                }),
              ])
            }
          },
          {
            title:"入库单",
            key:"inboundOrderId",

          },
          {
            title:"仓库",
            key:"warehouseId",
            render:(h,params)=>{
              return h('Select',{
                props:{
                  value:this.data[params.index].warehouseId,
                  placeholder:"选择仓库"
                },
                on:{
                  input:(e)=>{
                    params.row.warehouseId = e;
                  }
                }
              },this.warehouse.map((item)=>{
                  return h('Option',{
                    props:{
                      value:item.value,
                      label:item.name,
                    },

                  })
              }))
            }
          },
          {
            title:"货物名称",
            key:"goodsId",
            render:(h,params)=>{
              return h("div",{
                style:{
                  padding:"3px 5px",
                  cursor:"pointer",
                  background:"#f0f0f0",
                  borderRadius:"3px",
                  float:"left"
                },

                on:{
                  click:()=>{
                    this.goodsData = [
                      {
                        name:"纸尿裤1",
                        id:"1"
                      },
                      {
                        name:"纸尿裤2",
                        id:"2"
                      },
                      {
                        name:"纸尿裤3",
                        id:"3"
                      },
                      {
                        name:"纸尿裤4",
                        id:"4"
                      },
                      {
                        name:"纸尿裤5",
                        id:"5"
                      },
                      {
                        name:"纸尿裤6",
                        id:"6"
                      },
                      {
                        name:"纸尿裤7",
                        id:"7"
                      },
                      {
                        name:"纸尿裤8",
                        id:"8"
                      },
                      {
                        name:"纸尿裤9",
                        id:"9"
                      },
                    ];
                    this.currentRow = params.index
                    this.goodsPicker = true
                  },
                }
              },this.data[params.index].goodsId?this.data[params.index].goodsId:"请选择商品")
            }

          },
          {
            title:"单位",
            key:"unitsId",
            render:(h,params)=>{
              return h('Select',{
                props:{
                  value:this.data[params.index].unitsId,
                  placeholder:"选择单位"
                },
                on:{
                  input:(e)=>{
                    params.row.unitsId = e

                  }
                }
              },this.units.map((item)=>{
                return h('Option',{
                  props:{
                    value:item.value,
                    label:item.name,
                  }
                })
              }))
            }
          },
          {
            title:"入库单价",
            key:"price",
            render:(h,params)=>{
              return h('Input',{
                props:{
                  value:params.row.price,
                  placeholder:"入库单价"
                },

                on:{
                  input:(v)=>{
                    params.row.price = v
                  }
                }
              })
            }
          },
          {
            title:"入库数量",
            key:"num",
            render:(h,params)=>{
              return h('Input',{
                props:{
                  value:params.row.num,
                  placeholder:"入库数量"
                },
                on:{
                  input:(v)=>{
                    params.row.num = v;
                    params.row.total = params.row.num * params.row.price
                  }
                }
              })
            }
          },
          {
            title:"总金额",
            key:"total",
            render:(h,params)=>{
              return h('Input',{
                props:{
                  value:params.row.total,
                  placeholder:"总金额"
                },

                on:{
                  input:(v)=>{
                    params.row.total = v
                  }
                }
              })
            }
          },
          {
            title:"备注",
            key:"mark",
            render:(h,params)=>{
              return h('Input',{
                props:{
                  value:this.data[params.index].mark,
                  placeholder:"备注"
                },
                on:{
                  input:(v)=>{
                    params.row.mark = v
                  }
                }
              })
            }

          },
        ],
        inputStyle:{
          width:"100%",
          height:"32px",
          lineHeightr:"34px",
          border:"1px solid #e4e4e4",
          borderRadius:"5px"
        },
        data:[
          {
            inboundOrderId:"454132456412314",
            warehouseId:"1",
            goodsId:"7",
            unitsId:"1",
            price:"",
            num:"",
            total:"78",
            mark:""
          }
        ],
        currentRow:0,
        goodsPicker:false,
        warehouse:[
          {
            name:"仓库1",
            value:"1"
          },
          {
            name:"仓库2",
            value:"2"
          },
        ],
        units:[
          {
            name:"单位1",
            value:"1"
          },
          {
            name:"单位2",
            value:"2"
          },
        ],
        goodsData:""
      }
    },
    mounted(){
      if(this.$route.query.id!==""){
        /*this.$http.get("",{
          params:{ id:this.$route.query.id }
        }).then(response =>{
          this.editData = response.data.data;
        })*/
      }
    },
    components:{
      BastTitle,
      CommodityPicker
    },
    methods:{
      inputValue(index){
       // this.data[index].
      },
      //新增一行
      selectDone(){
        this.goodsPicker = false
      },
      cancel(){
        this.goodsPicker = false
      },
      addRow(params){
        console.log(params);
        this.data[params.index] = params.row
        this.data.push(
          {
            inboundOrderId:"454132456412314",
            warehouseId:"1",
            goodsId:"",
            unitsId:"1",
            price:"",
            num:"",
            total:"",
            mark:""
          }
        )
      },
      //删除一行
      closeRow(i){
        this.data.splice(i,1)
      },
      //选择仓库
      selectWarahouse(e,i){
        console.log(e.target.value);
        console.log(i);
      },
      //保存入库单
      save(){
        console.log(this.data)
      },
      submit(){
        console.log(this.editData)
      }
    }
  }
</script>

<style scoped lang="stylus">
@import './edit-stock-in-order.styl'
</style>

