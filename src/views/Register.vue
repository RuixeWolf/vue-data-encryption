<template>
  <div class="container">
    <section class="form-container">
      <div class="form-title">用户注册</div>
      <el-form ref="registerForm" :model="registerFormData" :rules="registerFormRules" label-position="top">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="registerFormData.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerFormData.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmedPassword">
          <el-input type="password" v-model="registerFormData.confirmedPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input type="text" v-model="registerFormData.nickName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="registerFormData.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="registerFormData.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-button class="form-btn" type="primary" plain :loading="registering" @click="hanndleRegister()">注册</el-button>
            </el-col>
            <el-col :span="12">
              <el-button class="form-btn" type="info" plain @click="navigateTo({ name: 'userLogin' })">登录</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { ElMessage } from 'element-plus'
import routerAssist from '@/mixins/routerAssist'
import validateForm from '@/mixins/validateForm'
import { rsaEncrypt } from '@/utils/rsaEncrypt'
import { register as userRegister } from '@/apis/user'

export default defineComponent({
  name: 'Register',

  mixins: [
    routerAssist,
    validateForm
  ],

  data () {
    // 用户名验证器（使用 async 函数可以正常捕获表单验证结果）
    const userNameValidator = async (rule, value, callback) => {
      const userNameReg = /^[a-zA-Z0-9_-]*$/
      if (!userNameReg.test(value)) {
        callback(new Error('用户名只能包含字母或数字'))
      }
    }

    // 确认密码验证器（使用箭头函数使 this 正常指向 Vue 组件实例）
    const confirmedPasswordValidator = async (rule, value, callback) => {
      if (value !== this.registerFormData.password) {
        callback(new Error('两次输入的密码不一致'))
      }
    }

    // 手机号验证器
    const phoneNumValidator = async (rule, value, callback) => {
      const phoneNumReg = /^1[3456789]\d{9}$/
      if (value && !phoneNumReg.test(value)) {
        callback(new Error('手机号格式有误'))
      }
    }

    return {
      // 注册表单数据
      registerFormData: {
        userName: '',
        password: '',
        confirmedPassword: '',
        nickName: '',
        email: '',
        phone: ''
      },

      // 注册表单验证规则
      registerFormRules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: userNameValidator, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码不能少于 6 位', trigger: 'blur' }
        ],
        confirmedPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: confirmedPasswordValidator, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        phone: [
          { validator: phoneNumValidator, trigger: 'blur' }
        ]
      },

      // 正在注册
      registering: false

    }
  },

  methods: {
    // 引入 Vuex actions
    ...mapActions('user', {
      userLogin: 'login'
    }),

    /**
     * 处理注册事件
     */
    async hanndleRegister () {
      this.registering = true

      // 验证表单数据
      const validationRes = await this.validateForm('registerForm')
      if (!validationRes) {
        this.registering = false
        return
      }

      // 获取注册数据
      const formData = { ...this.registerFormData }
      const registerData = {
        userName: formData.userName,
        password: formData.password,
        nickName: formData.nickName,
        email: formData.email,
        phone: formData.phone
      }

      // 加密密码
      try {
        registerData.password = await rsaEncrypt(registerData.password)
      } catch (error) {
        // 加密失败
        ElMessage.error(error)
        this.registering = false
        return
      }

      // 发起注册请求
      let registerRes
      try {
        registerRes = await userRegister(registerData)
      } catch (error) {
        // 请求失败
        ElMessage.error(error)
        this.registering = false
        return
      }

      if (!registerRes.success) {
        // 注册失败
        ElMessage.error(registerRes.message || '注册失败')
        this.registering = false
        return
      }

      // 初始化登录数据
      const loginData = {
        user: registerRes.data.userName,
        password: registerData.password
      }

      // 注册成功后发起登录请求
      try {
        await this.userLogin(loginData)
        // 注册后登录成功
        ElMessage.success('注册成功')
        this.redirectTo({ name: 'user' })
      } catch (error) {
        // 注册后登录失败
        ElMessage.success('注册成功，请登录')
        this.redirectTo({ name: 'userLogin' })
      } finally {
        this.registering = false
      }
    }

  }
})
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    min-height: 100%;
    position: fixed;
    background-color: #fdfdfd;
  }

  .form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: auto;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba($color: #000000, $alpha: 0.1);

    .form-title {
      width: 100%;
      text-align: center;
      font-size: 22px;
      color: #409EFF;
      margin-bottom: 10px;
    }

    .form-btn {
      width: 100%;
    }
  }

  @media screen and (max-width: 700px) {
    .container {
      position: static;
      background-color: #fff;
    }

    .form-container {
      position: static;
      transform: translate(0, 0);
      width: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }
</style>
