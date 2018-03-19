<template>
  <div class="edit-client">
    <BastTitle :title="title"></BastTitle>
    <Table :border="false" :columns="commodityType" :data="commodity"></Table>
    <Form justify="end">
      <FormItem>
        <Button type="primary" v-if='!checkout' icon="plus-circled" @click="make()">确认出库</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import BastTitle from "@/components/base-title"
  export default {
    name: "edit-in",
    data(){
      return {
        checkout:this.$route.query.ischecked,
        title:this.$route.query.ischecked?'已入库':'待入库',
        commodity:[] ,
        commodityType:[
          {
            title: '仓库名称',
            key: 'warehouseName'
          },
          {
            title: '货物',
            key: 'productName'
          },
          {
            title: '单位',
            key: 'untisName'
          },
          {
            title: '金额',
            key: 'total'
          },
          {
            title: '盘库数量',
            key: 'num'
          }
        ]

      }},
    components:{
      BastTitle
    },
    mounted(){
      ///base/inventoryOutboundItem/find this.$route.query.id
      this.$http.get("http://192.168.31.222:8080/base/inventoryInboundItem/find",{params:{id:this.$route.query.id}}).then(response => {
        console.log(response);
        let res=response.data;
        this.commodity=res;
      })
    },
    methods:{
      make(){
        this.$http.get('http://192.168.31.222:8080/base/inventoryInboundItem/inBound',{params:{id:this.$route.query.id}}).then(response => {
          console.log(response);
          let res=response.data;
          this.commodity=res.pageList;
          this.$router.push('/')
        })
      },
    }
  }
</script>

<style scoped>

</style>



