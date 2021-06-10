<template>
  <div class="container">
    <section class="modify-password-container">
      <el-form ref="modifyPasswordForm" label-position="top" :model="modifyPasswordFormData" :rules="modifyPasswordFormRules">
        <el-form-item label="旧密码" prop="oldPaswword">
          <el-input type="password" v-model="modifyPasswordFormData.oldPaswword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="modifyPasswordFormData.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmedNewPassword">
          <el-input type="password" v-model="modifyPasswordFormData.confirmedNewPassword"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button class="form-btn" type="primary" plain @click="confirmModifyPassword()" :loading="submitting">修改密码</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'
import validateForm from '@/mixins/validateForm'
import routerAssist from '@/mixins/routerAssist'
import { rsaEncrypt } from '@/utils/rsaEncrypt'
import { modifyPassword } from '@/apis/user'

export default defineComponent({
  name: 'ModifyUserPassword',

  mixins: [
    validateForm,
    routerAssist
  ],

  data () {
    // 确认密码验证器
    const confirmedPasswordValidator = async (rule, value, callback) => {
      if (value !== this.modifyPasswordFormData.newPassword) {
        callback(new Error('两次输入的新密码不一致'))
      }
    }

    return {
      // 修改密码表单数据
      modifyPasswordFormData: {
        oldPaswword: '',
        newPassword: '',
        confirmedNewPassword: ''
      },

      // 修改密码表单验证规则
      modifyPasswordFormRules: {
        oldPaswword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, message: '旧密码不应少于 6 位', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '新密码不能少于 6 位', trigger: 'blur' }
        ],
        confirmedNewPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6, message: '新密码不能少于 6 位', trigger: 'blur' },
          { validator: confirmedPasswordValidator, trigger: 'blur' }
        ]
      },

      // 正在提交密码修改
      submitting: false
    }
  },

  methods: {
    // 引入 Vuex mutations
    ...mapMutations('user', {
      setLoginStatus: 'SET_LOGIN_STATUS'
    }),

    /**
     * 打开确认修改密码弹窗
     */
    async confirmModifyPassword () {
      const validateRes = await this.validateForm('modifyPasswordForm')
      if (!validateRes) return
      ElMessageBox.confirm('确认修改密码', '修改密码', {
        confirmButtonText: '确认修改',
        cancelButtonText: '取消'
      }).then(() => this.handleModifyPassword())
        .catch(err => err)
    },

    /**
     * 处理修改密码事件
     */
    async handleModifyPassword () {
      this.submitting = true

      // 获取新旧密码
      let oldPassword = this.modifyPasswordFormData.oldPaswword
      let newPassword = this.modifyPasswordFormData.newPassword

      // 加密密码
      try {
        oldPassword = await rsaEncrypt(oldPassword)
        newPassword = await rsaEncrypt(newPassword)
      } catch (error) {
        ElMessage.error(error.message)
        this.submitting = false
        return
      }

      // 初始化修改密码请求数据
      const modifyPasswordData = { oldPassword, newPassword }

      // 发起修改密码请求
      let modifyPasswordRes
      try {
        modifyPasswordRes = await modifyPassword(modifyPasswordData)
      } catch (error) {
        ElMessage.error(error.message)
        this.submitting = false
        return
      }

      // 判断密码修改结果
      if (modifyPasswordRes && modifyPasswordRes.success) {
        // 修改成功
        ElMessage.success('密码已更改，请重新登录')
        this.setLoginStatus(false)
        this.redirectTo({ name: 'userLogin' })
      } else {
        // 修改失败
        ElMessage.error(modifyPasswordRes.message || '密码修改失败')
      }

      this.submitting = false
    }

  }
})
</script>

<style lang="scss" scoped>
  .modify-password-container {
    width: 500px;
    margin: 50px auto;

    .form-btn {
      width: 100%;
    }
  }

  @media screen and (max-width: 520px) {
    .modify-password-container {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
    }
  }
</style>
