<template>
  <div>
    <Table class="resource-table" :columns="tableTitle" :data="list" v-if="list"></Table>
  </div>
</template>

<script>
  import { Tabs,Table,Tag } from 'iview'
    export default {
      name: "resource",
      data() {
        return {
          tableTitle: [
            {
              title: 'ID',
              key: 'id'
            },
            {
              title: '名称',
              key: 'resourceName'
            },
            {
              title: '权限字符串',
              key: 'permission'
            },
            {
              title: 'uri',
              key: 'uri'
            },
            {
              title: '类型',
              key: 'resourceType'
            },
            {
              title: '状态',
              key: 'status',
              alien:'center',
              render:(h,params)=>{
                return h('Tag',{
                  props:{
                    color:params.row.status === "启用"?"blue":"gray"
                  },
                  class:'status',
                  style:{
                    cursor:"auto",
                  },

                },
                  params.row.status)
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
