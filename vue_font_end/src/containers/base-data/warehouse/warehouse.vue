<template>
  <div class="warehouse">
    <div class="search-wrapper">
      <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
      <div class="search">
        <Form ref="formInline" :model="searchContent" inline>
          <FormItem prop="user">
            <Input type="text" v-model="searchContent.id" placeholder="请输入ID"/>
          </FormItem>
          <FormItem prop="account">
            <Input type="text" v-model="searchContent.account" placeholder="请输入搜索账户"/>
          </FormItem>
          <FormItem prop="phone">
            <Input type="text" v-model="searchContent.phone" placeholder="请输入搜索电话"/>
          </FormItem>

          <FormItem>
            <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <Table :columns="columns" :data="listData" class="table" v-if="listData"></Table>


  </div>
</template>

<script>
  import { Table,Page,Form,Input,Select,Modal,Row,Col } from 'iview';
  export default {
    name: "warehouse",
    data(){
      return {

        visible:false,
        loading:true,
        searchContent: {
          id: '',
          account: '',
          phone:"",
          role:""
        },
        columns: [
          {
            title: '仓库名称',
            key: 'warehouseName',

          },
          {
            title: '联系人',
            key: 'contacts',
          },
          {
            title: '联系电话',
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
            title: '仓库面积',
            key: 'acreage',
          },
          {
            title: '仓库地址',
            key: 'addressId',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
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
                      size: 'small'
                    },
                    class:"status",
                    style:{
                      background:params.row.status?"#13D149":"#ccc",
                      color:"#fff"
                    },
                    on: {
                      click: () => {
                        this.statusEdit(params)
                      }
                    }
                  },
                  params.row.status?"禁用": '启用')
              ]);
            }
          }
        ],
        listData:"",
        api:"http://192.168.31.222:8080"
      }
    },
    mounted(){
      //初始请求数据
      this.getList()
    },
    methods:{
      done(){
        this.visible = false
      },
      addMember(){
        this.$router.push('/baseData/warehouse/edit-warehouse')
      },
      cancel(){

      },
      //提交搜索
      handleSubmit() {
        console.log(this.searchContent)
        /*
                  this.$http.post(`${this.$api}/search`,{data:this.searchContent}).then(response=>{
                    let res = response.data;
                    this.listData = res.data;
                  })
        */
      },
      //切换状态
      statusEdit(params){
        //更新仓库状态
        this.$http.post(`${this.api}/warehouse/update`,{id:params.row.id,status:params.row.status}).then(response=>{
          let res = response.data;
          if(res.result){
            console.log(res)
            this.$Message.info('修改成功');
            //更新成功后重新获取表格数据
            this.getList()
          }
        })
      },
      //编辑
      edit(params){
        this.$router.push({path:'/baseData/warehouse/edit-warehouse',query:{id:params.row.id}})
      },
      //删除
      remove (params) {
        let id = params.row.id;
        this.$Modal.confirm({
          content: '<p>确认删除此条数据吗？</p>',
          loading: true,
          onOk: () => {
            this.$store.dispatch('modalLoading');

            this.$http.post(`${this.$api}/warehouse/delete`,{id}).then(response=>{
              let res = response.data;
              if(res.result){
                this.getList();
                this.$Modal.remove();
                this.$Message.info('删除成功');
              }
            })
          }
        });
      },
      //请求函数
      getList(){
        this.$http.get(`${this.api}/base/warehouse/warehouseFindAll`).then(response=>{
          let res = response.data;
          console.log(res);
          if(res.result){
            this.listData = res.data;
          }
        })
      }

    },
    computed:{

    }

  }
</script>

<style scoped lang="stylus">
  @import './warehouse.styl';
</style>
