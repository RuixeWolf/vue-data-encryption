<template>
  <div class="container">
    <section class="edit-info-container">
      <el-form ref="editUserInfo" label-position="top" :model="editInfoFormData" :rules="editInfoFormRules" v-loading="loadingInfo">
        <el-form-item label="昵称" prop="nickName">
          <el-input type="text" v-model="editInfoFormData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="editInfoFormData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="tel" v-model="editInfoFormData.phone"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-button class="form-btn" type="primary" plain @click="confirmModify()" :loading="editing" :disabled="formUnchanged">修改信息</el-button>
            </el-col>
            <el-col :span="12">
              <el-button class="form-btn" type="info" plain @click="resetFormData()" :disabled="formUnchanged">重置信息</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import validateForm from '@/mixins/validateForm'
import { getInfo, editInfo } from '@/apis/user'
import { compareRecord } from '@/utils/equals'

export default defineComponent({
  name: 'EditUserInfo',

  mixins: [
    validateForm
  ],

  data () {
    // 手机号验证器
    const phoneNumValidator = async (rule, value, callback) => {
      const phoneNumReg = /^1[3456789]\d{9}$/
      if (value && !phoneNumReg.test(value)) {
        callback(new Error('手机号格式有误'))
      }
    }

    return {
      // 原始表单数据
      originalFormData: {
        nickName: '',
        avatar: '',
        email: '',
        phone: ''
      },

      // 编辑用户信息表单数据
      editInfoFormData: {
        nickName: '',
        avatar: '',
        email: '',
        phone: ''
      },

      // 编辑用户信息表单验证规则
      editInfoFormRules: {
        email: [
          { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
        ],
        phone: [
          { validator: phoneNumValidator, trigger: 'blur' }
        ]
      },

      // 正在加载用户信息
      loadingInfo: false,

      // 正在修改用户信息
      editing: false
    }
  },

  computed: {
    /**
     * 表单数据未被改变
     * @returns {boolean} 表单数据是否未改变
     */
    formUnchanged () {
      return compareRecord(this.editInfoFormData, this.originalFormData)
    }

  },

  created () {
    // 初始化表单数据
    this.setFormData()
  },

  methods: {
    /**
     * 设置表单数据
     * @param {Record<string, unknown>} [userInfo] - 用户信息
     */
    async setFormData (userInfo) {
      // 显示加载动画
      this.loadingInfo = true

      // 从服务器端获取用户信息
      if (!userInfo) {
        try {
          const userInfoRes = await getInfo()
          if (!userInfoRes || !userInfoRes.success) {
            ElMessage.error(userInfoRes.message || '获取用户信息失败')
            this.loadingInfo = false
            return
          }
          userInfo = userInfoRes.data
        } catch (error) {
        // 请求失败
          ElMessage.error(error.message)
          this.loadingInfo = false
          return
        }
      }

      // 初始化表单数据
      const formData = {
        nickName: userInfo.nickName || '',
        avatar: userInfo.avata || '',
        email: userInfo.email || '',
        phone: userInfo.phone || ''
      }

      // 设置页面表单数据
      this.originalFormData = { ...formData }
      this.editInfoFormData = { ...formData }
      this.loadingInfo = false
    },

    /**
     * 重置表单数据
     */
    resetFormData () {
      this.editInfoFormData = { ...this.originalFormData }
      this.$refs['editUserInfo'].clearValidate()
    },

    /**
     * 打开确认修改信息弹窗
     */
    async confirmModify () {
      // 验证表单数据
      const validateRes = await this.validateForm('editUserInfo')
      if (!validateRes) return

      ElMessageBox.confirm('确认修改用户信息', '编辑用户信息', {
        confirmButtonText: '确认修改',
        cancelButtonText: '取消'
      }).then(() => this.handleEditUserInfo())
        .catch(err => err)
    },

    /**
     * 处理修改用户信息事件
     */
    async handleEditUserInfo () {
      this.editing = true

      // 获取编辑用户信息数据
      const editUserInfoReq = { ...this.editInfoFormData }

      // 发起修改用户信息请求
      let editUserInfoRes
      try {
        editUserInfoRes = await editInfo(editUserInfoReq)
      } catch (error) {
        // 请求失败
        ElMessage.error(error.message)
        this.editing = false
        return
      }

      // 判断用户信息修改结果
      if (editUserInfoRes && editUserInfoRes.success) {
        // 修改成功
        ElMessage.success(editUserInfoRes.message || '用户信息已更改')
        this.setFormData(editUserInfoRes.data)
      } else {
        // 修改失败
        ElMessage.error(editUserInfoRes.message || '用户信息修改失败')
      }

      // 修改用户信息结束
      this.editing = false
    }

  }
})
</script>

<style lang="scss" scoped>
  .edit-info-container {
    width: 500px;
    margin: 50px auto;

    .form-btn {
      width: 100%;
    }
  }

  @media screen and (max-width: 520px) {
    .edit-info-container {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
    }
  }
</style>
