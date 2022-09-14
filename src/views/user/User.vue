<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <el-affix position="top">
      <!-- PC 端导航栏 -->
      <nav class="nav-pc">
        <el-menu :default-active="currentPath" mode="horizontal" router active-text-color="#409EFF">
          <el-menu-item index="/user/info">用户信息</el-menu-item>
          <el-menu-item index="/user/edit-info">编辑用户信息</el-menu-item>
          <el-menu-item index="/user/modify-password">修改密码</el-menu-item>
          <el-menu-item index="/user/about">关于</el-menu-item>
          <!-- popper class 不能存在于使用 scoped 的 style 标签中 -->
          <el-submenu index="more" popper-class="menu-more">
            <template #title>更多</template>
            <el-menu-item @click="confirmLogout()">退出登录</el-menu-item>
            <el-menu-item @click="confirmCancellation()">注销账号</el-menu-item>
          </el-submenu>
        </el-menu>
      </nav>

      <!-- 移动端导航栏 -->
      <nav class="nav-phone">
        <!-- 移动端页面 header -->
        <div class="nav-phone-header">
          <i class="el-icon-s-unfold nav-phone-header-btn" @click="switchDrawerNav(true)"></i>
          <div class="nav-phone-header-title">{{ pageTitle }}</div>
        </div>

        <!-- 导航菜单 drawer -->
        <el-drawer
          v-model="drawerNav"
          direction="ltr"
          size="60%"
          title="导航">
          <div class="nav-phone-drawer">
            <!-- 导航菜单 -->
            <el-menu
              :default-active="currentPath"
              mode="vertical"
              router
              active-text-color="#409EFF"
              @select="switchDrawerNav(false)">
              <el-menu-item index="/user/info">用户信息</el-menu-item>
              <el-menu-item index="/user/edit-info">编辑用户信息</el-menu-item>
              <el-menu-item index="/user/modify-password">修改密码</el-menu-item>
              <el-menu-item index="/user/about">关于</el-menu-item>
              <el-submenu index="more">
                <template #title>更多</template>
                <el-menu-item @click="confirmLogout()">退出登录</el-menu-item>
                <el-menu-item @click="confirmCancellation()">注销账号</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-drawer>
      </nav>
    </el-affix>

    <!-- 子页面内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'
import routerAssist from '@/mixins/routerAssist'
import { rsaEncrypt } from '@/utils/rsaEncrypt'
import { accountCancellation } from '@/apis/user'

export default defineComponent({
  name: 'User',

  mixins: [
    routerAssist
  ],

  data () {
    return {
      // 是否打开移动端导航栏 drawer
      drawerNav: false

    }
  },

  computed: {
    ...mapState('user', ['logged']),

    /**
     * 当前路由路径
     */
    currentPath () {
      return this.$route.path
    },

    /**
     * 当前页面名称
     */
    pageTitle () {
      return this.$route.meta.title
    }

  },

  created () {
    // 未登录则转至登录页面
    if (!this.logged) {
      this.redirectTo({ name: 'userLogin' })
    }
  },

  methods: {
    // 引入 Vuex actions
    ...mapActions('user', {
      userLogout: 'logout'
    }),

    // 引入 Vuex mutations
    ...mapMutations('user', {
      setLoginStatus: 'SET_LOGIN_STATUS'
    }),

    /**
     * 打开确认退出登录弹窗
     */
    confirmLogout () {
      ElMessageBox.confirm('确认退出登录', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => this.handleLogout())
        .catch(err => err)
    },

    /**
     * 处理用户退出登录事件
     */
    async handleLogout () {
      // 显示退出登录提示
      const logoutMsg = ElMessage({
        message: '正在退出登录',
        type: 'info',
        duration: 0
      })

      try {
        const logoutRes = await this.userLogout()
        // 退出登录成功
        ElMessage.success(logoutRes)
        this.redirectTo({ name: 'userLogin' })
      } catch (error) {
        // 退出登录失败
        ElMessage.error(error.message)
      }

      // 关闭退出登录提示
      logoutMsg.close()
    },

    /**
     * 打开确认注销账号弹窗
     */
    confirmCancellation () {
      ElMessageBox.prompt('确认注销账号，请输入密码', '账号注销', {
        confirmButtonText: '确认注销',
        confirmButtonClass: 'el-button el-button--default el-button--small el-button--danger',
        cancelButtonText: '取消',
        inputType: 'password',
        inputPlaceholder: '密码',
        inputValidator: value => {
          if (!value) return '密码不能为空'
          if (value.length < 6) return '密码不应少于 6 位'
          return true
        }
      }).then(({ value }) => {
        this.handleAccountCancellation(value)
      }).catch(err => err)
    },

    /**
     * 处理用户账号注销事件
     * @param {string} password - 用户账号密码
     */
    async handleAccountCancellation (password) {
      // 显示账号注销提示
      const accountCancellationMsg = ElMessage({
        message: '正在注销账号',
        type: 'info',
        duration: 0
      })

      // 加密密码
      try {
        password = await rsaEncrypt(password)
      } catch (error) {
        // 加密失败
        ElMessage.error(error.message)
        // 关闭账号注销提示
        accountCancellationMsg.close()
        return
      }

      // 生成账号注销数据
      const cancellationData = { password }

      // 发起账号注销请求
      let cancellationRes
      try {
        cancellationRes = await accountCancellation(cancellationData)
      } catch (error) {
        // 请求失败
        ElMessage.error(error.message)
        // 关闭账号注销提示
        accountCancellationMsg.close()
        return
      }

      // 判断注销结果
      if (cancellationRes && cancellationRes.success) {
        // 账号注销成功
        this.setLoginStatus(false)
        ElMessage.success(cancellationRes.message || '账号已注销')
        this.redirectTo({ name: 'userLogin' })
      } else {
        // 账号注销失败
        ElMessage.error(cancellationRes.message || '账号注销失败')
      }

      // 关闭账号注销提示
      accountCancellationMsg.close()
    },

    /**
     * 切换移动端导航栏状态
     * @param {boolean} status - 打开或关闭移动端导航栏
     */
    switchDrawerNav (status) {
      this.drawerNav = status
    }

  }
})
</script>

<style lang="scss">
  .menu-more {
    ul {
      min-width: 0;
    }
  }

  .nav-pc {
    display: block;
  }

  .nav-phone {
    display: none;
    background-color: #fff;

    &-header {
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: solid 1px #e6e6e6;
      position: relative;

      &-btn {
        font-size: 30px;
        color: #606266;
      }

      &-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #409EFF;
        font-size: 18px;
      }
    }
  }

  @media screen and (max-width: 700px) {
    .nav-pc {
      display: none;
    }

    .nav-phone {
      display: block;
    }
  }

</style>
