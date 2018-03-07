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
                <MenuItem :name="k.uri" @click.native="storePath(k.uri)">
                  {{k.menuName}}
                </MenuItem>
              </router-link>
              <router-link to="/sys/organization" key="/sys/organization" >
                <MenuItem name="/sys/organization"  @click.native="storePath('/sys/organization')">
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

              </Submenu>
            <Submenu v-for="v in subMenu" :name="v.uri" :key ="v.uri">
                <template slot="title">
                  <Icon :type="v.icon"></Icon>
                  {{v.menuName}}
                </template>
                <router-link v-for="i in v.children" :to="i.uri" :key="i.uri">
                  <MenuItem :name="i.uri"  @click.native="storePath(i.uri)">
                    {{i.menuName}}
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
                menuName:"联系人管理",
                uri:"/baseData/contact"
              },
              {
                menuName:"地址管理",
                uri:"/baseData/address"
              },
              {
                menuName:"单位设置",
                uri:"/baseData/unit"
              },
              {
                menuName:"进货价格设置",
                uri:"/baseData/stock-price"
              },
            ]
          },
          {
            menuName:"财务管理",
            uri:"/finance",
            icon:"cash",
          },
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
              {
                menuName:"库存报表",
                uri: "/repertory/statement"
              },
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
              {
                menuName:"在线支付",
                uri: "/selling/pay"
              },
              {
                menuName:"报表统计",
                uri: "/repertory/report"
              }
            ]
          },
          {
            menuName:"进货管理",
            uri:"/stock",
            icon:"archive"
          }
        ]
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
              //this.$router.push(this.currentPath)
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
          loading: true,
          onOk:()=>{
            this.$store.dispatch('modalLoading');
            axios.get(`${HOST}/logout`).then(res=>{
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
        sessionStorage.setItem('currentPath',path)
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      //只是记录哪个菜单高亮用
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
        let name = "";
        if(sessionStorage.getItem('currentPath')){
          name = sessionStorage.getItem('currentPath').match(/^\/[a-z]+/ig);
        }
        console.log(name)
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
