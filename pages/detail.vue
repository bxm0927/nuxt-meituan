<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <summa :meta="product" />
      </el-col>
    </el-row>

    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>

    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <list :list="list" v-if="login" />
        <login v-else />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue'
import Summa from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
import Login from '@/components/detail/login.vue'

export default {
  components: {
    Crumbs,
    Summa,
    List,
    Login,
  },
  computed: {
    canOrder() {
      return this.list.filter(item => item.photos.length).length
    },
  },
  async asyncData({ query, app, store }) {
    const { keyword, type } = query
    const { status, data } = await app.$axios.get('/search/products', {
      params: {
        keyword,
        type,
        city: store.state.position.shortCity,
      },
    })

    if (status !== 200) {
      return { keyword, product: {}, type, list: [], login: false }
    }

    const { product, more, login } = data.data
    return { keyword, product, type, list: more, login }
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/detail/index.scss';
</style>
