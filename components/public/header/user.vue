<template>
  <div class="m-user">
    <template v-if="username">
      欢迎您，
      <span class="username">{{ username }}</span>
      <a @click="exit" class="exit" href="javascript:void(0)">[退出]</a>
    </template>

    <template v-else>
      <nuxt-link class="login" to="/login">立即登录</nuxt-link>
      <nuxt-link class="register" to="/register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
const HOME_PAGE = '/'

export default {
  data() {
    return {
      username: '',
    }
  },
  mounted() {
    this.getAccountInfo()
  },
  methods: {
    async getAccountInfo() {
      const { status, data } = await this.$axios.post('/users/getAccountInfo')

      if (status === 200 && data && data.code === 0) {
        this.username = decodeURIComponent(data.data.username)
      }
    },
    async exit() {
      const { status, data } = await this.$axios.post('/users/exit')

      if (status === 200 && data && data.code === 0) {
        location.href = HOME_PAGE
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.exit {
  margin-left: 8px;
}
</style>
