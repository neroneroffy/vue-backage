//新增采购单
<template>
  <div class="edit-stock-order">
    <BastTitle :title="title"></BastTitle>
    <div class="search-wrapper">
      <div class="search">
        <Form ref="formInline"  inline>
          <FormItem v-if="!isNew">
            <Tag type="dot">采购单编号：{{baseData.orderNo}}</Tag>
          </FormItem>
          <FormItem  v-if="!isNew">
            <Tag type="dot">单据日期：{{baseData.createTime}}</Tag>
          </FormItem>
          <FormItem>
            <Select v-model="baseData.supplier" style="width:200px" :disabled="isChecked" placeholder="请选择供货商">
              <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.supplierName }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Input type="text" placeholder="单据折扣率" v-model="baseData.discountRate" :disabled="isChecked" />
          </FormItem>

        </Form>
      </div>
      <div v-if="!isChecked">
        <Button type="primary" icon="plus-round" @click="save">保存采购单</Button>
      </div>

    </div>
    <Table :columns="columns" :data="data" ref="table"></Table>
    <div class="remark">
      <p>采购单备注</p>
      <Input type="textarea" :rows="4" placeholder="请填写单据备注" :disabled="isChecked"  v-model="baseData.mark"/>
    </div>
    <CommodityPicker :type="type" :showPicker="goodsPicker" @selectDone="selectDone" @cancel="cancel"/>
  </div>
</template>

