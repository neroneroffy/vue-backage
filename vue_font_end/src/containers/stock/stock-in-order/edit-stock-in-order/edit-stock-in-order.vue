<template>
  <div class="edit-stock-in-order">
    <BastTitle :title="title"></BastTitle>
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
  import BastTitle from  "@/components/base-title";
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
                      this.addRow(params.index)
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
                  value:params.row.warehouseId
                },
                on:{
                  input(e){
                    console.log(e)
                  }
                }
              },this.warehouse.map((item)=>{
                  return h('Option',{
                    props:{
                      value:item.value,
                      label:item.name,
                    },
                    on:{
                      input:(e)=>{
                        console.log(999);
                        this.selectWarahouse(e,params.index)
                      }
                    }
                  })
              }))
            }
          },
          {
            title:"货物名称",
            key:"goodsId",
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
            title:"单位",
            key:"unitsId"
          },
          {
            title:"入库单价",
            key:"price"
          },
          {
            title:"入库数量",
            key:"num"
          },
          {
            title:"总金额",
            key:"total"
          },
          {
            title:"备注",
            key:"mark"
          },
        ],
        data:[
          {
            inboundOrderId:"454132456412314",
            warehouseId:"2",
            goodsId:"",
            unitsId:"",
            price:"",
            num:"",
            total:"",
            mark:""
          }
        ],
        warehouse:[
          {
            name:"仓库1",
            value:"1"
          },
          {
            name:"仓库2",
            value:"2"
          },
        ]
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
      BastTitle
    },
    methods:{
      inputValue(index){
       // this.data[index].
      },
      //新增一行
      addRow(){
        this.data.push(          {
            inboundOrderId:"454132456412314",
            warehouseId:"",
            goodsId:"",
            unitsId:"",
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
      submit(){
        console.log(this.editData)
      }
    }
  }
</script>

<style scoped>

</style>

