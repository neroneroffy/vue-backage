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
          },
          {
            title: '盈亏',
            key: 'inventoryResult'
          }
        ]

      }},
        components:{
        BastTitle
      },
      mounted(){
        ///base/inventoryOutboundItem/find this.$route.query.id
        this.$http.get("http://192.168.31.13:8080/base/inventoryOutboundItem/find",{params:{id:this.$route.query.id}}).then(response => {
          console.log(response);
          let res=response.data;
          this.commodity=res.pageList;
        })
      },
      methods:{
        make(){
          this.$http.get('http://192.168.31.13:8080/base/inventoryOutboundItem/outBound',{params:{id:this.$route.query.id}}).then(response => {
            console.log(response);
            let res=response.data;
            this.commodity=res.pageList;
          })
        },
      }
    }
</script>

<style scoped>

</style>



