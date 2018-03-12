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
            <Select v-model="searchContent.category" style="width:200px" placeholder="请选择类型">
              <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="modelSize">
            <Select v-model="searchContent.modelSize" style="width:200px" placeholder="请选择型号">
              <Option v-for="item in roleList2" :value="item.value" :key="item.value">{{ item .label}}</Option>
            </Select>
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
      <Modal
        v-model="visible"
        title="查看详情"
        :loading="loading"
        @on-cancel = "cancel"
        @on-ok="done">
        <div class="edit-wrapper">
          <Form ref="formValidate" :model="formValidate" :label-width="80">
            <FormItem label="ID" prop="id">
              <Input v-model="formValidate.id" disabled placeholder="请输入ID" />
            </FormItem>
            <FormItem label="账户" prop="account">
              <Input v-model="formValidate.account" disabled placeholder="请输入账户"/>
            </FormItem>
            <FormItem label="角色" prop="role">
              <Input v-model="formValidate.roleName" disabled />
            </FormItem>
            <FormItem label="头像">
              <FormItem prop="date">
                <Avatar shape="square" icon="person" size="large" :src="formValidate.avatar" class="avatar-edit-display"/>
              </FormItem>
            </FormItem>
            <FormItem label="电话" prop="phone">
              <Input v-model="formValidate.phone" disabled placeholder="请输入电话"/>
            </FormItem>
            <FormItem label="备注" prop="remark">
              <Input v-model="formValidate.remark" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"/>
            </FormItem>
          </Form>
        </div>
      </Modal>

    </div>
</template>

<script>

  import { Table,Page,Form,Input,Select,Modal,Row,Col,Upload,Avatar } from 'iview';
    export default {
      name: "commodity",
      data(){
          return {
            pageSizeList:[5,10,20],
            pageSize:5,
            total:0,
            currentPage:1,
            visible:false,
            loading:true,
            searchContent: {
              productName:'',
              productCode:'',
              category:'',
              modelSize:''
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
          console.log(this.searchContent)
          this.$http.post(`http://192.168.31.34:8080/base/product/findAllProduct`,this.searchContent).then(response=>{
            console.log(response)
            let res = response.data;
            this.listData = res.data;
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
              this.$http.get(`http://192.168.31.34:8080/base/product/deleteProduct`,{params:{id:params.row.id}}).then(response=>{
                  let res = response.data;
                  this.pagination();
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
            currentPage :1,
            pageSize : 5
          };
          let params = customsParams || defaultParams;
          ///base/product/findAllProduct  查询所有产品
          this.$http.post(`http://192.168.31.34:8080/base/product/findAllProduct`,{params}).then(response=>{
            console.log(response.data)
            let res = response.data;
              this.listData = res.content;
              this.total = res.count;
          })
        },
        //点击分页
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          let params = {
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };

          this.pagination(params)
        },
        changePageSize(currentPageSize){
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          let params = {
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
