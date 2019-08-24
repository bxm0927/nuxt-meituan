<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <MyMenu />
      </el-col>

      <el-col :span="19">
        <MyLife />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <MyArtistic />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyMenu from '@/components/index/menu.vue'
import MyLife from '@/components/index/life.vue'
import MyArtistic from '@/components/index/artistic.vue'

export default {
  components: {
    MyMenu,
    MyLife,
    MyArtistic,
  },
  async fetch({ store, params }) {
    await store.dispatch('modules/pageIndex/getMenu')
    // await store.dispatch('modules/pageIndex/getHotPlace')
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/index/index.scss';
</style>
