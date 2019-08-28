<template>
  <div class="m-products-list">
    <dl>
      <dd
        :class="[item.name,item.acitve ? 's-nav-active' : '']"
        :key="item.name"
        @click="navSelect"
        v-for="item in nav"
      >{{ item.txt }}</dd>
    </dl>

    <ul>
      <ProductItem :key="idx" :meta="item" v-for="(item, idx) in list" />
    </ul>
  </div>
</template>

<script>
import ProductItem from './product.vue'

export default {
  components: {
    ProductItem,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      nav: [
        { name: 's-default', txt: '智能排序', acitve: true },
        { name: 's-price', txt: '价格最低', active: false },
        { name: 's-visit', txt: '人气最高', active: false },
        { name: 's-comment', txt: '评价最高', active: false },
      ],
    }
  },
  async asyncData({ app }) {
    const { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect() {
      // console.log('select')
    },
  },
}
</script>
