<template>
  <div class="layout">
    <Layout>
      <Header>
        <div class="layout-logo"></div>
        <div class="user" v-if="user">
          <div class="avatar">
            <Avatar icon="person"  size="large" />
          </div>
          <div class="name">{{user.nickName}} <span>({{user.roleName}})</span></div>
          <div class="logout" @click="logout">退出</div>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" collapsible v-model="isCollapsed">
          <Menu :active-name="currentPath" theme="light" width="auto" :class="menuitemClasses" :open-names="[openFirstMenu[0]]" class="menu" v-if="user">
            <router-link to="/index">
              <MenuItem name="/index">
                <Icon type="ios-home"></Icon>
                控制面板
              </MenuItem>
            </router-link>
            <Submenu :name="v.uri" v-for="v in user.menu" :key="v.uri">
              <template slot="title">
                <Icon type="android-settings"></Icon>
                {{v.menuName}}
              </template>

              <router-link v-for="k in v.children" :to="k.uri" :key="k.uri">
                <MenuItem :name="k.uri">
                  {{k.menuName}}
                </MenuItem>
              </router-link>
              <router-link to="/sys/organization" key="/sys/organization">
                <MenuItem name="/sys/organization">
                  组织管理
                </MenuItem>
              </router-link>
            </Submenu>

              <Submenu name="/dataAnalyze">
                <template slot="title">
                  <Icon type="stats-bars"></Icon>
                  数据分析
                </template>
                <router-link to="/dataAnalyze/month-sales" key="/dataAnalyze/month-sales">
                  <MenuItem name="/dataAnalyze/month-sales">
                    每月销量
                  </MenuItem>
                </router-link>
                <router-link to="/dataAnalyze/year-grow" key="/dataAnalyze/year-grow">
                  <MenuItem name="/dataAnalyze/year-grow">
                    同比增长
                  </MenuItem>
                </router-link>
                <router-link to="/dataAnalyze/sale-distribution" key="/dataAnalyze/sale-distribution">
                  <MenuItem name="/dataAnalyze/sale-distribution">
                    销量分布
                  </MenuItem>
                </router-link>
                <router-link to="/dataAnalyze/sale-rate" key="/dataAnalyze/sale-rate">
                  <MenuItem name="/dataAnalyze/sale-rate">
                    销量比例
                  </MenuItem>
                </router-link>

              </Submenu>


          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <loading v-if="this.$store.state.loading.isLoading" v-show="this.$store.state.loading.showModal"></loading>
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import { Layout,Header,Sider,Menu,Breadcrumb,Content,Avatar } from 'iview';
  import { HOST } from '../../const/api';
  import axios from 'axios'
  import loading from '../../components/loading'
  export default {
    name: "container",
    components:{
      Layout,Header,Sider,Menu,Breadcrumb,Content,
      loading
    },
    data(){
      return {
        user:"",
        isCollapsed: false
      }
    },
    created(){

      this.user = JSON.parse(localStorage.getItem('user'));
      //验证token
      console.log('进入');
      let xAuthToken = localStorage.getItem('xAuthToken');
      console.log(xAuthToken);
      if(!xAuthToken){
        this.$router.push('/login');
      }else{
        axios.get(`${HOST}/validate`).then(response=>{
          //如果用户token失效，那么return
          if(!response){
            return
          }
          if(response.data.flag === 'SESSION_INVALID'){
            console.log('失效');
            this.$router.push('/login');
          }else{
            localStorage.setItem('user',JSON.stringify(response.data.data));
            this.user = JSON.parse(localStorage.getItem('user'));
            console.log('验证通过');
            if(this.lastPath === '/index'){
              this.$router.push("/index")
            }else{
              this.$router.push(this.currentPath)
            }
          }
        })
      };
    },
    mounted(){
      //
    },
    methods:{
      logout(){
        this.$Modal.confirm({
          content: "确认退出吗？",
          closable:true,
          cancelText:"取消",
          okText:"确定",
          onOk:()=>{
            this.$store.dispatch('modalLoading');
            axios.get(`${HOST}/logout`).then(res=>{
              console.log(res)
              if(res.data.result){
                sessionStorage.clear()
                localStorage.removeItem('xAuthToken');
                this.$router.push('/login')
              }
            })
          },
          onCancel:()=>{}
        });

      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      currentPath(){
        if(sessionStorage.getItem('currentPath') === '/'){
          this.$router.push('/index')
        }
        return sessionStorage.getItem('currentPath')
      },
      lastPath(){
        return sessionStorage.getItem('lastPath')
      },
      openFirstMenu(){
        let name = sessionStorage.getItem('currentPath').match(/^\/[a-z]+/ig);
        if(name){
          console.log(name)
          return name
        }

        return []
      },
      openSecondMenu(){
        let name = sessionStorage.getItem('currentPath').match(/^\/[a-z]+\/[a-z]+/g);
        if(name){
          return name
        }
        return []
      }
    }
  }
</script>

<style lang="stylus">
  .ivu-layout{
    height: 100%;
  }
  .layout{
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .ivu-menu{
      height: 100%
    }
    .ivu-menu-submenu-title>i{
      margin-right:5px
    }
    .menu{
      a{
        color:#666666!important
      }
    }

  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 0px;
  }
  .user{
    float: right;
    display: flex;
    justify-content: flex-end;
    color: #fff;
    font-size: 14px;
    div{
      margin-left: 15px;
    }
    .name{
      span{
        color: #ccc;
        font-size :12px
      }
    }
    .logout{
      color: #ccc;
      cursor pointer
    }

  }

  .layout-nav{
    width: 420px;
    height: 100%;
    margin: 0 auto;
    margin-right: 20px;
  }
  a{
    color:#666
  }
  .ivu-layout-content{
    position: relative;
    min-height: auto!important;
  }
  .second>div{
    padding-left 43px!important
  }
  .third{
    padding-left 67px!important

  }


</style>
