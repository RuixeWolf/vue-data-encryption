<template>
  <div class="container">
    <section class="user-info-container">
      <el-descriptions title="用户信息" direction="vertical" :column="2" border v-loading='loadingInfo'>
        <template #extra>
          <el-button type="primary" plain size="small" icon="el-icon-edit" @click="navigateTo({ name: 'editUserInfo' })">编辑</el-button>
        </template>
        <el-descriptions-item label="用户名">{{ userInfo.userName || '无' }}</el-descriptions-item>
        <el-descriptions-item label="用户 ID">{{ userInfo.userId || '无' }}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{ userInfo.nickName || '无' }}</el-descriptions-item>
        <el-descriptions-item label="账号">{{ userInfo.userAccount || '无' }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ userInfo.email || '无' }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ userInfo.phone || '无' }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ formatedDate(userInfo.registerTime) || '无' }}</el-descriptions-item>
        <el-descriptions-item label="信息修改时间">{{ formatedDate(userInfo.modifiedTime) || '无' }}</el-descriptions-item>
      </el-descriptions>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getInfo } from '@/apis/user'
import { ElMessage } from 'element-plus'
import routerAssist from '@/mixins/routerAssist'
import { dateFormat } from '@/utils/date'

export default defineComponent({
  name: 'UserInfo',

  mixins: [
    routerAssist
  ],

  data () {
    return {
      // 用户信息
      userInfo: {
        userId: '',
        userAccount: '',
        userName: '',
        nickName: '',
        avatar: '',
        email: '',
        phone: '',
        modifiedTime: '',
        registerTime: ''
      },

      // 正在加载用户信息
      loadingInfo: false

    }
  },

  created () {
    // 初始化页面数据
    this.setUserInfo()
  },

  methods: {
    /**
     * 获取并设置页面用户信息
     */
    async setUserInfo () {
      // 显示加载动画
      this.loadingInfo = true

      // 获取用户信息
      try {
        const userInfoRes = await getInfo()
        if (userInfoRes.success) {
          this.userInfo = userInfoRes.data
          return
        }
        ElMessage.error(userInfoRes.message || '获取用户信息失败')
      } catch (error) {
        ElMessage.error(error.message)
      } finally {
        // 关闭加载动画
        this.loadingInfo = false
      }
    },

    /**
     * 获取格式化的日期
     * @param {string} dateStr - 日期字符串
     * @returns {string} 格式化的日期
     */
    formatedDate (dateStr) {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return dateFormat(date, 'YYYY-mm-dd HH:MM:SS')
    }

  }
})
</script>

<style lang="scss" scoped>
  .user-info-container {
    width: 80%;
    margin: 50px auto;
  }

  @media screen and (max-width: 1000px) {
    .user-info-container {
      width: 90%;
    }
  }

  @media screen and (max-width: 800px) {
    .user-info-container {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
    }
  }

</style>
