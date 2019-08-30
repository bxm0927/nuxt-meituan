<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">{{ shortCity }}美团</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">{{ shortCity }}{{ type }}</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">{{ shortCity }}{{ decodeURIComponent(keyword) }}</a>
      </el-breadcrumb-item>
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
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['position']),
    shortCity() {
      return this.position.shortCity
    },
  },
}
</script>
