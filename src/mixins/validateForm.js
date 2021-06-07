import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    /**
     * 验证表单数据
     * @param {string} refName - 表单 ref 名称
     * @returns {Promise<boolean>} - 验证结果
     */
    validateForm (refName) {
      const form = this.$refs[refName]
      return new Promise(resolve => {
        form.validate(isValid => {
          resolve(isValid)
        })
      })
    }
  }
})
