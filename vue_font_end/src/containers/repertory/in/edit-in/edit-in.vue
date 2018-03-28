<template>
  <div class="edit-client" >
    <div style="display: flex; justify-content: space-between">
      <BastTitle :title="title"></BastTitle>
      <Form justify="end">
        <FormItem>
          <Button type="primary" v-if='!checkout' icon="plus-circled" @click="make()">确认入库</Button>
        </FormItem>
      </Form>

    </div>

    <Table :border="false" :columns="commodityType" :data="commodity"></Table>
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
            title: '入库数量',
            key: 'num'
          }
        ]

      }},
    components:{
      BastTitle
    },
    mounted(){
      ///base/inventoryOutboundItem/find this.$route.query.id
      this.$http.get(`${this.$host}/base/inventoryInboundItem/find`,{params:{id:this.$route.query.id}}).then(response => {

        let res=response.data;
        this.commodity=res;
      })
    },
    methods:{
      make(){
        this.$store.dispatch("modalLoading");
        this.$Modal.confirm({
          title: '确认入库',
          content: '<p>请确定信息正确</p>',
          loading: true,
          onOk: () => {
            this.$http.get(`${this.$host}/base/inventoryInboundItem/inBound`,{params:{id:this.$route.query.id}}).then(response => {
              console.log(response);
              let res=response.data;
              this.$Modal.remove();
              this.$Message.success(res.msg);
              console.log(res);
              this.$router.push('/repertory/in')
            })
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>



