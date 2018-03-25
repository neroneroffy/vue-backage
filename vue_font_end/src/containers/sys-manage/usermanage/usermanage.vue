<template>
    <div class="manager">
      <div class="search-wrapper">
        <Button type="primary" icon="plus-round" @click="addMember" class="add">新增</Button>
        <div class="search">
          <Form ref="formInline" :model="searchContent" inline>
            <FormItem prop="account">
              <Input type="text" v-model="searchContent.userName" placeholder="用户账号"/>
            </FormItem>
            <FormItem prop="phone">
              <Input type="text" v-model="searchContent.mobile" placeholder="手机号"/>
            </FormItem>

            <FormItem>
              <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Table :columns="columns" :data="listData" class="table" v-if="listData"></Table>
      <div class="pagination">
        <Page show-sizer @on-change="changePage" :current="currentPage" @on-page-size-change="changePageSize" placement="top" :page-size-opts="pageSizeList" :page-size="pageSizeList[0]" :total="total"></Page>
      </div>

    </div>
</template>

<script>
    export default {
      name: "usermanage",
      data(){
            return {
              api:"http://192.168.31.174:8080",
              pageSizeList:[30,50,100],
              pageSize:30,
              total:0,
              currentPage:1,
              loading:true,
              searchContent: {
                userName: '',
                mobile:"",
              },
              columns: [
                {
                  title: '账户',
                  key: 'userName',
                },
                {
                  title: "昵称",
                  key: 'nickName',
                },
                {
                  title: '头像',
                  key: 'avatar',
                  render: (h, params) => {
                    return h('div', [
                      h('Avatar', {
                        props: {
                          shape:"square",
                          src: `${params.row.thumbnail?params.row.thumbnail:""}`,
                          //
                          icon:"person"
                        },
                        style: {
                          width: '50px',
                          height:'50px',
                          margin:'5px 0',
                          lineHeight:"50px",
                          fontSize:"5px"
                        },
                        on: {
                          click: () => {
                            this.show(params.index)
                          }
                        }
                      }),
                    ]);
                  }
                },
/*                {
                  title: '角色',
                  key: 'roleName',
                },*/
                {
                  title: '电话',
                  key: 'mobile',

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
                      }, '删除'),
                      /*h('Button', {
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
                        params.row.status === "NORMAL"?"禁用": '启用')*/
                    ]);
                  }
                }
              ],
              imgName: '',

              listData:[]
            }
        },
      mounted() {
        //初始请求分页
        let params = {
          currentPage:this.currentPage,
          pageSize:this.pageSize
        };
        this.pagination(params)
      },

      methods:{
        done(){
          this.visible = false
        },
        addMember(){
          this.$router.push('/sys/user/addmember')
        },
        cancel(){

        },
        //提交搜索
        handleSubmit() {
          if(this.searchContent.mobile===""&& this.searchContent.userName===""){
            this.pagination();
            return
          }
          let searchData = {
            currentPage:this.currentPage,
            pageSize:this.pageSize,
            ...this.searchContent
          };
          this.$http.post(`${this.$host}/sys/user/list`,{...searchData}).then(response=>{
            let res = response.data;
            this.listData = res.content;
            this.total = data.totalElements;
          })

        },
        //查看信息
        show (params) {
          this.$router.push({path:`/sys/user/editmember`,query:{id:params.row.id,checked:true}})
        },
        //编辑
        edit(params){
          this.$router.push({path:'/sys/user/editmember',query:{id:params.row.id}})
        },
        //删除
        remove (params) {
          let id = params.row.id;
          this.$Modal.confirm({
            content: '<p>确认删除此条数据吗？</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('modalLoading');
              this.$http.get(`${this.$host}/sys/user/del`,{params:{id:id}}).then(response=>{
                let res = response.data;
                if(res.result){
                  this.currentPage = 1,
                  this.pagination();//请求列表数据
                  this.$Modal.remove();
                  this.$Message.success('删除成功');
                }else{
                  this.$Modal.remove();
                  this.$Message.error(res.msg);
                }
              })
            }
          });
        },
        //切换状态
        statusEdit(params){
          //更新管理员状态
            this.$http.post(`${this.$api}/auth/updatestatus`,{id:params.row.id,status:params.row.status}).then(response=>{
              let res = response.data;
              if(res.result){
                console.log(res)
                this.$Message.info('修改成功');
                //更新成功后重新获取表格数据
                this.pagination()
              }
            })
        },
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        //分页函数
        pagination(customsParams){
          let defaultParams = {
            currentPage :1,
            pageSize : 30
          };
          let params = customsParams || defaultParams;
          this.$http.post(`${this.$host}/sys/user/list`,{...params}).then(response=>{
            let res = response.data;
            if(res.totalElements.length!==0){
              this.listData = res.content;
              this.total = res.totalElements;
            }
          })
        },
        //点击分页
        changePage(currentPageNum){
          this.currentPage = currentPageNum;
          let params = {
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };
          this.pagination(params)
        },
        changePageSize(currentPageSize){
          this.pageSize = currentPageSize;
          this.currentPage = 1;
          let params = {
            currentPage:this.currentPage,
            pageSize:this.pageSize
          };

          this.pagination(params)
        },

        },
        computed:{

        }
    }
</script>

<style lang="stylus">
  @import 'usermanager.styl'
</style>
