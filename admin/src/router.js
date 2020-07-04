// import Vue from 'vue'
// import Router from 'vue-router'
import login from './views/login.vue'
// Vue.use(Router)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      component: ()=>import('@/views/home'),
      children: [{
        path: '/index',
        name: 'index',
        component:  ()=>import('@/views/index')
      },{
        path: '/account',
        name: 'account',
        component: ()=>import('@/views/account')
      }, ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    if (localStorage.getItem('userName')) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router