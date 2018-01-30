<template>
  <div>
    <Tabs value="source-list">
      <TabPane label="资源列表" name="source-list">
        <Table class="resource-table" :columns="tableTitle" :data="list" v-if="list"></Table>
      </TabPane>
      <TabPane label="编辑" name="edit">编辑</TabPane>
    </Tabs>
  </div>
</template>

<script>
  import { Tabs,Table,Button } from 'iview'
    export default {
      name: "resource",
      data() {
        return {
          secondTitle:[
            {
              title: 'ID',
              key: '_id'
            },
            {
              title: '名称',
              key: 'name'
            },
            {
              title: 'uri',
              key: 'path'
            },
            {
              title: '类型',
              key: 'type'
            },
            {
              title: '操作',
              key: 'action',
              alien:'center',
              render:(h,params)=>{
                return h('Button',{
                    props:{
                      size:'small'
                    },
                    class:'status',
                    style:{
                      background:params.row.status?"#13D149":"#ccc",
                      color:"#fff"
                    },
                    on: {
                      click: () => {
                        this.statusEdit(params)
                      }
                    },
                  },
                  params.row.status?"禁用": '启用')
              }
            }
          ],
          tableTitle: [
            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                return h("Table", {
                  props: {
                    data: this.list,
                    columns:this.secondTitle,
                  },
                  class:"second-level-table"
                })
              }
            },
            {
              title: 'ID',
              key: '_id'
            },
            {
              title: '名称',
              key: 'name'
            },
            {
              title: 'uri',
              key: 'path'
            },
            {
              title: '类型',
              key: 'type'
            },
            {
              title: '操作',
              key: 'action',
              alien:'center',
              render:(h,params)=>{
                return h('Button',{
                  props:{
                    size:'small'
                  },
                  class:'status',
                  style:{
                    background:params.row.status?"#13D149":"#ccc",
                    color:"#fff"
                  },
                  on: {
                    click: () => {
                      this.statusEdit(params)
                    }
                  },
                },
                  params.row.status?"禁用": '启用')
              }
            }
          ]
        }
      },
      created(){
        this.$store.dispatch('getList')
      },
      methods: {},
      computed:{
        list(){
          return this.$store.state.resource.list
        }
      }
    }
</script>

<style lang="stylus">
  @import './resource.styl'
</style>
