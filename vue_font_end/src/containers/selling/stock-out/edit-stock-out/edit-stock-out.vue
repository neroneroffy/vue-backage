<template>
  <div class="edit-stock-in-order">
    <BastTitle :title="title"></BastTitle>
    <div class="search-wrapper">
      <div class="search">
        <Form ref="formInline"  inline>
          <FormItem v-if="!isNew">
            <Tag type="dot">出库单编号：{{baseData.outboundOrderNo}}</Tag>
          </FormItem>
          <FormItem  v-if="!isNew">
            <Tag type="dot">单据日期：{{baseData.receiveTime}}</Tag>
          </FormItem>
<!--          <FormItem>
            <Select v-model="baseData.supplierId" style="width:200px" :disabled="isChecked" placeholder="请选择供货商">
              <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.supplierName }}</Option>
            </Select>
          </FormItem>-->
          <FormItem v-if="title.indexOf('编辑')<0">
            <Input type="text" v-model="baseData.orderNo" :disabled="isChecked" placeholder="关联客户订单"/>
          </FormItem>
        </Form>
      </div>

      <div v-if="!isChecked">
        <Button type="primary" icon="plus-round" @click="save">保存出库单</Button>
      </div>

    </div>
    <Table :columns="columns" :data="data" ref="table"></Table>
    <div class="remark">
      <p>入库单备注</p>
      <Input type="textarea" :rows="4" placeholder="请填写单据备注" :disabled="isChecked"  v-model="baseData.mark"/>
    </div>
    <CommodityPicker :type="this.$route.query.type" :showPicker="goodsPicker" @selectDone="selectDone" @cancel="cancel"/>

  </div>
</template>

