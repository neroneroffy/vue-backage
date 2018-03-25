

<template>
    <div id="organization">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="add" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem prop="user">
              <Input type="text" v-model="searchContent.orgName" placeholder="请输入组织名称"/>
            </FormItem>
            <FormItem prop="account">
              <Input type="text" v-model="searchContent.orgCode" placeholder="请输入组织编码"/>
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
          api:"http://192.168.31.174:8080",
          columns: [
            {
              title: 'ID',
              key: 'id',

            },
            {
              title: '组织名称',
              key: 'orgName'
            },
            {
              title: '组织编码',
              key: 'orgCode'
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
              key: 'id',

            },
            {
              title: '组织名称',
              key: 'orgName'
            },
            {
              title: '组织编码',
              key: 'orgCode'
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
          data:[],
          searchContent:{
            orgName:"",
            orgCode:""
          }
        }
      },
      mounted(){

        this.$http.post(`${this.$host}/sys/org/list`,{}).then(response=>{
          let res = response.data;
          if(res.result){
            this.data = res.data
          }
        })
      },
      methods:{
        convertData(tempData){
          let pData = [];
          let cData = [];
          tempData.forEach((v,i)=>{
            if(!v.parentId){
              v.children = [];
              pData.push(v)
            }else{
              cData.push(v)
            }
          });

          pData.forEach(v=>{
            cData.forEach(k=>{
              if(k.parentId === v.id){
                v.children.push(k)
              }
            });
            if(v.children.length === 0){
              delete v.children
            }
          });
          return pData
        },
        edit(params){

          this.$router.push({path:"/sys/organization/edit-organization",query:{id:params.row.id}})
        },
        remove(params){
          this.$http.get(`${this.$host}/sys/org/del`,{
            params:{id:params.row.id}
          }).then(response=>{
            let res = response.data;
            if(res.result){
              this.$Message.success('删除成功!');
              this.$http.post(`${this.$host}/sys/org/list`,{}).then(response=>{
                let res = response.data;
                if(res.result){
                  this.data = res.data
                }
              })
            }
          });
          console.log(params)
        },
        add(){
          this.$router.push('/sys/organization/edit-organization')
        },
        handleSearch(){
          if(this.searchContent.orgName === "" && this.searchContent.orgCode === ""){
            this.$http.post(`${this.$host}/sys/org/list`,{}).then(response=>{
              let res = response.data;

              if(res.result){
                this.data = this.convertData(res.data);

              }else{
                this.data = []
              }
            });
            return
          }
          this.$http.post(`${this.$host}/sys/org/list`,{...this.searchContent}).then(response=>{
            let res = response.data;

            if(res.result){
              this.data = res.data
            }else{
              this.data = []
            }
          });
/*          axios.post(`${API}/search`).then(response=>{
            let res = response.data;
            if(res.result){
              this.data = res.data;
            }
          });*/
          console.log(this.searchContent);
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
