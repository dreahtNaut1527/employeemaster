import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
<<<<<<< HEAD
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile'),
  },
  {
=======
>>>>>>> 8559198239804058af14de5af1e009f588ad2926
    path: '*',
    name: 'error',
    component: () => import('@/views/error'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path !== '/' && !store.state.isLoggedIn) {
    next('/') // Goto Login page
  } else if(to.path === '/' && store.state.isLoggedIn) {
    next('/dashboard') // When login success , goto dashboard
  } else {
    next()
  }
})

export default router
