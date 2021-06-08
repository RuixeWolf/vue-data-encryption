<template>
  <div class="container">
    <nav>
      <el-menu :default-active="currentPath" mode="horizontal" router active-text-color="#409EFF">
        <el-menu-item index="/user/info">用户信息</el-menu-item>
        <el-menu-item index="/user/editinfo">编辑用户信息</el-menu-item>
        <el-menu-item index="/user/modifypassword">修改密码</el-menu-item>
        <el-menu-item index="/user/about">关于</el-menu-item>
        <!-- popper class 不能存在于使用 scoped 的 style 标签中 -->
        <el-submenu index="more" popper-class="menu-more">
          <template #title>更多</template>
          <el-menu-item @click="confirmLogout()">退出登录</el-menu-item>
          <el-menu-item @click="confirmCancellation()">注销账号</el-menu-item>
        </el-submenu>
      </el-menu>
    </nav>
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

    }
  },

  computed: {
    ...mapState('user', ['logged']),

    /**
     * 当前路由路径
     */
    currentPath () {
      return this.$route.path
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
      try {
        const logoutRes = await this.userLogout()
        ElMessage.success(logoutRes)
        this.redirectTo({ name: 'userLogin' })
      } catch (error) {
        ElMessage.error(error)
      }
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
      // 加密密码
      try {
        password = await rsaEncrypt(password)
      } catch (error) {
        // 加密失败
        ElMessage.error(error)
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
        ElMessage.error(error)
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

</style>
