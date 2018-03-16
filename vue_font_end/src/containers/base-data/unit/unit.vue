<template>
    <div class="unit">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
      </div>
      <Table :columns="columns" :data="listData" width="600" class="table" v-if="listData"></Table>
    </div>
</template>

<script>
    export default {
      name: "unit",
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
              title: '计量单位',
              key: 'units'
            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('div', [
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
        //初始请求数据
        this.getUnits()
      },
      methods:{
        done(){
          this.visible = false
        },
        addMember(){
          this.$router.push('/baseData/unit/edit-unit')
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
        //编辑
        edit(params){
          this.$router.push({path:'/baseData/unit/edit-unit',query:{id:params.row.id}})
        },
        //删除
        remove (params) {
          let id = params.row.id;
          this.$Modal.confirm({
            content: '<p>确认删除此条数据吗？</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('modalLoading');
              this.$http.get(`${this.$api}/base/units/del`,{
                params:{
                  id:id
                }
              }).then(response=>{
                let res = response.data;
                console.log(res)
                if(res.result){
                  this.getUnits();
                  this.$Modal.remove();
                  this.$Message.info('删除成功');
                }
              })
            }
          });
        },

        //请求数据
        getUnits(){
          this.$http.get(`${this.$api}/base/units/findAll/`).then(response=>{
            let res = response.data;
            if(res){
              this.listData = res;
            }
          })
        }
      },
      computed:{

      }

    }
</script>

<style scoped lang="stylus">
@import './unit.styl';
</style>
