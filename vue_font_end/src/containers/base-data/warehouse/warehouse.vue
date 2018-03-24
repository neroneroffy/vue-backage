<template>
  <!--
    {
     warehouseName仓库名称
     contacts负责人
     mobilePhone电话
     telephone座机
     wechat微信
     acreage仓库面积
     addressld仓库地址
    }
  -->
  <div class="warehouse">
    <div class="search-wrapper">
      <BaseTitle title="仓库管理"></BaseTitle>
      <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
     <!-- <div class="search">
        <Form ref="formInline" :model="searchContent" inline>
          <FormItem prop="user">
            <Input type="text" v-model="searchContent.id" placeholder="请输入ID"/>
          </FormItem>
          <FormItem prop="user">
            <Input type="text" v-model="searchContent.contacts" placeholder="请输入负责人"/>
          </FormItem>
          <FormItem prop="account">
            <Input type="text" v-model="searchContent.warehouseName" placeholder="请输入搜索仓库名称"/>
          </FormItem>
          <FormItem prop="phone">
            <Input type="text" v-model="searchContent.mobilePhone" placeholder="请输入搜索电话"/>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
          </FormItem>
        </Form>
      </div>-->
    </div>
    <Table :columns="columns" :data="listData" class="table" v-if="listData"></Table>


  </div>
</template>

<script>
  import { Table,Page,Form,Input,Select,Modal,Row,Col } from 'iview';
  import BaseTitle from "@/components/base-title"
  export default {
    name: "warehouse",
    data(){
      return {
        searchContent: {
          id: '',
          contacts:'',
          warehouseName:'',
          mobilePhone:''
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
            key: 'address',
          },
          {
            title: '负责人',
            key: 'contacts',
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
            title: '操作',
            key: 'action',
            width:180,
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
                    type:"warning",
                    size: 'small'
                  },
                  style: {
                    color:"#fff",
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
                    class:"status",
                    style:{
                      background:params.row.del?"#13D149":"#ccc",
                      color:"#fff"
                    },
                    on: {
                      click: () => {
                        this.statusEdit(params)
                      }
                    }
                  },
                  params.row.del?"禁用": '启用')
              ]);
            }
          }
        ],
        listData:[],
        api:"http://192.168.31.222:8080"
      }
    },
    components:{
      BaseTitle
    },
    mounted(){
      //初始请求数据
      this.getList()
    },
    methods:{
      addMember(){
        this.$router.push('/baseData/warehouse/edit-warehouse')
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
        this.$http.get(`${this.$host}/base/warehouse/updateID`,{
          params:{
            id:params.row.id
          }
        }).then(response=>{
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

      //查看
      show(params){
        this.$router.push({path:'/baseData/warehouse/edit-warehouse',query:{id:params.row.id,checked:true}})
      },
      //请求函数
      getList(){
        this.$http.get(`${this.$host}/base/warehouse/warehouseFindAll`).then(response=> {
          console.log(response.data)
          let res = response.data;
          if(res){
            this.listData = res
          }
        })
      },
    },
    computed:{

    }

  }
</script>

<style scoped lang="stylus">
  @import './warehouse.styl';
</style>
