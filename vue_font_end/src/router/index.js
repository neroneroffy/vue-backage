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
import commodity from '@/containers/base-data/commodity/commodity'
import editCommodity from '@/containers/base-data/commodity/edit-commodity/edit-commodity'
import present from '@/containers/base-data/present/present'
import materiel from '@/containers/base-data/materiel/materiel'
import client from '@/containers/base-data/client/client'
import supplier from '@/containers/base-data/supplier/supplier'
import warehouse from '@/containers/base-data/warehouse/warehouse'
import contact from '@/containers/base-data/contact/contact'
import address from '@/containers/base-data/address/address'
import unit from '@/containers/base-data/unit/unit'
import stockPrice from '@/containers/base-data/stock-price/stock-price'

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
          path: '/baseData/materiel',
          name:'materiel',
          component:materiel
        },
        {
          path: '/baseData/client',
          name:'client',
          component:client
        },
        {
          path: '/baseData/supplier',
          name:'supplier',
          component:supplier
        },
        {
          path: '/baseData/warehouse',
          name:'warehouse',
          component:warehouse
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
          path: '/baseData/stock-price',
          name:'stock-price',
          component:stockPrice
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
  }

  next()
})

export default router
