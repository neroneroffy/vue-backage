<template>
    <!--<div class="materiel">
      物料管理
              {
                materielName:物料名称
                materielCode:物料编号
                barCode:条形码
                category:物料分类
                mark:备注
              }
    </div>-->
    <div class="materiel">
      <!--新增 表单搜索部分-->
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem prop="user">
            <Checkbox v-model="searchContent.isDel" >是否已删除</Checkbox>
            </FormItem>
            <FormItem prop="user">
              <Input type="text" v-model="searchContent.materielName" placeholder="请输入名称"/>
            </FormItem>
            <FormItem prop="user">
              <Input type="text" v-model="searchContent.materielCode" placeholder="请输入编号"/>
            </FormItem>
            <FormItem prop="user">
              <Input type="text" v-model="searchContent.category" placeholder="请输入分类"/>
            </FormItem>
            <FormItem>
              <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <!--表格数据获取-->
      <Table :columns="columns" :data="listData" :row-class-name="rowClassName" class="table" v-if="listData"></Table>
      <!--listData数据
      changePage回调页码 changePageSize回调条数 page-size每页条数 page-size-opts:每页条数配置 total:数据总数-->
      <div class="pagination">
        <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" placement="top"
              :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
      </div>
    </div>
</template>

<script>
    import {Table, Page, Form, Input, Select, Modal, Row, Col, Upload, Avatar} from 'iview';
    export default {
        name: "materiel",
        data(){
          return{
            pageSizeList:[5,10,20],
            pageSize:5,
            total:0,
            listData:"",
            loading:false,
            currentPage:1,
            columns:[

              {
                title: '物料名称',
                key: 'materielName',
                width: 180
              },
              {
                title: '物料编号',
                key: 'materielCode'
              },
              {
                title: '条形码',
                key: 'barCode'
              },
              {
                title: '物料分类',
                key: 'category'
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
                        type: 'warning',
                        size: 'small'
                      },
                      style: {
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
            searchContent:{
              materielName:"",
              materielCode:"",
              category:"",
              isDel:false
            },

          }
        },
        mounted(){
          //初始请求分页
          let params = {
            ...this.searchContent,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          };
          this.pagination(params)
        },
        methods:{
          rowClassName (row, index) {

            if (row.del) {
              console.log(432423);
              return 'del';
            } else{
              return '';
            }

          },
          //新增
          addMember(){
            this.$router.push({path:'/baseData/materiel/edit-materiel'})
          },
          //提交搜索
          handleSubmit() {
              let params = {
                ...this.searchContent,
                currentPage: 1,
                pageSize: this.pageSize,
              };
              console.log(params)
              this.$http.post(`${this.$host}/base/materiel/findAllMateriel`,params).then(response => {
                let data = response.data;
                this.listData = data.content;
                this.total=data.totalElements;
                this.currentPage=1;
              })
          },
          //查看
          show(params){
            this.$router.push({path:'/baseData/materiel/edit-materiel',query:{id:params.row.id,checked:true}})
          },
          //编辑
          edit(params){
            this.$router.push({path:'/baseData/materiel/edit-materiel',query:{id:params.row.id}})
          },
          //删除
          remove(params){
            //获取id
            let id =  params.row.id;
            this.$Modal.confirm({
              content:'<p>确认删除此条数据吗?</p>',
              loading:true,
              onOk:()=>{
                this.$store.dispatch('modalLoading');
                this.$http.get(`${this.$host}/base/materiel/deleteMateriel`,{params:{id:id}}).then(response  => {
                  let res = response.data;

                  if(res.result){
                    this.pagination();
                    this.$Modal.remove();
                    this.$Message.info("删除成功");
                  }
                })
              }
            })
          },
          //分页函数
          pagination(customsParams) {
              let defaultParams = {
                materielName:'',
                materielCode:'',
                barCode:'',
                category:'',
                currentPage:1,
                pageSize:5,
                isDel:false
              };
              let params = customsParams || defaultParams;
              //
              //查询单条get http://192.168.31.34:8080/base/materiel/materielInfo
              //删除数据 post "http://192.168.31.34:8080/base/materiel/deleteMateriel 数组形式
              //
            console.log(params)
              this.$http.post(`${this.$host}/base/materiel/findAllMateriel`,params).then(response => {
                console.log(response.data)
                let data = response.data;
                this.listData = data.content;
                this.total=data.totalElements
              })
          },
          //点击分页
          changePage(currentPageNum) {
            this.currentPage = currentPageNum;
            let params = {
              ...this.searchContent,
              currentPage: this.currentPage,
              pageSize: this.pageSize,
            };

            this.pagination(params)
          },
          changePageSize(currentPageSize) {
            this.pageSize = currentPageSize;
            this.currentPage = 1;
            let params = {
              ...this.searchContent,
              currentPage: this.currentPage,
              pageSize: this.pageSize,
            };
            this.pagination(params)
          },
        }
    }
</script>

<style scoped lang="stylus">
  @import "materiel.styl";
  .ivu-table .del td{
    background #cccccc
  }
</style>
