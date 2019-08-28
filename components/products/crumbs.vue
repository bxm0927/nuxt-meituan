<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">{{ position.shortCity }}美团</el-breadcrumb-item>
      <el-breadcrumb-item>{{ position.shortCity }}{{ decodeKeyword }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    keyword: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['position']),
    decodeKeyword() {
      return decodeURIComponent(this.keyword)
    },
  },
}
</script>
