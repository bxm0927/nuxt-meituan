<template>
  <div class="page-login">
    <div class="login-header">
      <a class="logo" href="/" />
    </div>

    <div class="login-panel">
      <div class="banner">
        <img
          alt="美团网"
          height="370"
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
        />
      </div>

      <div class="form">
        <h4 class="tips" v-if="error">
          <i />
          {{ error }}
        </h4>

        <p>
          <span>账号登录</span>
        </p>
        <el-input prefix-icon="profile" v-model="username" />
        <el-input prefix-icon="password" type="password" v-model="password" />

        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>

        <el-button @click="login" class="btn-login" size="mini" type="success">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
const HOME_PAGE = '/'

export default {
  layout: 'blank',
  data: () => {
    return {
      checked: '',
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      const { status, data } = await this.$axios.post('/users/signin', {
        username: window.encodeURIComponent(this.username),
        password: CryptoJS.MD5(this.password).toString(),
      })

      if (status === 200) {
        if (data && data.code === 0) {
          location.href = HOME_PAGE
        } else {
          this.error = data.msg
        }
      } else {
        this.error = '服务器出错，请稍后再试！'
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/login/index.scss';
</style>
