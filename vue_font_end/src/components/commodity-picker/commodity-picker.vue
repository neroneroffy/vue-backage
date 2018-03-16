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
      <div class="search">
        <Form :model="goodsSearch" v-if="type==='GOODS'" inline class="search-box">
          <div class="input-box">
            <FormItem prop="productName">
              <Input type="text" size="small" v-model="goodsSearch.productName" placeholder="请输入名称"/>
            </FormItem>
            <FormItem prop="productCode">
              <Input type="text" size="small" v-model="goodsSearch.productCode" placeholder="请输入编号"/>
            </FormItem>
            <FormItem prop="category">
              <Select size="small" v-model="goodsSearch.modelSize"  style="width:150px" placeholder="请选择型号">
                <Option v-for="item in goodsSearch.goodsType" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
            </FormItem>

          </div>
          <FormItem>
            <Button type="primary" icon="ios-search" size="small" @click="search">搜索</Button>
          </FormItem>
        </Form>
        <Form :model="giftSearch" v-if="type==='GIFT'" inline class="search-box">
          <div class="input-box">
            <FormItem prop="productName">
              <Input type="text" size="small" v-model="giftSearch.giftName" placeholder="请输入名称"/>
            </FormItem>
            <FormItem prop="productCode">
              <Input type="text" size="small" v-model="giftSearch.giftCode" placeholder="请输入编号"/>
            </FormItem>
            <FormItem prop="category">
              <Input type="text" size="small"  v-model="giftSearch.category" placeholder="请输入类型"/>
            </FormItem>

          </div>
          <FormItem>
            <Button type="primary" icon="ios-search" size="small" @click="search">搜索</Button>
          </FormItem>
        </Form>
        <Form :model="materielSearch" v-if="type==='MATERIEL'" inline class="search-box">
          <div class="input-box">
            <FormItem prop="user">
              <Input type="text" v-model="materielSearch.materielName" placeholder="请输入名称"/>
            </FormItem>
            <FormItem prop="user">
              <Input type="text" v-model="materielSearch.materielCode" placeholder="请输入编号"/>
            </FormItem>
            <FormItem prop="user">
              <Input type="text" v-model="materielSearch.category" placeholder="请输入分类"/>
            </FormItem>

          </div>
          <FormItem>
            <Button type="primary" icon="ios-search" size="small" @click="search">搜索</Button>
          </FormItem>
        </Form>
      </div>
      <Table
        v-if="data"
        :loading="loading"
        :data="data"
        height="500"
        width="600"
        :columns="typeColumn"
        highlight-row
        @on-row-click="selectItem"
        @on-row-dblclick="selectDone"
      ></Table>
      <div class="page" v-if="data">
        <Page :total="total" :current="currentPage" :page-size="pageSize"  @on-change="changePage"></Page>
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
          loading:true,
          currentPage:1,
          GOODS:{
            url:`http://192.168.31.34:8080/base/product/findAllProduct`
          },
          GIFT:{
            url:`http://192.168.31.34:8080/base/gift/findAllGift`
          },
          MATERIEL:{
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
            url:`http://192.168.31.34:8080/base/materiel/findAllMateriel`
          },
          typeColumn:[
            {
              title: '名称',
              key: this.type==="GOODS"?'productName':this.type==="GIFT"?'giftName':'materielName',
            },
            {
              title: '编号',
              key: this.type==="GOODS"?'productCode':this.type==="GIFT"?'giftCode':'materielCode',
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
          data:"",
          pageSize:10,
          total:0,
          selection:[],
          goodsSearch:{
            productName:"",
            productCode:"",
            modelSize:"",
            currentPage:1,
            pageSize:10,
            goodsType:[
              {
                name:"请选择产品型号"
              },
              {
                name:"NB"
              },
              {
                name:"S"
              }
            ]
          },
          giftSearch:{
            giftName: '',
            giftCode: '',
            category:"",
            currentPage:1,
            pageSize:10,
          },
          materielSearch:{
            materielName:"",
            materielCode:"",
            category:"",
            currentPage:1,
            pageSize:10,
            isHidden:false

          }
        }
      },

      mounted(){
        console.log(this.typeColumn);
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
        search(){
          this.$store.dispatch('modalLoading');
          if(this.goodsSearch.modelSize === "请选择产品型号"){
            delete this.goodsSearch.modelSize
          }
          let searchContent={};
          switch (this.type){
            case "GOODS":
              searchContent = this.goodsSearch;
              break;
            case "GIFT":
              searchContent = this.giftSearch;
              break;
            case "MATERIEL":
              searchContent = this.materielSearch;
          }
          this.$http.post(`${this[this.type].url}`,{...searchContent}).then(response=>{
            let res = response.data;
            this.data = res.content;

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

        pagination(customerParams){

          let defaultParams = {
            currentPage:1,
            pageSize:this.pageSize
          };

          let params = customerParams || defaultParams;
          this.$store.dispatch('modalLoading');
          this.$http.post(`${this[this.type].url}`,{...params}).then(response=>{
            if(response){
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
            }

          })
        },
        selectItem(selection,index){
          this.selection = selection;

        }
      }
    }
</script>

<style scoped lang="stylus">
@import './commodity-picker.styl'
</style>
