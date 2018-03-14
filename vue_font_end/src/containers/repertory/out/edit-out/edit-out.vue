<template>
  <div class="edit-client">
    <BastTitle :title="title"></BastTitle>
    <Table :border="false" :columns="commodityType" :data="commodity"></Table>
    <Form justify="end">
      <FormItem>
        <Button type="primary" icon="plus-circled" @click="make()">确认出库</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import BastTitle from "@/components/base-title"
  export default {
    name: "edit-record",
    data(){
      return {
        title:this.$route.query.ischecked?'已出库':'待出库',
        commodity:[] ,
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
          },
          {
            title: '盈亏',
            key: 'inventoryResult'
          }
        ],

      }},
        components:{
        BastTitle
      },
      mounted(){
        console.log(this.$route.query);
        this.$http.get("http://192.168.31.168/base/warehouse/warehouseFindAll").then(response => {
          console.log(response);
        let res=response.data;
        this.cityList=res.data;
      })
      },
      methods:{
        make(){

        },
      }
    }
</script>

<style scoped>

</style>

