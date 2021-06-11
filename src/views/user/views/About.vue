<template>
  <div class="container">
    <div class="about">
      <div class="about-title">关于本项目</div>
      <div class="about-info">
        <div class="about-info-label">项目名称</div>
        <div class="about-info-content">常用数据加密场景的设计与实现</div>
      </div>
      <div class="about-info">
        <div class="about-info-label">项目描述</div>
        <div class="about-info-content">
          基于常用的用户操作场景所涉及的重点数据加密而开发的后端服务与前端单页面应用
        </div>
      </div>
      <div class="about-info">
        <div class="about-info-label">主要功能</div>
        <div class="about-info-content">非对称加密传输时的重点数据（如：密码）</div>
        <div class="about-info-content">单向加密储存时的重点数据</div>
        <div class="about-info-content">使用 Token 验证客户端的会话状态</div>
        <div class="about-info-content">Token 有时限，客户端访问时自动续约</div>
        <div class="about-info-content">限制同一用户同时登录的客户端数量</div>
      </div>
    </div>

    <div class="about">
      <div class="about-title">后端项目</div>
      <div class="about-info">
        <div class="about-info-label">项目描述</div>
        <div class="about-info-content">
          基于 Nodejs Express 框架，使用 TypeScript 开发的 MVC 架构后端服务
        </div>
      </div>
      <div class="about-info">
        <div class="about-info-label">开发语言</div>
        <div class="about-info-content">TypeScript</div>
      </div>
      <div class="about-info">
        <div class="about-info-label">开发框架</div>
        <div class="about-info-content">Nodejs Express</div>
      </div>
      <div class="about-info">
        <div class="about-info-label">数据库</div>
        <div class="about-info-content">MongoDB</div>
      </div>
      <div class="about-info">
        <div class="about-info-label">主要开发库</div>
        <div class="about-info-content">Mongoose —— 提供 MongoDB Model</div>
        <div class="about-info-content">Node-RSA —— 使用 RSA 加密与解密重点数据</div>
        <div class="about-info-content">Crypto-JS —— 重点数据加密</div>
      </div>
    </div>

    <div class="about">
      <div class="about-title">前端项目</div>
      <div class="about-info">
        <div class="about-info-label">项目描述</div>
        <div class="about-info-content">
          基于 Vue 框架开发的前端单页面应用
        </div>
      </div>
      <div class="about-info">
        <div class="about-info-label">开发框架</div>
        <div class="about-info-content">Vue 3</div>
      </div>
      <div class="about-info">
        <div class="about-info-label">主要开发库</div>
        <div class="about-info-content">Vue Router —— 页面路由</div>
        <div class="about-info-content">Vuex —— 用户登录状态管理</div>
        <div class="about-info-content">Element-Plus —— 页面 UI</div>
        <div class="about-info-content">Axios —— XHR 前后端数据交互</div>
        <div class="about-info-content">JSEncrypt —— 传输时重点数据加密</div>
      </div>
    </div>

    <div class="about">
      <div class="about-title">开发者信息</div>
      <div class="about-info">
        <div class="about-info-label">开发者</div>
        <div class="about-info-content">Ruixe | Jihao Li</div>
      </div>
      <div class="about-info">
        <div class="about-info-label">联系方式</div>
        <div class="about-info-content">手机 —— 18616871724 | 18139616598</div>
        <div class="about-info-content">邮箱 —— Ruixe1569898391@outlook.com | 3207456815@qq.com</div>
      </div>
    </div>

    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>

  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About'

})
</script>

<style lang="scss" scoped>
.container {
  margin: 20px auto 70px auto;
  width: 900px;
  font-size: 18px;
  color: #2c3e50;
}

@media screen and (max-width: 960px) {
  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
  }
}

@media screen and (max-width: 700px) {
  .container {
    margin-top: 10px;
  }
}

.about {
  width: 100%;
  margin-top: 30px;

  &:first-child {
    margin-top: 0;
  }

  .about-title {
    color: #409EFF;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #DCDFE6;
  }

  .about-info {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    margin-top: 20px;

    &-label {
      text-align: left;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &-content {
      text-align: left;
      font-size: 16px;
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
