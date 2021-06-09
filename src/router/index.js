import { createRouter, createWebHistory } from 'vue-router'

/**
 * Router 配置
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
    meta: {
      title: '用户'
    },
    children: [
      /**
       * 用户信息页面
       * $route /user/info
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
       * $route /user/editinfo
       * @access private
       */
      {
        path: 'editinfo',
        name: 'editUserInfo',
        component: () => import('@/views/user/views/EditUserInfo.vue'),
        meta: {
          title: '编辑用户信息'
        }
      },

      /**
       * 修改密码页面
       * $route /user/modifypassword
       * @access private
       */
      {
        path: 'modifypassword',
        name: 'modifyUserPassword',
        component: () => import('@/views/user/views/ModifyUserPassword.vue'),
        meta: {
          title: '修改密码'
        }
      },

      /**
       * 关于页面
       * $route /user/about
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
   * $route /login
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
   * $route /register
   * @access public
   */
  {
    path: '/register',
    name: 'userRegister',
    component: () => import('@/views/Register.vue'),
    meta: {
      title: '注册'
    }
  }

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
