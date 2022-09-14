import { createRouter, createWebHistory } from 'vue-router'

/**
 * Router 配置
 * @type {Array<import('vue-router').RouteRecordRaw>}
 */
const routes = [
  /**
   * 根路径（跳转至用户相关页面）
   * Path: /
   * @access public
   */
  {
    path: '/',
    redirect: { name: 'user' }
  },

  /**
   * 用户相关页面（跳转至用户信息页面）
   * Path: /user
   * @access private
   */
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/User.vue'),
    redirect: { name: 'userInfo' },
    meta: {
      title: '用户'
    },
    children: [
      /**
       * 用户信息页面
       * Path: /user/info
       * @access private
       */
      {
        path: 'info',
        name: 'userInfo',
        component: () => import('@/views/user/views/UserInfo.vue'),
        meta: {
          title: '用户信息'
        }
      },

      /**
       * 编辑用户信息页面
       * Path: /user/edit-info
       * @access private
       */
      {
        path: 'edit-info',
        name: 'editUserInfo',
        component: () => import('@/views/user/views/EditUserInfo.vue'),
        meta: {
          title: '编辑用户信息'
        }
      },

      /**
       * 修改密码页面
       * Path: /user/modify-password
       * @access private
       */
      {
        path: 'modify-password',
        name: 'modifyUserPassword',
        component: () => import('@/views/user/views/ModifyUserPassword.vue'),
        meta: {
          title: '修改密码'
        }
      },

      /**
       * 关于页面
       * Path: /user/about
       * @access private
       */
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/user/views/About.vue'),
        meta: {
          title: '关于'
        }
      }
    ]
  },

  /**
   * 用户登录页面
   * Path: /login
   * @access public
   */
  {
    path: '/login',
    name: 'userLogin',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录'
    }
  },

  /**
   * 用户注册页面
   * Path: /register
   * @access public
   */
  {
    path: '/register',
    name: 'userRegister',
    component: () => import('@/views/Register.vue'),
    meta: {
      title: '注册'
    }
  },

  /**
   * 404 页面
   * Path: /404
   * @access public
   */
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/Page404.vue'),
    meta: {
      title: '404 Not Found'
    }
  },

  // 重定向至 404 页面
  { path: '/:pathMatch(.*)*', redirect: { name: 'notFound' } }

]

// 创建 Router
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

// Router 前置守卫
router.beforeEach((to, from, next) => {
  // 设置 tab 名称
  document.title = to.meta.title || '常用数据加密场景的设计与实现'

  // 转至下一页面
  next()
})

export default router
