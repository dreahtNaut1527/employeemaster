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
    path: '/employeedetails',
    name: 'employeedetails',
    component: () => import('@/views/employeedetails'),
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
    path: '/transferhistory',
    name: 'transferhistory',
    component: () => import('@/views/transferhistory'),
  },
  {
    path: '/transferemployees',
    name: 'transferemployees',
    component: () => import('@/views/transferemployees'),
  },
  {
    path: '/pendingemployees',
    name: 'pendingemployees',
    component: () => import('@/views/pendingemployees'),
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
      // check if network is connected
      if(store.state.isConnect) {
          next('/dashboard') // When login success , goto dashboard
      } else {
        next('*')
      }
    } else {
      next()
    }
})

export default router
