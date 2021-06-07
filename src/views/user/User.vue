<template>
  <div class="container">
    User Home
    <el-button type="danger" plain @click="confirmLogout()">退出登录</el-button>
    <el-button type="danger" plain @click="confirmCancellation()">注销账号</el-button>
    <nav>
      <router-link :to="{ name: 'userInfo' }">用户信息</router-link> |
      <router-link :to="{ name: 'editUserInfo' }">编辑用户信息</router-link> |
      <router-link :to="{ name: 'modifyUserPassword' }">修改密码</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'
import routerAssist from '@/mixins/routerAssist'
import { rsaEncrypt } from '@/utils/rsaEncrypt'

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
    ...mapState('user', ['logged'])

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
      userLogout: 'logout',
      accountCancellation: 'accountCancellation'
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
      ElMessageBox.prompt('请输入密码', '账号注销', {
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

      // 生成注销数据
      const cancellationData = { password }

      // 发起账号注销请求
      try {
        const cancellationRes = await this.accountCancellation(cancellationData)
        ElMessage.success(cancellationRes)
        this.redirectTo({ name: 'userLogin' })
      } catch (error) {
        ElMessage.error(error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
