<template>
  <div class="container">
    <section class="form-container">
      <div class="form-title">用户登录</div>
      <el-form ref="loginForm" :model="loginFormData" :rules="loginFormRules" label-position="top">
        <el-form-item label="用户" prop="user">
          <el-input type="text" v-model="loginFormData.user" placeholder="用户名 / 账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginFormData.password" placeholder="密码" @keyup.enter="hanndleLogin()"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-button class="form-btn" type="primary" plain :loading="loginNow" @click="hanndleLogin()">登录</el-button>
            </el-col>
            <el-col :span="12">
              <el-button class="form-btn" type="info" plain @click="navigateTo({ name: 'userRegister' })">注册</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { ElMessage } from 'element-plus'
import routerAssist from '@/mixins/routerAssist'
import validateForm from '@/mixins/validateForm'
import { rsaEncrypt } from '@/utils/rsaEncrypt'

export default defineComponent({
  name: 'Login',

  mixins: [
    routerAssist,
    validateForm
  ],

  data () {
    return {
      // 登录表单数据
      loginFormData: {
        user: '',
        password: ''
      },

      // 登录表单验证规则
      loginFormRules: {
        user: [
          { required: true, message: '请输入用户名或账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码格式有误', trigger: 'blur' }
        ]
      },

      // 正在登录
      loginNow: false

    }
  },

  computed: {
    ...mapState('user', ['logged'])

  },

  created () {
    // 已登录则转至用户相关页面
    if (this.logged) {
      this.redirectTo({ name: 'user' })
    }
  },

  methods: {
    // 引入 Vuex actions
    ...mapActions('user', {
      userLogin: 'login'
    }),

    /**
     * 处理用户登录事件
     */
    async hanndleLogin () {
      this.loginNow = true

      // 验证表单数据
      const validationRes = await this.validateForm('loginForm')
      if (!validationRes) {
        this.loginNow = false
        return
      }

      // 获取登录数据
      const loginData = { ...this.loginFormData }

      // 加密密码
      try {
        loginData.password = await rsaEncrypt(loginData.password)
      } catch (error) {
        // 加密失败
        ElMessage.error(error)
        this.loginNow = false
        return
      }

      // 发起登录请求
      try {
        const loginRes = await this.userLogin(loginData)
        // 登录成功
        ElMessage.success(loginRes)
        this.redirectTo({ name: 'user' })
      } catch (error) {
        // 登录失败
        ElMessage.error(error)
      } finally {
        this.loginNow = false
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
    overflow: hidden;
  }

  .form-container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
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
      transform: translate(0, 0);;
      width: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }
</style>
