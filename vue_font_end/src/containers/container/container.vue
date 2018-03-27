<template>
  <div class="layout">
    <Layout>
      <Header>
        <div class="layout-logo">爸爸的选择供应链</div>
        <div class="user" v-if="user">
          <div class="avatar">
            <Avatar icon="person"  size="large" :src="user.thumbnail"/>
          </div>
          <div class="name">{{user.nickName}} <span>({{user.roleName}})</span></div>
          <div class="logout" @click="logout">退出</div>
        </div>
      </Header>
      <Layout>

        <Sider hide-trigger :style="{background: '#fff'}" collapsible v-model="isCollapsed">
          <Menu :active-name="highLight" theme="light" width="auto" :open-names="[openFirstMenu[0]]" class="menu" v-if="user">
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
                <MenuItem :name="k.uri" @click.native="storePath(k.uri)">
                  {{k.menuName}}
                </MenuItem>
              </router-link>

            </Submenu>
<!--            <Submenu name="/dataAnalyze">
                <template slot="title">
                  <Icon type="stats-bars"></Icon>
                  数据分析
                </template>
                <router-link to="/dataAnalyze/month-sales" key="/dataAnalyze/month-sales">
                  <MenuItem name="/dataAnalyze/month-sales"  @click.native="storePath('/dataAnalyze/month-sales')">
                    每月销量
                  </MenuItem>
                </router-link>
                <router-link to="/dataAnalyze/year-grow" key="/dataAnalyze/year-grow">
                  <MenuItem name="/dataAnalyze/year-grow" @click.native="storePath('/dataAnalyze/year-grow')">
                    同比增长
                  </MenuItem>
                </router-link>
                <router-link to="/dataAnalyze/sale-distribution" key="/dataAnalyze/sale-distribution">
                  <MenuItem name="/dataAnalyze/sale-distribution" @click.native="storePath('/dataAnalyze/sale-distribution')">
                    销量分布
                  </MenuItem>
                </router-link>
                <router-link to="/dataAnalyze/sale-rate" key="/dataAnalyze/sale-rate">
                  <MenuItem name="/dataAnalyze/sale-rate" @click.native="storePath('/dataAnalyze/sale-rate')">
                    销量比例
                  </MenuItem>
                </router-link>
              </Submenu>-->
            <!--<Submenu v-for="v in subMenu" :name="v.uri" :key ="v.uri">
                <template slot="title">
                  <Icon :type="v.icon"></Icon>
                  {{v.menuName}}
                </template>
                <router-link v-for="i in v.children" :to="i.uri" :key="i.uri">
                  <MenuItem :name="i.uri"  @click.native="storePath(i.uri)">
                    {{i.menuName}}
                  </MenuItem>
                </router-link>
              </Submenu>-->
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
        isCollapsed: false,
        subMenu:[
          {
            menuName:"基础信息管理",
            uri:"/baseData",
            icon:"document-text",
            children:[
              {
                menuName:"商品管理",
                uri:"/baseData/commodity"
              },
              {
                menuName:"赠品管理",
                uri:"/baseData/present"
              },
              {
                menuName:"物料管理",
                uri:"/baseData/materiel"
              },
              {
                menuName:"客户管理",
                uri:"/baseData/client"
              },
              {
                menuName:"供货商管理",
                uri:"/baseData/supplier"
              },
              {
                menuName:"仓库管理",
                uri:"/baseData/warehouse"
              },
              {
                menuName:"单位设置",
                uri:"/baseData/unit"
              }
            ]
          },
/*          {
            menuName:"财务管理",
            uri:"/finance",
            icon:"cash",
          },*/
          {
            menuName:"库存管理",
            uri:"/repertory",
            icon:"pie-graph",
            children:[
              {
                menuName:"库存盘点",
                uri: "/repertory/stock-taking"
              },
              {
                menuName:"盘点记录查询",
                uri: "/repertory/record"
              },
              {
                menuName:"盘点入库",
                uri: "/repertory/in"
              },
              {
                menuName:"盘点出库",
                uri: "/repertory/out"
              },
/*              {
                menuName:"库存报表",
                uri: "/repertory/statement"
              },*/
            ]
          },
          {
            menuName:"售货管理",
            uri:"/selling",
            icon:"forward",
            children:[
              {
                menuName:"客户订单管理",
                uri: "/selling/order-form"
              },
              {
                menuName:"出库单管理",
                uri: "/selling/out"
              },
/*            {
                menuName:"在线支付",
                uri: "/selling/pay"
              },
              {
                menuName:"报表统计",
                uri: "/repertory/report"
              },*/
              {
                menuName:"申请记录",
                uri: "/selling/apply-record"
              }
            ]
          },
          {
            menuName:"进货管理",
            uri:"/stock",
            icon:"archive",
            children:[
              {
                menuName:"采购单管理",
                uri:"/stock/stock-order"
              },
              {
                menuName:"入库单管理",
                uri:"/stock/stock-in-order"
              }
            ]
          }
        ],
        highLight:sessionStorage.getItem("currentPath")
      }
    },
    created(){
      this.user = JSON.parse(localStorage.getItem('user'));

/*
      console.log("用户进入主页面")
      let xAuthToken = localStorage.getItem('xAuthToken');
      let user = JSON.parse(localStorage.getItem('user'));
      if(!xAuthToken || !user){
        console.log("用户不存在")
        this.$router.push('/login')
        return
      }
      this.user = user;
      console.log(this.user);
      //验证token
      console.log(xAuthToken);
      if(!xAuthToken){
        this.$router.push('/login');
      }else{
        axios.get(`${this.$host}/validate`).then(response=>{
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
              //this.$router.push(this.currentPath)
            }
          }
        })
      };
*/
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
          loading: true,
          onOk:()=>{
            this.$store.dispatch('modalLoading');
            axios.get(`${this.$host}/logout`).then(res=>{
              console.log(res)
              if(res.data.result){
                sessionStorage.clear();
                this.$Modal.remove();
                this.$Message.info('退出成功');
                localStorage.removeItem('xAuthToken');
                this.$router.push('/login')
              }
            })
          },
          onCancel:()=>{}
        });

      },
      storePath(path){
        sessionStorage.setItem('currentPath',path);
        this.highLight = sessionStorage.getItem('currentPath')
      }
    },
    watch: {
      $route(to, from){
        if(this.$route.path.match(/^\/[a-z]+\/[a-z\-]+/g)){
          this.highLight = this.$route.path.match(/^\/[a-z]+\/[a-z\-]+/g)[0]
        }else{
          let activeNameList = this.$route.path.split('/');
          this.hightLight = `/${activeNameList[1]}/${activeNameList[2]}`;
        }
      }
    },
    computed: {
/*      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },*/
      //只是记录哪个菜单高亮用
      currentPath(){
        if(sessionStorage.getItem('currentPath') === '/'){
          this.$router.push('/index')
        }
        let path =sessionStorage.getItem('currentPath')

        return this.highLight
      },
      lastPath(){
        return sessionStorage.getItem('lastPath')
      },
      openFirstMenu(){
        let name = "";
        if(sessionStorage.getItem('currentPath')){
          name = sessionStorage.getItem('currentPath').match(/^\/[a-z]+/ig);
        }

        if(name){

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
    .ivu-layout-sider{
      overflow auto
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
    color #eaeaea;
    font-size 20px;
    letter-spacing 2px;
    font-weight bold
    float: left;

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
