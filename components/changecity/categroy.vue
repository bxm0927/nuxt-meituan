<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd :key="item" v-for="item in list">
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>

    <dl :key="item.title" class="m-categroy-section" v-for="item in pinyinCityList">
      <dt :id="'city-' + item.title">{{ item.title }}</dt>
      <dd>
        <span :key="city" v-for="city in item.city">{{ city }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pinyin from 'js-pinyin'

export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      pinyinCityList: [],
    }
  },
  mounted() {
    this.initCitiesByPinyin()
  },
  methods: {
    async initCitiesByPinyin() {
      const { status, data } = await this.$axios.get('/geo/city')

      if (status === 200) {
        const pinyinCityMap = {}

        data.data.forEach(item => {
          const initial = pinyin
            .getFullChars(item.name) // BeiJingShi
            .toLocaleLowerCase() // beijingshi
            .slice(0, 1) // b
          const charCode = initial.charCodeAt(0) // 98

          if (charCode > 96 && charCode < 123) {
            if (!pinyinCityMap[initial]) {
              pinyinCityMap[initial] = []
            }
            pinyinCityMap[initial].push(item.name)
          }
        })

        Object.entries(pinyinCityMap).forEach(([k, v]) => {
          this.pinyinCityList.push({
            title: k.toUpperCase(),
            city: v,
          })
        })

        this.pinyinCityList.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/changecity/categroy.scss';
</style>
