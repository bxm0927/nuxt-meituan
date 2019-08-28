<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>
        {{ name }}
        <i class="el-icon-arrow-down el-icon--right" />
      </dt>

      <dd>
        <h3>{{ name }}</h3>
        <span :key="idx" v-for="(item,idx) in list">{{ item }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
