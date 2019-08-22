<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a class="site-logo" href="/" />

        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button size="small" type="primary">登录</el-button>
          </a>
        </span>
      </header>
    </article>

    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item label="昵称" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button :disabled="disabledSendMsg" @click="sendMsg" round size="mini">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-input maxlength="4" v-model="ruleForm.code" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>

        <el-form-item label="确认密码" prop="verifyPassword">
          <el-input type="password" v-model="ruleForm.verifyPassword" />
        </el-form-item>

        <el-form-item>
          <el-button @click="register" type="primary">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>

        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
const LOGIN_PAGE = '/login'

export default {
  layout: 'blank',
  data() {
    return {
      codeTimer: null,
      disabledSendMsg: false,
      statusMsg: '',
      error: '',
      ruleForm: {
        username: '',
        email: '',
        code: '',
        password: '',
        verifyPassword: '',
      },
      rules: {
        username: [{ required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '创建密码', trigger: 'blur' }],
        verifyPassword: [
          { required: true, message: '确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 发送验证码
    async sendMsg() {
      if (this.codeTimer) return

      let usernamePass
      let emailPass

      this.$refs.ruleForm.validateField('username', valid => {
        usernamePass = valid
      })
      this.$refs.ruleForm.validateField('email', valid => {
        emailPass = valid
      })

      this.statusMsg = ''
      if (usernamePass || emailPass) return

      const { username, email } = this.ruleForm
      const { data } = await this.$axios.post('/users/verify', {
        username: encodeURIComponent(username),
        email,
      })

      if (data && data.code === 0) {
        let count = 60
        this.disabledSendMsg = true
        this.statusMsg = `验证码已发送，剩余${count--}秒`

        this.codeTimer = setInterval(() => {
          this.statusMsg = `验证码已发送，剩余${count--}秒`
          if (count === 0) {
            clearInterval(this.codeTimer)
            this.codeTimer = null
            this.statusMsg = ''
            this.disabledSendMsg = false
          }
        }, 1000)
      } else {
        this.statusMsg = data.msg
      }
    },
    // 注册
    register() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return

        const { username, password, email, code } = this.ruleForm

        // 为了防止中文编码，这里要对中文进行编码处理
        // 安全起见，数据库尽量不要存储明文密码
        const { status, data } = await this.$axios.post('/users/signup', {
          username: encodeURIComponent(username),
          password: CryptoJS.MD5(password).toString(),
          email,
          code,
        })

        if (status === 200) {
          if (data && data.code === 0) {
            location.href = LOGIN_PAGE
          } else {
            this.error = data.msg
          }
        } else {
          this.error = '服务器出错，请稍后再试！'
        }

        setTimeout(() => {
          this.error = ''
        }, 10000)
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/register/index.scss';
</style>
