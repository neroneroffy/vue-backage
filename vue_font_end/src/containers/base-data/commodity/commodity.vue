<template>
    <div class="commodity">
      <!--
        {
          productName:名称
          productCode:编号
          barCode:条形码
          category分类
          modelSize型号
          mark备注
         }
      -->
      <div class="search-wrapper">
      <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
      <div class="search">
        <Form ref="formInline" :model="searchContent" inline>
          <FormItem prop="productName">
            <Input type="text" v-model="searchContent.productName" placeholder="请输入名称"/>
          </FormItem>
          <FormItem prop="productCode">
            <Input type="text" v-model="searchContent.productCode" placeholder="请输入编号"/>
          </FormItem>
          <FormItem prop="category">
            <Input type="text" v-model="searchContent.category" placeholder="请输入商品类型"/>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
          </FormItem>
        </Form>
      </div>
    </div>
      <Table :columns="columns" :data="listData" class="table" v-if="listData"></Table>
      <div class="pagination">
        <Page show-sizer @on-change="changePage" :current="currentPage" @on-page-size-change="changePageSize" placement="top" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
      </div>


    </div>
</template>

<script>

    export default {
      name: "commodity",
      data(){
          return {
            pageSizeList:[30,50,100],
            pageSize:30,
            total:0,
            currentPage:1,
            loading:true,
            searchContent: {
              productName:'',
              productCode:'',
              category:''
             },
            roleList:[
              {
                value: '23',
                label: 'A型'
              },
              {
                value: '24',
                label: 'B型'
              },
              {
                value: '25',
                label: 'C型'
              }
            ],
            roleList2:[
              {
                value: 'NB',
                label: 'NB'
              },
              {
                value: 'S',
                label: 'S'
              },
              {
                value: 'M',
                label: 'M'
              },
              {
                value: 'L',
                label: 'L'
              },
              {
                value: 'XL',
                label: 'XL'
              },
              {
                value: 'XXL',
                label: 'XXL'
              },
              {
                value: 'XXXL',
                label: 'XXXL'
              }
            ],
            columns: [
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
              },
              {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.show(params)
                        }
                      }
                    }, '查看'),
                    h('Button', {
                      props: {

                        size: 'small'
                      },
                      style: {
                        background:"#13D149",
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
            formValidate: {
              id: '',
              account: '',
              roleId:"",
              phone: '',
              avatarUrl:"",
              remark:""
            },
            imgName: '',
            uploadList: [],
            listData:""
          }
      },
      mounted(){
        //初始请求分页
        let params = {
          currentPage:this.currentPage,
          pageSize:this.pageSize
        };
        this.pagination(params)
      },
      methods:{
        done(){
          this.visible = false
        },
        addMember(){
          this.$router.push('/baseData/commodity/edit-commodity')
        },
        cancel(){

        },
        //提交搜索
        handleSubmit() {
          if(this.searchContent.productName === "" && this.searchContent.productCode === "" && this.searchContent.category ===""){
            this.pagination();
            return
          }
          let data={
            ...this.searchContent,
            currentPage :1,
            pageSize : 30
          };
          this.$http.post(`${this.$host}/base/product/findAllProduct`,data).then(response=>{
            let res = response.data;
            this.listData = res.content;
            this.total = res.totalElements;
          })
        },//查看
        show(params){
          this.$router.push({path:'/baseData/commodity/edit-commodity',query:{id:params.row.id,checked:true}})
        },
        //编辑
        edit(params){
          this.$router.push({path:'/baseData/commodity/edit-commodity',query:{id:params.row.id}})
        },
        //删除
        remove (params) {
          ///base/product/deleteProduct删除接口
          this.$Modal.confirm({
            content: '<p>确认删除此条数据吗？</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('modalLoading');
              console.log(this)
              this.$http.get(`${this.$host}/base/product/deleteProduct`,{params:{id:params.row.id}}).then(response=>{
                  let res = response.data;

                if(res.result){
                    this.currentPage = 1;
                    this.$Message.success("删除成功");
                    this.$Modal.remove();
                    this.pagination();
                  }else{
                    this.$Message.success("删除失败");
                    this.$Modal.remove();
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
            productName:this.searchContent.productName,
            productCode:this.searchContent.productCode,
            category:this.searchContent.category,
            currentPage :1,
            pageSize : 5
          };
          let params = customsParams || defaultParams;
          ///base/product/findAllProduct  查询所有产品
          this.$http.post(`${this.$host}/base/product/findAllProduct`,params).then(response=>{
            console.log(response.data)
            let res = response.data;
              this.listData = res.content;
              this.total = res.totalElements;
          })
        },
        //点击分页
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          let params = {
            ...this.searchContent,
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };

          this.pagination(params)
        },
        changePageSize(currentPageSize){
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          let params = {
            ...this.searchContent,
            currentPage:this.currentPage,
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
@import "./commodity.styl";
</style>
