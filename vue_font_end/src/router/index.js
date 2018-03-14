import Vue from 'vue'
import Router from 'vue-router';

import login from '@/containers/login/login'
import container from '@/containers/container/container'
//资源管理
import resource from '@/containers/sys-manage/resource/resource'

//角色管理
import role from '@/containers/sys-manage/role/role'
import editrole from '@/containers/sys-manage/role/editrole/editrole'
import auth from '@/containers/sys-manage/role/auth/auth'

//用户管理
import usermanage from '@/containers/sys-manage/usermanage/usermanage'
import editmember from '@/containers/sys-manage/usermanage/edit-member/edit-member'

//组织管理
import organization from '@/containers/sys-manage/organization/organization'
import editOrganization from '@/containers/sys-manage/organization/edit-organization/edit-organization'

//数据分析
import monthSales from '@/containers/data-analyze/month-sales/month-sales'
import saleDistribution from '@/containers/data-analyze/sale-distribution/sale-distribution'
import saleRate from '@/containers/data-analyze/sale-rate/sale-rate'
import yearGrow from '@/containers/data-analyze/year-grow/year-grow'
import panel from '@/containers/panel/panel'

//基础信息管理
import commodity from '@/containers/base-data/commodity/commodity';//商品管理
import editCommodity from '@/containers/base-data/commodity/edit-commodity/edit-commodity';//编辑商品
import present from '@/containers/base-data/present/present';//赠品管理
import editPresent from "@/containers/base-data/present/edit-present/edit-present"; //编辑赠品
import materiel from '@/containers/base-data/materiel/materiel';//物料管理
import editMateriel from '@/containers/base-data/materiel/edit-materiel/edit-materiel';//编辑物料
import client from '@/containers/base-data/client/client';//客户管理
import editClient from '@/containers/base-data/client/edit-client/edit-client';//编辑客户
import supplier from '@/containers/base-data/supplier/supplier';//供货商管理
import editSupplier from '@/containers/base-data/supplier/edit-supplier/edit-supplier';//编辑供货商
import warehouse from '@/containers/base-data/warehouse/warehouse';//仓库管理
import editWarehouse from '@/containers/base-data/warehouse/edit-warehouse/edit-warehouse';//编辑仓库
import contact from '@/containers/base-data/contact/contact';//联系人管理
import address from '@/containers/base-data/address/address';//地址管理
import unit from '@/containers/base-data/unit/unit';//单位设置
import editUnit from '@/containers/base-data/unit/edit-unit/edit-unit';//编辑单位
import stockPrice from '@/containers/base-data/stock-price/stock-price';//进货价格设置
//售货管理
import orderForm from '@/containers/selling/order-form/order-form';//进货价格设置

//进货管理@/containers/selling/order-form
import stockOrder from "@/containers/stock/stock-order/stock-order";//采购单管理
import editStockOrder from "@/containers/stock/stock-order/edit-stock-order/edit-stock-order";//编辑采购单
import editStockOrderPresent from "@/containers/stock/stock-order/edit-stock-order-present/edit-stock-order-present";//编辑采购单
import editStockOrderMaterial from "@/containers/stock/stock-order/edit-stock-order-material/edit-stock-order-material";//编辑采购单


import stockInOrder from "@/containers/stock/stock-in-order/stock-in-order";//入库单管理
import editStockInOrder from "@/containers/stock/stock-in-order/edit-stock-in-order/edit-stock-in-order";//编辑商品入库单
import editStockInOrderPresent from "@/containers/stock/stock-in-order/edit-stock-in-order-present/edit-stock-in-order-present";//编辑赠品入库单
import editStockInOrderMaterial from "@/containers/stock/stock-in-order/edit-stock-in-order-material/edit-stock-in-order-material";//编辑物料入库单



//库存管理
import stockTaking from "@/containers/repertory/stock-taking/stock-taking"//库存盘点
import record from "@/containers/repertory/record/record"//库存记录查询
import editRecord from '@/containers/repertory/record/edit-record/edit-record'//记录查询详情
import In from '@/containers/repertory/in/in'//入库
import editIn from '@/containers/repertory/in/edit-in/edit-in'//入库查询
import Out from '@/containers/repertory/out/out'//出库
import editOut from '@/containers/repertory/out/edit-out/edit-out'//出库查询

Vue.use(Router);

