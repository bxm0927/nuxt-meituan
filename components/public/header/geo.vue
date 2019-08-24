<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{ cityName }}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>[香河 廊坊 天津]
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: null, // 地理定位
    }
  },
  computed: {
    cityName() {
      return this.position ? this.position.city : ''
    },
  },
  mounted() {
    this.getPosition()
  },
  methods: {
    async getPosition() {
      const { status, data } = await this.$axios.get('/geo/getPosition')

      if (status === 200 && data && data.code === 0) {
        this.position = data.data
      }
    },
  },
}
</script>
