<template>
  <div class="m-detail-list">
    <ul>
      <li>{{ count }}款套餐</li>
      <item :key="idx" :meta="item" v-for="(item, idx) in list" />
    </ul>
  </div>
</template>

<script>
import Item from './item.vue'

export default {
  components: {
    Item,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    count() {
      return this.list.filter(item => item.photos.length).length
    },
  },
}
</script>
