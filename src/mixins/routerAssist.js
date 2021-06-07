import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    /**
     * 导航至目标路径
     * @param {import('vue-router').RouteLocationRaw} target - 目标路径
     */
    navigateTo (target) {
      this.$router.push(target)
    },

    /**
     * 重定向至目标路径
     * @param {import('vue-router').RouteLocationRaw} target - 目标路径
     */
    redirectTo (target) {
      this.$router.replace(target)
    }
  }
})
