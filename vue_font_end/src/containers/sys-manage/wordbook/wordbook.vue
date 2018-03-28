<!--<template>-->
<!--<div class="present">字典管理</div>-->
<template>
  <div class="present">
    <div class="search-wrapper">
      <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>

      <Form>
      <FormItem prop="dictType">
        <Select v-model="dictType" :value="dictType" @on-change="tab" style="width:200px">
          <Option v-for="item in cityList" :value="item.dictType" :key="item.dictType">{{ item.dictName }}</Option>
        </Select>
      </FormItem>
      </Form>
    </div>
    <Table :columns="columns" :data="listData" class="table"></Table>
  </div>
</template>

<script>
  export default {
    name: "wordbook",
    data() {
      return {
        api:"http://192.168.31.13:8080",
        columns: [
          {
            title: '字典标识',
            key: 'dictKey'
          },
          {
            title: '字典值',
            key: 'dictValue',
            render: (h, params) => {
              return h('Input', {
                props: {
                  size: 'small',
                  value: params.row.dictValue
                },
                on: {
                  input: (val) => {
                    //赋值行内数据
                    console.log(params)
                    if(val){
                      params.row.dictValue = val
                    }
                  }
                }
              })
            }
          },
          {
            title: '字典名称',
            key: 'dictName',
            render: (h, params) => {
              return h('Input', {
                props: {
                  size: 'small',
                  value: params.row.dictName
                },
                on: {
                  input: (val) => {
                    //赋值行内数据
                    console.log(params)
                    if(val){
                      params.row.dictName = val
                    }
                  }
                }
              })
            }
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
        cityList:[
          {
            dictType:"无类",
            dictKey:"123",
            dictValue:"无知",
            dictName:"sb"
          }
        ],
        dictType:"",
        dictName:"",
        listData:[
          {
            dictType:"无类",
            dictKey:"123",
            dictValue:"无知",
            dictName:"sb"
          }
        ]
      }
    },
    mounted() {
      this.$http.get(`${this.api}/base/dict/findType`).then(response=>{
        let res = response.data;
        this.dictType=res[0].dictType;
        this.dictName=res[0].dictName;
        this.cityList=res;
        this.$http.get(`${this.api}/base/dict/findByDictType`, {params:{dictType:this.dictType}}).then(response => {
          let data = response.data;
          this.listData = data;
        })
      })

    },
    methods: {
      tab(){
        this.$http.get(`${this.api}/base/dict/findByDictType`, {params:{dictType:this.dictType}}).then(response => {
          let data = response.data;
          this.listData = data;
        })
      },
      addMember() {
        this.$router.push('/editWordbook')
      },
      //编辑
      edit(params){
        this.$Modal.confirm({
          content: '<p>确认编辑此条数据吗？</p>',
          loading: true,
          onOk: () => {
            console.log(params)
            this.$store.dispatch('modalLoading');
            // let params=params.row;
            this.$http.post(`${this.api}/base/dict/update`,params.row).then(response=>{
              let res = response.data;
              console.log(response);
              if (res.result) {
                this.$Modal.remove();
                this.$Message.info('编辑成功');
                this.$router.push({path:'/wordbook'})
              }
            })
          }
        })
      },
      //删除
      remove(params) {
        this.$Modal.confirm({
          content: '<p>确认删除此条数据吗？</p>',
          loading: true,
          onOk: () => {
            console.log(params)
            this.$store.dispatch('modalLoading');
            this.$http.get(`${this.api}/base/dict/del`,{
              params:{ id:params.row.id}
            }).then(response=>{
              let res = response.data;
              console.log(response);
              if (res.result) {
                this.$Modal.remove();
                this.$Message.info('删除成功');
                this.$router.push({path:'/wordbook'})
              }
            })
          }
        })
        ;
      }
    },
    computed: {}

  }
</script>

<style scoped lang="stylus">
  @import "./wordbook.styl";
</style>
