<template>
  <div class="edit-client">
    <BastTitle :title="title"></BastTitle>
    <Table border :columns="commodityType" :data="commodity"></Table>
  </div>
</template>

<script>
    import BastTitle from "@/components/base-title"
    export default {
        name: "edit-record",
        data(){
          return {
            title:"查看详情",
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

           }
        },
        components:{
          BastTitle
        },
        mounted(){
          //base/inventoryRecordItem/findInventoryRecordItem this.$route.query.id
          this.$http.get("http://192.168.31.168:8080/base/inventoryRecordItem/findInventoryRecordItem",{params:{id:this.$route.query.id}}).then(response => {
            console.log(response);
            let res=response.data;
            this.commodity=res.pageList;
          })
        }
    }
</script>

<style scoped>

</style>

