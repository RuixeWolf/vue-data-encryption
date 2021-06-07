import { createRouter, createWebHistory } from 'vue-router'

/**
 * @type {Array<import('vue-router').RouteRecordRaw>}
 */
const routes = [
  {
    path: '/',
    redirect: { name: 'user' }
  },

  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/User.vue'),
    redirect: { name: 'userInfo' },
    children: [
      {
        path: 'info',
        name: 'userInfo',
        component: () => import('@/views/user/views/UserInfo.vue')
      },
      {
        path: 'editinfo',
        name: 'editUserInfo',
        component: () => import('@/views/user/views/EditUserInfo.vue')
      },
      {
        path: 'modifypassword',
        name: 'modifyUserPassword',
        component: () => import('@/views/user/views/ModifyUserPassword.vue')
      }
    ]
  },

  {
    path: '/login',
    name: 'userLogin',
    component: () => import('@/views/Login.vue')
  },

  {
    path: '/register',
    name: 'userRegister',
    component: () => import('@/views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
