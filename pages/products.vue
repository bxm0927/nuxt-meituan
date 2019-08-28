<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumbs :keyword="keyword" />
      <Categroy :areas="areas" :types="types" />
      <List :list="list" />
    </el-col>

    <el-col :span="5">
      <Amap :height="290" :point="point" :width="230" v-if="point.length" />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/products/map.vue'

export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap,
  },
  data() {
    return {
      keyword: '',
      list: [],
      types: [],
      areas: [],
      point: [],
    }
  },
  async asyncData({ query, store, app }) {
    const { keyword } = query
    const { city } = store.state.position

    const result = await Promise.all([
      app.$axios.get('/search/resultsByKeywords', {
        params: { keyword, city },
      }),
      app.$axios.get('/category/crumbs', {
        params: { city },
      }),
    ])

    const keywordsData = result[0].data
    const categoryData = result[1].data
    const { pois } = keywordsData.data
    const { types, areas } = categoryData.data

    if (keywordsData.code !== 0 || categoryData.code !== 0) return {}

    return {
      keyword,
      areas: areas.filter(item => item.type !== '').slice(0, 5),
      types: types.filter(item => item.type !== '').slice(0, 5),
      point: (pois.find(item => item.location).location || '').split(','),
      list: pois
        .filter(item => item.photos.length) // 过滤掉没有图片的项目
        .map(item => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random() * 10000), // mock
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0],
          }
        }),
    }
  },
  async fetch({ store }) {
    await Promise.all([store.dispatch('getHotPlace')])
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/products/index.scss';
</style>
