<template>
    <div class="commody-picker">

      <Table v-if="data" :data="data" :columns="this.type.column"></Table>
    </div>
</template>

<script>
    export default {
      name: "commody-picker",
      props:["type"],
      data(){
        return {
          api:"http://192.168.31.34:8080",
          goods:{
            column:[
              {
                type: 'selection',
                width: 60,
                align: 'center'
              },
              {
                title: '名称',
                key: 'productName',
              },
              {
                title: '编号',
                key: 'productCode',
              },
              {
                title: '条形码',
                key: 'barCode',
              },
              {
                title: '分类',
                key: 'category',
              },
              {
                title: '型号',
                key: 'modelSize',

              }
            ],
            url:`${this.api}/base/product/findAllProduct`
          },
          present:{
            column:[
              {
                type: 'selection',
                width: 60,
                align: 'center'
              },
              {
                title: '名称',
                key: 'productName',

              },
              {
                title: '编号',
                key: 'productCode',
              },
              {
                title: '条形码',
                key: 'barCode',
              },
              {
                title: '分类',
                key: 'category',
              },
              {
                title: '型号',
                key: 'modelSize',

              }
            ],
            url:`${this.api}/base/gift/findAllGift`
          },
          material:{
            column:[
              {
                type: 'selection',
                width: 60,
                align: 'center'
              },
              {
                title: '名称',
                key: 'productName',

              },
              {
                title: '编号',
                key: 'productCode',
              },
              {
                title: '条形码',
                key: 'barCode',
              },
              {
                title: '分类',
                key: 'category',
              },
              {
                title: '型号',
                key: 'modelSize',

              }
            ],
            url:`${this.api}/base/materiel/finaAllMateriel`
          },
          data:"",
          matchData:"",
          currentPage:1,
          pageSize:30
        }
      },
      mounted(){

        this.matchData = this.type;
        let params = {
          currentPage:this.currentPage,
          pageSize:this.pageSize
        }
/*        this.$http.post(`${this.matchData}.url`,{...params}).then(response=>{
          let res = response.data;
          console.log(res);

        })*/
      }
    }
</script>

<style scoped>

</style>
