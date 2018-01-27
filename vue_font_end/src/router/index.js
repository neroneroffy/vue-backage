import Vue from 'vue'
import Router from 'vue-router'
import usermanage from '@/containers/usermanage/usermanage'
import editmember from '@/containers/edit-member/edit-member'
import login from '@/containers/login/login'
import container from '@/containers/container/container'
import role from '@/containers/role/role'
import resource from '@/containers/resource/resource'
import resourceList from '@/containers/resource-list/resource-list'
import panel from '@/containers/panel/panel'

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
          children:[
            {
              path:"/sys/resource/list",
              name:"resource-list",
              component:resourceList
            }
          ]
        },
        {
          path: '/sys/role',
          name: 'role',
          component: role
        },
        {
          path: '/sys/user',
          name: 'usermanage',
          component: usermanage
        }

      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
/*  document.title = to.meta.title || 'demo'
  if (!to.query.url && from.query.url) {
    to.query.url = from.query.url
  }*/
  sessionStorage.setItem('currentPath',to.fullPath);
  if(from.fullPath === '/login'){
    sessionStorage.setItem('lastPath','/index');
  }else{
    sessionStorage.setItem('lastPath',from.fullPath);
  }

  next()
})

export default router
