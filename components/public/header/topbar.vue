<template>
  <el-row class="m-header">
    <el-col :span="5">
      <MyGeo />
    </el-col>

    <el-col :span="5">
      <MyUser />
    </el-col>

    <el-col :span="14">
      <MyNav />
    </el-col>
  </el-row>
</template>

<script>
import MyGeo from './geo.vue'
import MyUser from './user.vue'
import MyNav from './nav.vue'

export default {
  components: {
    MyGeo,
    MyUser,
    MyNav,
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/public/layout.scss';
</style>
