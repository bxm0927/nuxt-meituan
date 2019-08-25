<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd :key="item.id" v-for="item in list">{{ item.name === '市辖区' ? item.province : item.name }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  async mounted() {
    const { status, data } = await this.$axios.get('/geo/hotCity')

    if (status === 200) {
      this.list = data.data || []
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/changeCity/hot.scss';
</style>
