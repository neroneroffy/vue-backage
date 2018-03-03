

<template>
    <div id="organization">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="add" class="add">新增</Button>
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
<!--            <FormItem>
              <Select v-model="searchContent.department" style="width:200px" placeholder="请选择部门">
                <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>-->
            <FormItem>
              <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Table :columns="columns" :data="data" class="table"></Table>
    </div>
</template>

<script>

    export default {
      name: "organization",
      data(){
        return {
          columns: [
            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                return h(`Table`, {
                  props: {
                    columns: this.childrenColumns,
                    data:params.row.children,
                    class:"children-table"
                  }
                })
              }
            },
            {
              title: 'ID',
              key: '_id',
              width:180

            },
            {
              title: '名称',
              key: 'name',
              width:180
            },
            {
              title: '部门',
              key: 'department',
              width:180
            },
            {
              title: '电话',
              key: 'phone',
              width:180
            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('div', [
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
          childrenColumns: [
            {
              title: 'ID',
              key: '_id',
              width:180
            },
            {
              title: '名称',
              key: 'name',
              width:180
            },
            {
              title: '部门',
              key: 'department',
              width:180
            },
            {
              title: '电话',
              key: 'phone',
              width:180

            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('div', [
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
          data:[
            {
              _id:"432534543543",
              name:"行政部",
              department:"行政组织部",
              phone:"29437493",
              children:[
                {
                  _id:"432534543543",
                  name:"下级行政部1",
                  department:"下级行政管理部",
                  phone:"29437493",
                },
                {
                  _id:"54938127839848",
                  name:"下级行政部2",
                  department:"下级行政管理部",
                  phone:"29437493",
                },
              ]
            },
            {
              _id:"765754354343",
              name:"食堂部",
              department:"食堂管理部",
              phone:"29437493",
              children:[
                {
                  _id:"342424554353",
                  name:"下级食堂部1",
                  department:"下级食堂管理部",
                  phone:"29437493",
                },
                {
                  _id:"5464565464523",
                  name:"下级食堂部2",
                  department:"下级食堂管理部",
                  phone:"29437493",
                },
              ]
            },
            {
              _id:"678789996556",
              name:"党委",
              department:"党委宣传部",
              phone:"29439473",
              children:[
                {
                  _id:"342424554353",
                  name:"下级党委部1",
                  department:"下级党委管理部",
                  phone:"29437493",
                },
                {
                  _id:"5464565464523",
                  name:"下级党委部2",
                  department:"下级党委管理部",
                  phone:"29437493",
                },
              ]

            },
            {
              _id:"7843274982743",
              name:"后勤",
              department:"后勤管理部",
              phone:"29437784",
              children:[
                {
                  _id:"342424554353",
                  name:"下级后勤部1",
                  department:"下级后勤管理部",
                  phone:"29437493",
                },
                {
                  _id:"5464565464523",
                  name:"下级后勤部2",
                  department:"下级后勤管理部",
                  phone:"29437493",
                },
              ]

            }
          ],
          searchContent:{
            id:"",
            account:"",
            phone:"",
            department:""
          }
        }
      },
      mounted(){
        let params = {
          pageNum:this.currentPage,
          pageSize:this.pageSize
        };
        this.$store.dispatch('getList',params)
      },
      methods:{
        edit(params){
          console.log(params)
        },
        remove(params){
          console.log(params)
        },
        add(){

        },
        handleSearch(){

        }
      },
      computed:{
        listData(){
          return this.$store.state.usermanage.list
        }
      }
    }
</script>

<style lang="stylus">
  @import "./organization.styl"
</style>
