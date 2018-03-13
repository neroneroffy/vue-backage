<!--<template>-->
<!--<div class="present">赠品管理</div>-->
<template>
  <div class="present">
    <div class="search-wrapper">
      <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
      <div class="search">
        <Form ref="formInline" :model="searchContent" inline>
          <FormItem prop="user">
            <Input type="text" v-model="searchContent.giftName" placeholder="请输入名称"/>
          </FormItem>
          <FormItem prop="account">
            <Input type="text" v-model="searchContent.giftCode" placeholder="请输入编号"/>
          </FormItem>
          <FormItem prop="account">
            <Input type="text" v-model="searchContent.barCode" placeholder="请输入条形码"/>
          </FormItem>
          <FormItem >
            <Select v-model="searchContent.category" style="width:200px" placeholder="请选择类型">
              <Option v-for="item in roleList" :value="item" :key="item">{{ item }}</Option>
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
      <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" placement="top"
            :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
    </div>
  </div>
</template>

<script>

  import {Table, Page, Form, Input, Select, Modal, Row, Col, Upload, Avatar} from 'iview';

  export default {
    name: "present",
    data() {
      return {
        pageSizeList: [5, 10, 20],
        pageSize: 5,
        total: 0,
        currentPage: 1,
        searchContent: {
          giftName: '',
          giftCode: '',
          category: "",
          barCode: ""
        },
        roleList:["请选择赠品类型","A类","B类","C类"],
        roleList2:["请选择赠品型号","A型","B型","C型"],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '赠品名称',
            key: 'giftName',
            width: 180

          },
          {
            title: '编号',
            key: 'giftCode',

          },
          {
            title: '条形码',
            key: 'barCode',
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
        listData:""
    }
    },
    mounted() {
      //base/gift/giftInfo查询某一条
      //
      /**/
      //初始请求分页
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.pagination(params)
    },
    methods: {
      addMember() {
        this.$router.push('/baseData/present/edit-present')
      },
      //提交搜索
      handleSubmit() {
        console.log(this.searchContent)
        /*this.$http.post(`${this.$api}/search`,{data:this.searchContent}).then(response=>{
          let res = response.data;
          this.listData = res.data;
        })*/

      },
      //查看
      show (params) {
        this.$router.push({path:'/baseData/present/edit-present',query:{id:params.row.id,checked:true}})
      },
      //编辑
      edit(params){
        this.$router.push({path:'/baseData/present/edit-present',query:{id:params.row.id}})
      },
      //删除
      remove(params) {
        let id = params.row.id;
        this.$Modal.confirm({
          content: '<p>确认删除此条数据吗？</p>',
          loading: true,
          onOk: () => {
          this.$store.dispatch('modalLoading');
          this.$http.get(`http://192.168.13.31:8080/base/gift/deleteGift`,{
            params:{ id:params.row.id}
          }).then(response=>{
            console.log(response)
            if (res.result) {
              this.pagination();
              this.$Modal.remove();
              this.$Message.info('删除成功');
            }
          })
      }
      })
        ;
      },
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status);
      },
      //分页函数
      pagination(customsParams) {
        let defaultParams = {
          currentPage: 1,
          pageSize: 5
        };
        let params = customsParams || defaultParams;
        /*/base/gift/findAllGift*/
        console.log(params)
        this.$http.post("http://192.168.31.13:8080/base/gift/findAllGift", params).then(response => {
          console.log(response)
          let data = response.data;
          this.listData = data.pageList;
          this.total = data.count;
        })
      },
      //点击分页
      changePage(currentPageNum) {
        this.currentPage = currentPageNum;
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        };

        this.pagination(params)
      },
      changePageSize(currentPageSize) {
        this.pageSize = currentPageSize;
        this.currentPage = 1;
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        };
        this.pagination(params)
      },

    },
    computed: {}

  }
</script>

<style scoped lang="stylus">
  @import "./present.styl";
</style>

