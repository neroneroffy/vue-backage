<template>
  <div class="edit-stock-in-order">
    <BastTitle :title="title"></BastTitle>
    <div class="search-wrapper">
      <div class="search">
        <Form ref="formInline"  inline>
          <FormItem v-if="!isNew">
            <Tag type="dot">入库单编号：{{baseData.orderNo}}</Tag>
          </FormItem>
          <FormItem  v-if="!isNew">
            <Tag type="dot">单据日期：{{baseData.date}}</Tag>
          </FormItem>
          <FormItem>
            <Select v-model="baseData.supplierId" style="width:200px" :disabled="isChecked" placeholder="请选择供货商">
              <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.supplierName }}</Option>
            </Select>
          </FormItem>
          <FormItem v-if="title.indexOf('编辑')<0">
            <Input type="text" v-model="baseData.stockInOrder" placeholder="关联采购单"/>
          </FormItem>

        </Form>
      </div>

      <div v-if="!isChecked">
        <Button type="primary" icon="plus-round" @click="save">保存入库单</Button>
      </div>

    </div>
    <Table :columns="columns" :data="data" ref="table"></Table>
    <div class="remark">
      <p>入库单备注</p>
      <Input type="textarea" :rows="4" placeholder="请填写单据备注" :disabled="isChecked"  v-model="baseData.mark"/>
    </div>
    <CommodityPicker type="goods" :showPicker="goodsPicker" @selectDone="selectDone" @cancel="cancel"/>

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
        api:"http://192.168.1.25:8080",
        title:this.$route.query.id?this.$route.query.checked?`查看${this.$route.query.name}入库单`:`编辑${this.$route.query.name}入库单`:`新增${this.$route.query.name}入库单`,
        isChecked:this.$route.query.checked?true:false,
        isNew:this.$route.query.id?false:true,
        columns:this.$route.query.name === "物料"?
          [
            {
              title:"新增",
              key:"add",
              render:(h,params)=>{
                return h('div', [
                  h('Button',{
                    props:{
                      type:"primary",
                      icon:"plus-round",
                      size:"small",
                      disabled:this.isChecked
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
                      size:"small",
                      disabled:this.isChecked
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
                      if(this.isChecked){
                        return
                      }

                      this.currentRow = params.index
                      this.goodsPicker = true
                    },
                  }
                },this.selectedGood[params.index].goodsName?this.selectedGood[params.index].goodsName:"请选择商品")
              }

            },
            {
              title:"仓库",
              key:"warehouseId",
              render:(h,params)=>{
                return h('Select',{
                  props:{
                    value:this.data[params.index].warehouseId,
                    placeholder:"选择仓库",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(e)=>{
                      params.row.warehouseId = e;
                    }
                  }
                },this.warehouse.map((item)=>{
                    return h('Option',{
                      props:{
                        value:item.id || 1,
                        label:item.warehouseName,
                      },
                    })
                }))
              }
            },
            {
              title:"单位",
              key:"unitsId",
              render:(h,params)=>{
                return h('Select',{
                  props:{
                    value:this.data[params.index].unitsId,
                    placeholder:"选择单位",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(e)=>{
                      params.row.unitsId = e

                    }
                  }
                },this.units.map((item)=>{
                  return h('Option',{
                    props:{
                      value:item.id || 1,
                      label:item.units,
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
                    placeholder:"入库单价",
                    disabled:this.isChecked
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
                    placeholder:"入库数量",
                    disabled:this.isChecked
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
                    placeholder:"总金额",
                    disabled:this.isChecked
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
                    placeholder:"备注",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.mark = v
                    }
                  }
                })
              }

            },
         ]:
          [
            {
              title:"新增",
              key:"add",
              render:(h,params)=>{
                return h('div', [
                  h('Button',{
                    props:{
                      type:"primary",
                      icon:"plus-round",
                      size:"small",
                      disabled:this.isChecked
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
                      size:"small",
                      disabled:this.isChecked
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
                      if(this.isChecked){
                        return
                      }

                      this.currentRow = params.index
                      this.goodsPicker = true
                    },
                  }
                },this.selectedGood[params.index].goodsName?this.selectedGood[params.index].goodsName:"请选择商品")
              }

            },
            {
              title:"货物型号",
              key:"modelSize",
              render:(h,params)=>{
                return h("div",{
                  style:{
                    padding:"3px 5px",
                    cursor:"pointer",
                    background:"#f0f0f0",
                    borderRadius:"3px",
                    float:"left"
                  },
                },this.selectedGood[params.index].goodsName?params.row.modelSize:"请先选择商品")
              }

            },
            {
              title:"仓库",
              key:"warehouseId",
              render:(h,params)=>{
                return h('Select',{
                  props:{
                    value:this.data[params.index].warehouseId,
                    placeholder:"选择仓库",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(e)=>{
                      params.row.warehouseId = e;
                    }
                  }
                },this.warehouse.map((item)=>{
                  return h('Option',{
                    props:{
                      value:item.id || 1,
                      label:item.warehouseName,
                    },

                  })
                }))
              }
            },
            {
              title:"单位",
              key:"unitsId",
              render:(h,params)=>{
                return h('Select',{
                  props:{
                    value:this.data[params.index].unitsId,
                    placeholder:"选择单位",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(e)=>{
                      params.row.unitsId = e

                    }
                  }
                },this.units.map((item)=>{
                  return h('Option',{
                    props:{
                      value:item.id || 1,
                      label:item.units,
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
                    placeholder:"入库单价",
                    disabled:this.isChecked
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
                    placeholder:"入库数量",
                    disabled:this.isChecked
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
                    placeholder:"总金额",
                    disabled:this.isChecked
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
                    placeholder:"备注",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.mark = v
                    }
                  }
                })
              }

            },
          ]
        ,
        type:"GOODS",
        inputStyle:{
          width:"100%",
          height:"32px",
          lineHeightr:"34px",
          border:"1px solid #e4e4e4",
          borderRadius:"5px"
        },
        data:this.$route.query.name === "物料"?
          [
            {
              warehouseId:"",
              goodsId:"",
              goodsName:"",
              unitsId:"",
              price:"",
              num:"",
              total:"",
              mark:""
            }
          ]:
          [
            {
              warehouseId:"",
              goodsId:"",
              modelSize:"",
              goodsName:"",
              unitsId:"",
              price:"",
              num:"",
              total:"",
              mark:""
            }
          ]
        ,
        currentRow:0,
        goodsPicker:false,
        warehouse:[
          {
            name:"仓库1",
            value:6
          },
          {
            name:"仓库2",
            value:3
          },
        ],
        modelSize:["NB","S"],
        units:[
          {
            name:"单位1",
            value:1
          },
          {
            name:"单位2",
            value:2
          },
        ],
        selectedGood:[{
          goodsName:"",
          goodsId:""
        }],
        supplierList:[
          {
            name:"供货商1",
            id:"1"
          },
          {
            name:"供货商2",
            id:"2"
          }
        ],
        baseData:{
          supplier:"",
          orderNo:"",
          createTime:"",
          purchaseOrderNo:"",
          operatorId:"",
          inboundType:"",
          userName:"",
          mark:""
        }
      }
    },
    mounted(){
      switch (this.$route.query.name){
        case "商品":
          this.type = "GOODS";
          break;
        case "赠品":
          this.type = "GIFT";
          break;
        case "物料":
          this.type = "MATERIEL";
          break;
      };
      if(this.$route.query.id){
        this.$http.get(`${this.api}/base/InboundOrder/findInboundOrderById`,{
          params:{ id:this.$route.query.id }
        }).then(response =>{
          let res = response.data;

          this.baseData = res;
            this.data = res.inboundOrderItemModelList;
            this.units = res.unitsList;
            this.warehouse = res.warehouseList;
            this.supplierList = res.supplierList;
          console.log(this.baseData);
          this.selectedGood = [];
            console.log(this.data);
            this.data.forEach((v,i)=>{
                this.selectedGood.push({
                  goodsName:v.goodsName,
                  goodsId:v.goodsId
                })
            })
        })
      }else{
        //调用仓库接口
        this.$http.get(`${this.api}/base/warehouse/warehouseFindAll`).then(response=> {
          console.log(response.data)
          let res = response.data;
          if(res.result){
            this.warehouse = res.data
          }
        });
        //单位接口
        this.$http.get(`${this.$api}/base/units/findAll/`).then(response=>{
          let res = response.data;
          if(res){
            this.units = res;
          }
        })
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
      //选择商品完毕
      selectDone(data){
        this.selectedGood[this.currentRow].goodsName = data.productName;
        this.selectedGood[this.currentRow].goodsId = data.id;
        this.$refs.table.rebuildData[this.currentRow].goodsName = data.productName;
        this.$refs.table.rebuildData[this.currentRow].modelSize = data.modelSize;
        this.$refs.table.rebuildData[this.currentRow].goodsId = data.id;
        this.goodsPicker = false
      },
      cancel(){
        this.goodsPicker = false
      },
      //选择日期
      dateSelect(date){
        this.baseData.date = date
      },
      addRow(params){
        console.log(params);
        this.data = this.$refs.table.rebuildData;
        //this.data[params.index] = params.row;
        this.data.push(
          {
            warehouseId:"1",
            goodsId:"",
            unitsId:"1",
            price:"",
            num:"",
            total:"",
            mark:""
          }
        );
        this.selectedGood.push({
          goodsName:"",
          goodsId:""
        })
      },
      //删除一行
      closeRow(i){
        this.data.splice(i,1);
        this.selectedGood.splice(i,1)
      },
      //选择仓库
      selectWarahouse(e,i){

      },
      //保存入库单
      save(){
        this.data = this.$refs.table.rebuildData;
        this.baseData.inboundType = this.type;
        let submitData = {
            ...this.baseData,
          inboundOrderItemModelList:this.data
        };
        this.$http.post(`${this.api}/base/InboundOrder/addInboundOrder`,{...submitData}).then(response=>{
          let res = response.data;
          if(res.result){
            this.$Message.success('成功');
            this.$router.push(`/stock/stock-in-order`)
          }else{
            this.$Message.success(res.msg);
          }
          console.log(res);
        })

      },
      submit(){

      }
    }
  }
</script>

<style scoped lang="stylus">
@import './edit-stock-in-order.styl'
</style>

