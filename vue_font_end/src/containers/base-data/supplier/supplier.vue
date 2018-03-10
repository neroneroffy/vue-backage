<template>
    <div class="supplier">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem prop="account">
              <Input type="text" v-model="searchContent.supplierCode" placeholder="请输入供货商编码"/>
            </FormItem>
            <FormItem prop="phone">
              <Input type="text" v-model="searchContent.mobilePhone" placeholder="请输入搜索电话"/>
            </FormItem>

            <FormItem>
              <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Table :columns="columns" :data="listData" class="table" v-if="listData"></Table>
      <div class="pagination">
        <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" placement="top" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
      </div>


    </div>
</template>

<script>
  import { Table,Page,Form,Input,Select,Modal,Row,Col } from 'iview';
  export default {
      name: "supplier",
      data(){
        return {
          pageSizeList:[10,50,100],
          pageSize:10,
          total:0,
          currentPage:1,
          visible:false,
          loading:true,
          searchContent: {
            supplierCode: '',
            mobilePhone:""
          },
          columns: [

            {
              title: '供货商名称',
              key: 'supplierName',
            },
            {
              title: '供货商编码',
              key: 'supplierCode',
            },
            {
              title: '电话',
              key: 'mobilePhone',
            },
            {
              title: '座机',
              key: 'telephone',
            },
            {
              title: '微信',
              key: 'wechat',

            },
            {
              title: '税率',
              key: 'taxRate',
            },

            {
              title: '备注',
              key: 'mark',
            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              width:"180",
              render: (h, params) => {
                return h('div', [

                  h('Button', {
                    props: {
                      type:"primary",
                      size: 'small'
                    },
                    style: {
                      color:"#fff",
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.edit(params)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.remove(params)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          imgName: '',
          uploadList: [],
          listData:"",
          api:"http://192.168.31.222:8080"
        }
      },
      mounted(){
        //初始请求分页
        let params = {
          currentPage:`${this.currentPage}`,
          pageSize:`${this.pageSize}`
        };
        this.pagination(params)
      },
      methods:{
        done(){
          this.visible = false
        },
        addMember(){
          this.$router.push('/baseData/supplier/edit-supplier')
        },
        cancel(){

        },
        //提交搜索
        handleSubmit() {
          console.log(this.searchContent);

            this.$http.post(`${this.api}/base/supplier/findmobilePhone`,{...this.searchContent}).then(response=>{
              let res = response.data;
              this.listData = res.supplierList;
            })
        },
        //切换状态
        statusEdit(params){
          //更新供货商状态
          this.$http.post(`${this.api}/supplier/update`,{id:params.row.id,status:params.row.status}).then(response=>{
            let res = response.data;
            if(res.result){
              console.log(res);
              this.$Message.info('修改成功');
              //更新成功后重新获取表格数据
              this.pagination()
            }
          })
        },
        //编辑
        edit(params){
          this.$router.push({path:'/baseData/supplier/edit-supplier',query:{id:params.row.id}})
        },
        //删除
        remove (params) {
          let id = params.row.id;
          this.$Modal.confirm({
            content: '<p>确认删除此条数据吗？</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('modalLoading');
              this.$http.get(`${this.api}/base/supplier/delSupplier`,{params:{ id }}).then(response=>{
                let res = response.data;
                console.log(res);
                if(res.result){
                  this.pagination();
                  this.$Modal.remove();
                  this.$Message.info('删除成功');
                }
              })
            }
          });
        },
        handleSelectAll (status) {
          this.$refs.selection.selectAll(status);
        },
        //分页函数
        pagination(customsParams){
          let defaultParams = {
            currentPage :"1",
            pageSize : "10"
          };
          let params = customsParams || defaultParams;
          this.$http.get(`${this.api}/base/supplier/supplierFindAll`,{params}).then(response=>{
            let res = response.data;
            console.log(res);

              this.listData = res.supplierList;
              this.total = res.count;

          })
        },
        //点击分页
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          let params = {
            pageNum:this.currentPage,
            pageSize:this.pageSize
          };
          this.pagination(params)
        },
        changePageSize(currentPageSize){
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          let params = {
            pageNum:this.currentPage,
            pageSize:this.pageSize
          };
          this.pagination(params)
        },

      },
      computed:{

      }

    }
</script>

<style scoped lang="stylus">
@import './supplier.styl';
</style>
