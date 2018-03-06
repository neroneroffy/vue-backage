<template>
  <div>
    <Table class="resource-table" :columns="tableTitle" :data="listData" v-if="listData"></Table>
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
          ],
          listData:""
        }
      },
      created(){
        this.$http.get(`${this.$host}/sys/resource/list`).then(res=>{
          if(res.data.result){
            this.listData = res.data.data
          }
        })
      },
      methods: {
        //测试分支
      },
      computed:{

      }
    }
</script>

<style lang="stylus">
  @import './resource.styl'
</style>
