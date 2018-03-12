//新增采购单
<template>
  <div class="edit-stock-order">
    <BastTitle :title="title"></BastTitle>
    <div class="search-wrapper">
      <div class="search">
        <Form ref="formInline"  inline>
          <!--<FormItem prop="user">-->
            <!--<span>供货商：</span>-->
            <!--<DatePicker type="date" placeholder="供货商"   style="width: 200px"></DatePicker>-->
          <!--</FormItem>-->
            
            <span>供货商：</span>
            <Input v-model="value4" icon="more" placeholder="供货商" style="width: 200px"></Input>

          <FormItem prop="user">
            <span>单据日期：</span>
            <DatePicker type="date" placeholder="单据日期" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem prop="user">
            <span>交货日期：</span>
            <DatePicker type="date" placeholder="交货日期" style="width: 200px"></DatePicker>
          </FormItem>
        </Form>
      </div>
      <RadioGroup v-model="animal">
        <Radio label="购货"></Radio>
        <Radio label="退货"></Radio>
      </RadioGroup>
      <div>
        <Button type="primary" icon="plus-round" @click="save">保存采购单</Button>
      </div>

    </div>
    <Table :columns="columns" :data="data"> </Table>
  </div>
</template>

<script>
  import BastTitle from  "@/components/base-title";
  import { Form,Select,Upload,Avatar,Button,DatePicker,Cascader } from 'iview'
  export default {
    name: "edit-stock-order",
    data(){
      return{
        title:this.$route.query.id?this.$route.query.checked?'查看采购单':'编辑采购单':'新增采购单',
        isChecked:this.$route.query.checked?true:false,
        animal: '购货',
        value4:"爸爸的选择",
        columns:[
          {
            title:"新增",
            key:"add",
            width:100,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon:"plus-round",
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.addRow()
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon:"close-round",
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                })
              ]);
          }},
          {
            title:"货物名称",

            key:"goodsName",
            width:100,
          },
          {
            title:"计量单位唯一标识",
            width:140,
            key:"unitsId",
            render:(h,params)=>{
              return h("Input",{
                props:{
                  type:"text",
                },
                on:{
                  change:()=>{
                    this.inputValue(params.index)
                  },
                }
              },"新增")
            }

          },
          {
            title:"采购含税单价",
            key:"taxPrice",
            width:120,
            render:(h,params)=>{
              return h("Input",{
                props:{
                  type:"text"
                },
                on:{
                  change:()=>{
                    this.inputValue(params.index)
                  },
                }
              },"新增")
            }
          },
          {
            title:"折扣率",
            key:"discountRate",
            render:(h,params)=>{
              return h("Input",{
                props:{
                  type:"text",
                },
                on:{
                  change:()=>{
                    this.inputValue(params.index)
                  },
                }
              },"新增")
            }
          },
          {
            title:"优惠金额",
            key:"discountAmount",
            render:(h,params)=>{
              return h("Input",{
                props:{
                  type:"text"
                },
                on:{
                  change:()=>{
                    this.inputValue(params.index)
                  },
                }
              },"新增")
            }
          },
          {
            title:"采购数量",
            key:"num",
            render:(h,params)=>{
              return h("Input",{
                props:{
                  type:"text"
                },
                on:{
                  change:()=>{
                    this.inputValue(params.index)
                  },
                }
              },"新增")
            }
          },
          {
            title:"采购总价",
            key:"totalPurchasePrice",
            render:(h,params)=>{
              return h("Input",{
                props:{
                  type:"text"
                },
                on:{
                  change:()=>{
                    this.inputValue(params.index)
                  },
                }
              },"新增")
            }
          },
          {
            title:"采购单含税总价",
            key:"totalTaxPrice",
            width:120,
            render:(h,params)=>{
              return h("Input",{
                props:{
                  type:"text"
                },
                on:{
                  change:()=>{
                    this.inputValue(params.index)
                  },
                }
              },"新增")
            }
          },
          {
            title:"仓库唯一标识",
            key:"warehouseId",
            width:120,
          },
        ],
        data:[
          {
            goodsName:"没有的啊",
            purchaseOrderId:"22",
            goodsId:"22334",
            unipurchasePricetsId:"4512314",
            taxPrice:"222",
            discountRate:"3333",
            discountAmount:"434",
            num:"1",
            totalPurchasePrice:"33445",
            totalTaxPrice:"frf",
            warehouseId:"22445"
          }
        ]
      }
    },
    mounted(){
      if(this.$route.query.id!==""){
        // this.$http.get("",{
        //   params:{ id:this.$route.query.id }
        // }).then(response =>{
        //   this.editData = response.data.data;
        // })
      }
    },
    components:{
      BastTitle
    },
    methods: {
      //新增一行数据
      inputValue(index) {
        // this.data[index].
      },
      //删除一行数据
      remove(index){
        this.data.splice(index,1);
      },

        //新增一行
        addRow() {
          this.data.push({
              goodsName: "就会",
              purchaseOrderId: "22",
              goodsId: "300",
              unipurchasePricetsId: "jiudahs",
              taxPrice: "222",
              discountRate: "就嗲",
              discountAmount: "434",
              num: "1",
              totalPurchasePrice: "2256",
              totalTaxPrice: "frf",
              warehouseId: "135"
            }
          )
        },
        submit() {
          console.log(this.editData)
        }
      }
    }

</script>

<style scoped lang="stylus">
  @import "edit-stock-order.styl";
</style>

