<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{ cityName }}
    <nuxt-link class="changeCity" to="/changecity">切换城市</nuxt-link>[香河 廊坊 天津]
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['position']),
    cityName() {
      return this.position ? this.position.city : ''
    },
  },
}
</script>
