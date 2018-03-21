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
            <Input type="text" v-model="searchContent.category" placeholder="请输入类型"/>
          </FormItem>

          <FormItem>
            <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <Table :columns="columns" :data="listData" class="table"></Table>
    <div class="pagination">
      <Page show-sizer @on-change="changePage" @on-page-size-change="changePageSize" placement="top"
            :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total" :current="currentPage"></Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: "present",
    data() {
      return {
        pageSizeList: [30,50,100],
        pageSize: 30,
        total: 0,
        currentPage: 1,
        searchContent: {
          giftName: '',
          giftCode: '',
          category:""
        },
        modelSize:["请选择型号","NB","S"],
        columns: [
          {
            title: '赠品名称',
            key: 'giftName'
          },
          {
            title: '分类',
            key: 'category',
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
        listData:[]
    }
    },
    mounted() {
      //base/gift/giftInfo查询某一条
      //
      /**/
      //初始请求分页
      this.pagination()
    },
    methods: {
      addMember() {
        this.$router.push('/baseData/present/edit-present')
      },
      //提交搜索
      handleSubmit() {
        let params={
          ...this.searchContent,
          currentPage: 1,
          pageSize: 5
        };
        if(this.searchContent.giftName === "" && this.searchContent.giftCode === "" && this.searchContent.giftCode ===""){
          this.pagination(params);
        }else{
          this.$http.post("http://192.168.31.34:8080/base/gift/findAllGift", params).then(response=>{
            let data = response.data;
            this.listData = data.content;
            this.total = data.totalElements;
          })
        }
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
        this.$Modal.confirm({
          content: '<p>确认删除此条数据吗？</p>',
          loading: true,
          onOk: () => {
          this.$store.dispatch('modalLoading');
          this.$http.get(`http://192.168.31.34:8080/base/gift/deleteGift`,{
            params:{ id:params.row.id}
          }).then(response=>{
            let res = response.data;
            console.log(response);
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
          pageSize: 30
        };
        let params = customsParams || defaultParams;
        /*/base/gift/findAllGift*/
        console.log(params)
        this.$http.post("http://192.168.31.34:8080/base/gift/findAllGift", params).then(response => {
          let data = response.data;
          this.listData = data.content;
          this.total = data.totalElements;
        })
      },
      //点击分页
      changePage(currentPageNum) {
        this.currentPage = currentPageNum;
        let params = {
          ...this.searchContent,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        };
        this.pagination(params)
      },
      changePageSize(currentPageSize) {
        this.pageSize = currentPageSize;
        this.currentPage = 1;
        let params = {
          ...this.searchContent,
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