<script>
  import BastTitle from  "@/components/base-title";
  import CommodityPicker from '@/components/commodity-picker/commodity-picker'
  export default {
    name: "edit-stock-order",
    data(){
      return{
        api:"http://192.168.31.222:8080",
        title:this.$route.query.id?this.$route.query.checked?`查看${this.$route.query.name}采购单`:`编辑${this.$route.query.name}采购单`:`新增${this.$route.query.name}采购单`,
        isChecked:this.$route.query.checked?true:false,
        isNew:this.$route.query.id?false:true,
        type:"goods",
        columns:this.$route.query.name === "赠品"?
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
              key:"goodsName",
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
                      this.currentRow = params.index;
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
                      value:item.id,
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
                      value:item.id,
                      label:item.units,
                    }
                  })
                }))
              }
            },
            {
              title:"采购单价",
              key:"purchasePrice",
              width:120,
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.purchasePrice,
                    placeholder:"采购单价",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.purchasePrice = v
                    }
                  }
                })
              }
            },
            {
              title:"采购含税单价",
              key:"taxPrice",
              width:120,
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.taxPrice,
                    placeholder:"采购单价",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.taxPrice = v
                    }
                  }
                })
              }
            },
            {
              title:"折扣率",
              key:"discountRate",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.price,
                    placeholder:"折扣率",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.discountRate = v
                      params.row.discountAmount = params.row.taxPrice-params.row.discountRate * params.row.taxPrice
                    }
                  }
                })
              }
            },
            {
              title:"优惠金额",
              key:"discountAmount",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.discountAmount,
                    placeholder:"优惠金额",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.discountAmount = v
                    }
                  }
                })
              }
            },
            {
              title:"采购数量",
              key:"num",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.num,
                    placeholder:"采购数量",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.num = v;
                      params.row.totalPurchasePrice = params.row.num * params.row.purchasePrice
                      params.row.totalTaxPrice = params.row.num * params.row.taxPrice
                    }
                  }
                })
              }
            },
            {
              title:"采购总价",
              key:"totalPurchasePrice",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.totalPurchasePrice,
                    placeholder:"采购总价",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.totalPurchasePrice = v
                    }
                  }
                })
              }
            },
            {
              title:"采购单含税总价",
              key:"totalTaxPrice",
              width:120,
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.totalTaxPrice,
                    placeholder:"采购总价",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.totalTaxPrice = v
                    }
                  }
                })
              }
            },
          ]
          :
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
              key:"goodsName",
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
                      value:item.id,
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
                      value:item.id,
                      label:item.units,
                    }
                  })
                }))
              }
            },
            {
              title:"采购单价",
              key:"purchasePrice",
              width:120,
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.purchasePrice,
                    placeholder:"采购单价",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.purchasePrice = v
                    }
                  }
                })
              }
            },
            {
              title:"采购含税单价",
              key:"taxPrice",
              width:120,
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.taxPrice,
                    placeholder:"采购单价",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.taxPrice = v
                    }
                  }
                })
              }
            },
            {
              title:"折扣率",
              key:"discountRate",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.discountRate,
                    placeholder:"折扣率",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.discountRate = v
                      params.row.discountAmount = params.row.taxPrice-params.row.discountRate * params.row.taxPrice
                    }
                  }
                })
              }
            },
            {
              title:"优惠金额",
              key:"discountAmount",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.discountAmount,
                    placeholder:"优惠金额",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.discountAmount = v
                    }
                  }
                })
              }
            },
            {
              title:"采购数量",
              key:"num",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.num,
                    placeholder:"采购数量",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.num = v;
                      params.row.totalPurchasePrice = params.row.num * params.row.purchasePrice
                      params.row.totalTaxPrice = params.row.num * params.row.taxPrice
                    }
                  }
                })
              }
            },
            {
              title:"采购总价",
              key:"totalPurchasePrice",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.totalPurchasePrice,
                    placeholder:"采购总价",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.totalPurchasePrice = v
                    }
                  }
                })
              }
            },
            {
              title:"采购单含税总价",
              key:"totalTaxPrice",
              width:120,
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.totalTaxPrice,
                    placeholder:"采购总价",
                    disabled:this.isChecked
                  },
                  on:{
                    input:(v)=>{
                      params.row.totalTaxPrice = v
                    }
                  }
                })
              }
            },
          ]
        ,
        inputStyle:{
          width:"100%",
          height:"32px",
          lineHeightr:"34px",
          border:"1px solid #e4e4e4",
          borderRadius:"5px"
        },
        data:this.$route.query.name === "赠品"?
          [
            {
              goodsName:"",
              purchaseOrderId:"",
              goodsId:"",
              unipurchasePricetsId:"",
              taxPrice:"",
              discountRate:"",
              discountAmount:"",
              num:"",
              totalPurchasePrice:"",
              totalTaxPrice:"",
              warehouseId:""
            }
          ]:
          [
            {
              goodsName:"",
              purchaseOrderId:"",
              goodsId:"",
              unipurchasePricetsId:"",
              modelSize:"",
              taxPrice:"",
              discountRate:"",
              discountAmount:"",
              num:"",
              totalPurchasePrice:"",
              totalTaxPrice:"",
              warehouseId:""
            }
          ],
        currentRow:0,
        goodsPicker:false,
        warehouse:[],
        units:[],
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
          mark:"",
          discountRate:"",
          purchaseType:"",
          purchaseId:""
        }
      }
    },
    mounted(){
      switch (this.$route.query.name){
        case "商品":
          this.type = "goods";
          break;
        case "赠品":
          this.type = "present";
          break;
        case "物料":
          this.type = "material";
          break;
      }
      if(this.$route.query.id){
        this.$http.get(`${this.api}/base/PurchaseOrder/updatePre`,{
          params:{ id:this.$route.query.id }
        }).then(response =>{
          let res = response.data;
          console.log(res);

            this.baseData = res;
            this.data = res.orderData;
            this.units = res.unitsList;
            this.warehouse = res.warehouseList;
            this.supplierList = res.supplierList;
            this.selectedGood = [];
            this.data.forEach((v,i)=>{
              this.selectedGood.push({
                goodsName:v.goodsName,
                goodsId:v.goodsId
              })
            })

        })
      }
    },
    components:{
      BastTitle,
      CommodityPicker
    },
    methods: {
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

        this.data = this.$refs.table.rebuildData;
        //this.data[params.index] = params.row;
        let newItem =this.$route.query.name === "赠品"?
          {
            goodsName:"",
            purchaseOrderId:"",
            goodsId:"",
            unipurchasePricetsId:"",
            taxPrice:"",
            discountRate:"",
            discountAmount:"",
            num:"",
            totalPurchasePrice:"",
            totalTaxPrice:"",
            warehouseId:""
          }:
          {
            goodsName:"",
            purchaseOrderId:"",
            goodsId:"",
            unipurchasePricetsId:"",
            taxPrice:"",
            discountRate:"",
            modelSize:"",
            discountAmount:"",
            num:"",
            totalPurchasePrice:"",
            totalTaxPrice:"",
            warehouseId:""
          };
        this.data.push(newItem);
        this.selectedGood.push({
          goodsName:"",
          goodsId:""
        })
        console.log(this.data);
      },
      //删除一行
      closeRow(i){
        if(this.$refs.table.rebuildData.length === 1){
          this.$Modal.error({
            title: "失败",
            content: "只有一条时候不可删除"
          });
          return
        }
        this.data.splice(i,1);
        this.selectedGood.splice(i,1)
      },
      //选择仓库
      selectWarahouse(e,i){
        console.log(e.target.value);
        console.log(i);
      },
      //保存入库单
      save(){
        this.data = this.$refs.table.rebuildData;
        let submitData = {
            ...this.baseData,
          purchaseOrderItemModel:this.data
        };
        this.$http.post(`${this.api}/base/PurchaseOrder/addPurchaseOrder`,{...submitData}).then(response=>{
          let res = response.data;
          console.log(res);
        })
        console.log(submitData)
      },
      submit(){
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "edit-stock-order.styl";
</style>