<script>
  import BastTitle from  "@/components/base-title";
  import CommodityPicker from '@/components/commodity-picker/commodity-picker'

  export default {
    name: "edit-stock-out",
    data(){
      return{
        api:'http://192.168.31.222:8080',
        title:this.$route.query.id?this.$route.query.checked?`查看${this.$route.query.name}出库单`:`编辑${this.$route.query.name}出库单`:`新增${this.$route.query.name}出库单`,
        isChecked:this.$route.query.checked?true:false,
        isNew:this.$route.query.id?false:true,
        columns: this.$route.query.name === "物料"?
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

                      this.currentRow = params.index
                      this.goodsPicker = true
                    },
                  }
                },this.selectedGood[params.index].goodsName?this.selectedGood[params.index].goodsName:"请选择商品")
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
              title:"出库单价",
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
              title:"出库数量",
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
              title:"实付金额",
              key:"realPay",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.realPay,
                    placeholder:"总金额",
                    disabled:this.isChecked
                  },

                  on:{
                    input:(v)=>{
                      params.row.realPay = v
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
                        this.closeRow(params)
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
                      value:item.id ,
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
              title:"出库单价",
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
              title:"出库数量",
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
              title:"实付金额",
              key:"realPay",
              render:(h,params)=>{
                return h('Input',{
                  props:{
                    value:params.row.realPay,
                    placeholder:"总金额",
                    disabled:this.isChecked
                  },

                  on:{
                    input:(v)=>{
                      params.row.realPay = v
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
        inputStyle:{
          width:"100%",
          height:"32px",
          lineHeightr:"34px",
          border:"1px solid #e4e4e4",
          borderRadius:"5px"
        },
        type:this.$route.query.type,
        data:this.$route.query.name === "物料"?
        [
          {
            goodsId:"",
            goodsName:"",
            modelSize:"",
            unitsId:"",
            price:"",
            num:"",
            total:"",
            realPay:"",
            mark:""
          }
        ]:
          [
            {
              goodsId:"",
              goodsName:"",
              modelSize:"",
              unitsId:"",
              price:"",
              num:"",
              total:"",
              realPay:"",
              mark:""
            }
          ],
        currentRow:0,
        goodsPicker:false,
        warehouse:[],
        modelSize:["NB","S"],
        units:[],
        selectedGood:[{
          goodsName:"",
          goodsId:""
        }],
        supplierList:[],
        baseData:{
          supplier:"",
          orderNo:"",
          createTime:"",
          receiveTime:"",
          purchaseOrderNo:"",
          operatorId:"",
          outboundType:this.$route.query.type,
          userName:"",
          mark:""
        },
        goodsType:"productName"
      }
    },
    mounted(){
      switch (this.$route.query.name){
        case "商品":
          this.type = "GOODS";
          this.goodsType = "productName";
          break;
        case "赠品":
          this.type = "GIFT";
          this.goodsType = "giftName";
          break;
        case "物料":
          this.type = "MATERIEL";
          this.goodsType = "materielName";
          break;
      };

      if(this.$route.query.id){
        this.$http.get(`${this.$host}/base/outboundOrder/findOutboundOrderById`,{
          params:{ id:this.$route.query.id }
        }).then(response =>{
          let res = response.data;
          console.log(res);
          this.baseData = res;
          this.data = res.outboundOrderItemModelList;

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

      }else{
        //调用仓库接口
        this.$http.get(`${this.$api}/base/warehouse/warehouseFindAll`).then(response=> {
          let res = response.data;
          this.warehouse = res

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
      //调用供货商接口
/*      this.$http.post(`http://192.168.31.222:8080/base/supplier/findAll`).then(response=>{
        if(response){
          console.log(response.data)
          let res = response.data;
          this.supplierList = res;
        }
      });*/
    //   if(this.$route.query.id){
    //     this.$http.get(`${this.$host}/base/outboundOrder/findOutboundOrderById`,{
    //       params:{ id:this.$route.query.id }
    //     }).then(response =>{
    //       let res = response.data;
    //       console.log(res);
    //       if(res.result){
    //         this.baseData = res.baseData;
    //         this.data = res.orderData;
    //         this.selectedGood = [];
    //         this.data.forEach((v,i)=>{
    //           this.selectedGood.push({
    //             goodsName:v.goodsName,
    //             goodsId:v.goodsId
    //           })
    //
    //         })
    //       }
    //     })
    //   }
    // },
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

        this.selectedGood[this.currentRow].goodsName = data[this.goodsType];
        this.selectedGood[this.currentRow].goodsId = data.id;
        this.$refs.table.rebuildData[this.currentRow].goodsName = data[this.goodsType];
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
        this.data.push(
          {
            warehouseId:"1",
            goodsId:"",
            unitsId:"1",
            price:"",
            num:"",
            total:"",
            realPay:"",
            mark:""
          }
        );
        this.selectedGood.push({
          goodsName:"",
          goodsId:""
        })
      },
      //删除一行
      closeRow(params){
        if(this.$refs.table.rebuildData.length === 1){
          this.$Modal.error({
            title: "失败",
            content: "只有一条时候不可删除"
          });
          return
        }
        this.$http.get(`${this.$host}/base/OutboundOrderItem/deleteOutboundOrderItem`,{params:{
            id:params.row.id
          }}).then(response=>{
          let res = response.data;
          console.log(res);
          this.data.splice(params.index,1);
          this.selectedGood.splice(params.index,1)
        })

      },
      //选择仓库
      selectWarahouse(e,i){

      },
      //保存出库单
      save(){
        if(this.baseData.orderNo === ""){
          this.$Message.error("关联客户订单不能为空")
          return
        }
        this.data = this.$refs.table.rebuildData;
        this.baseData.outboundType = this.type;
        let submitData = {
          ...this.baseData,
          outboundOrderItemModelList:this.data
        };
        console.log(submitData);
        let url = this.$route.query.id?`${this.$host}/base/outboundOrder/updateOutboundOrder`:`${this.$host}/base/outboundOrder/saveOutboundOrder`;
        this.$http.post(url,{...submitData}).then(response=>{
          let res = response.data;
          if(res.result){
            this.$Message.success('成功');
            this.$router.push(`/selling/out`)
          }else{
            this.$Message.success(res.msg);
          }

        })
      },
      submit(){

      }
    }
  }
</script>

<style scoped lang="stylus">
  @import './edit-stock-out.styl'
</style>

















