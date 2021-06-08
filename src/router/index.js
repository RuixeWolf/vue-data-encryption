import { createRouter, createWebHistory } from 'vue-router'

/**
 * @type {Array<import('vue-router').RouteRecordRaw>}
 */
const routes = [
  /**
   * 根路径（跳转至用户相关页面）
   * $route /
   * @access public
   */
  {
    path: '/',
    redirect: { name: 'user' }
  },

  /**
   * 用户相关页面（跳转至用户信息页面）
   * $route /user
   * @access private
   */
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/User.vue'),
    redirect: { name: 'userInfo' },
    children: [
      /**
       * 用户信息页面
       * $route /user/info
       * @access private
       */
      {
        path: 'info',
        name: 'userInfo',
        component: () => import('@/views/user/views/UserInfo.vue')
      },

      /**
       * 编辑用户信息页面
       * $route /user/info
       * @access private
       */
      {
        path: 'editinfo',
        name: 'editUserInfo',
        component: () => import('@/views/user/views/EditUserInfo.vue')
      },

      /**
       * 修改密码页面
       * $route /user/info
       * @access private
       */
      {
        path: 'modifypassword',
        name: 'modifyUserPassword',
        component: () => import('@/views/user/views/ModifyUserPassword.vue')
      },

      /**
       * 关于页面
       * $route /user/info
       * @access private
       */
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/user/views/About.vue')
      }
    ]
  },

  /**
   * 用户登录页面
   * $route /user/info
   * @access public
   */
  {
    path: '/login',
    name: 'userLogin',
    component: () => import('@/views/Login.vue')
  },

  /**
   * 用户注册页面
   * $route /user/info
   * @access public
   */
  {
    path: '/register',
    name: 'userRegister',
    component: () => import('@/views/Register.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

export default router