const router = new Router({

  routes: [
    {
      path:"/login",
      name:"login",
      component:login
    },
    {
      path:'/',
      name:"container",
      component:container,
      children:[
        {
          path:'/index',
          name:'panel',
          component:panel
        },
        {
          path: '/sys/resource',
          name: 'resource',
          component: resource,
        },
        {
          path: '/sys/role',
          name: 'role',
          component: role
        },
        {
          path: '/sys/role/edit-role',
          name: 'editrole',
          component: editrole
        },
        {
          path: '/sys/role/auth',
          name: 'auth',
          component: auth
        },
        {
          path: '/sys/user',
          name: 'usermanage',
          component: usermanage
        },
        {
          path: '/sys/organization',
          name: 'usermanage',
          component: organization
        },
        {
          path: '/sys/edit-organization',
          name: 'editOrganization',
          component: editOrganization
        },
        {
          path: '/sys/user/editmember',
          name: 'editmember',
          component: editmember
        },
        {
          path: '/sys/user/checkmember',
          name: 'editmember',
          component: editmember
        },
        {
          path: '/sys/user/addmember',
          name: 'editmember',
          component: editmember
        },
        {
          path: '/dataAnalyze/month-sales',
          name:'month-sales',
          component:monthSales
        },
        {
          path: '/dataAnalyze/year-grow',
          name:'year-grow',
          component:yearGrow
        },
        {
          path: '/dataAnalyze/sale-distribution',
          name:'sale-distribution',
          component:saleDistribution
        },
        {
          path: '/dataAnalyze/sale-rate',
          name:'sale-rate',
          component:saleRate
        },
        {
          path: '/baseData/commodity',
          name:'commodity',
          component:commodity
        },
        {
          path: '/baseData/commodity/edit-commodity',
          name:'editCommodity',
          component:editCommodity
        },
        {
          path: '/baseData/present',
          name:'present',
          component:present
        },
        {
          path: '/baseData/present/edit-present',
          name:'edit-present',
          component:editPresent
        },
        {
          path: '/baseData/materiel',
          name:'materiel',
          component:materiel
        },
        {
          path: '/baseData/materiel/edit-materiel',
          name:'edit-materiel',
          component:editMateriel
        },
        {
          path: '/baseData/client',
          name:'client',
          component:client
        },
        {
          path: '/baseData/client/edit-client',
          name:'edit-client',
          component:editClient
        },
        {
          path: '/baseData/supplier',
          name:'supplier',
          component:supplier
        },
        {
          path: '/baseData/supplier/edit-supplier',
          name:'edit-supplier',
          component:editSupplier
        },
        {
          path: '/baseData/warehouse',
          name:'warehouse',
          component:warehouse
        },
        {
          path: '/baseData/warehouse/edit-warehouse',
          name:'edit-warehouse',
          component:editWarehouse
        },
        {
          path: '/baseData/contact',
          name:'contact',
          component:contact
        },
        {
          path: '/baseData/address',
          name:'address',
          component:address
        },
        {
          path: '/baseData/unit',
          name:'unit',
          component:unit
        },
        {
          path: '/baseData/unit/edit-unit',
          name:'edit-unit',
          component:editUnit
        },
        {
          path: '/baseData/stock-price',
          name:'stock-price',
          component:stockPrice
        },
        {
          path: '/repertory/stock-taking',
          name:'stock-taking',
          component:stockTaking
        },
        {
          path: '/repertory/record',
          name:'record',
          component:record
        },
        {
          path: '/repertory/record/edit-record',
          name:'edit-record',
          component:editRecord
        },
        {
          path: '/repertory/in',
          name:'in',
          component:In
        },
        {
          path: '/repertory/in/edit-in',
          name:'edit-in',
          component:editIn
        },
        {
          path: '/repertory/out',
          name:'out',
          component:Out
        },
        {
          path: '/repertory/out/edit-out',
          name:'edit-out',
          component:editOut
        },
        {
          path: '/stock/stock-order',
          name:'stock-order',
          component:stockOrder
        },


        {
          path: '/stock/stock-in-order',
          name:'stock-in-order',
          component:stockInOrder
        },
        {
          path: '/stock/stock-in-order/edit-stock-in-order',
          name:'edit-stock-in-order',
          component:editStockInOrder
        },
        {

          path: '/stock/stock-in-order/edit-stock-in-order-present',
          name:'edit-stock-in-order-present',
          component:editStockInOrderPresent
        },
        {
          path: '/stock/stock-in-order/edit-stock-in-order-material',
          name:'edit-stock-in-order-material',
          component:editStockInOrderMaterial
        },

//-----------采购单
        {
          path: '/stock/stock-order/edit-stock-order',
          name:'edit-stock-order',
          component:editStockOrder
        },
        {
          path: '/stock/stock-order/edit-stock-order-present',
          name:'edit-stock-in-order-present',
          component:editStockOrderPresent
        },
        {
          path: '/stock/stock-order/edit-stock-order-material',
          name:'edit-stock-in-order-material',
          component:editStockOrderMaterial
        },
         {
          path: '/selling/order-form',
          name:'order-form',
          component:orderForm

        },


      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  /*  document.title = to.meta.title || 'demo'
    if (!to.query.url && from.query.url) {
      to.query.url = from.query.url
    }*/

  //sessionStorage.setItem('currentPath',to.fullPath);
  if(from.fullPath === '/login'){
    sessionStorage.setItem('lastPath','/index');
  }else{

    sessionStorage.setItem('lastPath',from.fullPath);
    if(to.fullPath.match(/^\/[a-z]+\/[a-z\-]+/g)){
      sessionStorage.setItem('currentPath',to.fullPath.match(/^\/[a-z]+\/[a-z\-]+/g)[0]);
    }else{
      sessionStorage.setItem('currentPath',to.fullPath);
    }
    console.log(to.fullPath)
  }
  next()
})

export default router
