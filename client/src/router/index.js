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
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard'),
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import('@/views/employees'),
  },
  {
    path: '/department',
    name: 'department',
    component: () => import('@/views/department'),
  },
  {
    path: '/section',
    name: 'section',
    component: () => import('@/views/section'),
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/views/team'),
  },
  {
    path: '/divsec',
    name: 'divsec',
    component: () => import('@/views/divsec'),
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: () => import('@/views/transfer'),
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: () => import('@/views/accounts'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile'),
  },
  {
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
