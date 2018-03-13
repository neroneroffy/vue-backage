<template>
  <Modal
    :value="showPicker"
    title="选择商品"
    width="630"
    @on-ok="selectDone"
    @on-cancel="cancel">
    <div class="commody-picker">
      <div class="loading">
        <Spin size="large" v-if="!data"></Spin>
      </div>

      <Table
        v-if="data"
        :loading="loading"
        :data="data"
        height="500"
        width="600"
        :columns="this[this.type].column"
        highlight-row
        @on-row-click="selectItem"
      ></Table>
      <div class="page" v-if="data">
        <Page :total="total" :current="currentPage" @on-change="changePage"></Page>
      </div>

    </div>
  </Modal>
</template>

<script>
    export default {
      name: "commody-picker",
      props:["type","showPicker"],
      data(){
        return {
          api:"http://192.168.31.34:8080",
          loading:true,
          currentPage:1,
          goods:{
            column:[

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
            url:`http://192.168.31.34:8080/base/product/findAllProduct`
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
            url:`http://192.168.31.34:8080/base/gift/findAllGift`
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
            url:`http://192.168.31.34:8080/base/materiel/finaAllMateriel`
          },
          data:"",
          pageSize:10,
          total:0,
          selection:[]
        }
      },
      mounted(){
        this.pagination()
      },
      methods:{
        changePage(data){
          this.currentPage = data;
          let newPage = {
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };
          this.pagination(newPage)
        },
        selectDone(){
          this.$emit("selectDone",this.selection)
        },
        cancel(){
          this.$emit("cancel")
        },
        pagination(customerParams){
          let defaultParams = {
            currentPage:1,
            pageSize:this.pageSize
          };

          let params = customerParams || defaultParams;
          this.$store.dispatch('modalLoading');
          this.$http.post(`${this[this.type].url}`,{...params}).then(response=>{
            let res = response.data;
            this.data = res.content;
            console.log(this.data);
/*            this.data.forEach((v,index)=>{
              this.selection.forEach(i=>{
                if(v.id === i.id){
                  v._checked = true
                  this.$refs.table.objData[index]._isChecked = true;
                  console.log(this.$refs.table.objData[index]);
                }
              })
            })*/
            this.loading = false;
            this.total = res.totalElements;
          })
        },
        selectItem(selection,index){
          this.selection = selection;

        },
        selectAll(selection){
          this.selection = selection

        },
        selectChange(selection){
          this.selection = selection
        }
      }
    }
</script>

<style scoped lang="stylus">
@import './commodity-picker.styl'
</style>
