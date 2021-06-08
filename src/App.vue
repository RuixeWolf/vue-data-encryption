<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import routerAssist from '@/mixins/routerAssist'

export default defineComponent({
  name: 'App',

  mixins: [
    routerAssist
  ],

  computed: {
    ...mapState('user', ['logged'])

  },

  created () {
    // 在 App.vue 的 created 完成状态判断并直接跳转至目标页面，
    // 增强用户体验，防止其它页面的内容一闪而过

    // 未登录则转至登录页面
    if (!this.logged) {
      this.redirectTo({ name: 'userLogin' })
    }
  }

})
</script>

<style lang="scss">
  /* App public style */

  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
