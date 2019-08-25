<template>
  <div class="m-iselect">
    <!-- 级联选择器 -->
    <span class="name">按省份选择：</span>
    <el-select placeholder="省份" v-model="pvalue">
      <el-option
        :key="item.value"
        :label="item.label"
        :value="item.value"
        v-for="item in province"
      />
    </el-select>

    <el-select
      :disabled="!city || !city.length"
      placeholder="城市"
      style="margin-left: 20px;"
      v-model="cvalue"
    >
      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in city" />
    </el-select>

    <!-- 带输入建议 -->
    <span class="name" style="margin-left: 100px;">直接搜索：</span>
    <el-autocomplete
      :fetch-suggestions="querySearchAsync"
      @select="handleSelect"
      placeholder="请输入城市中文或拼音"
      v-model="input"
    />
  </div>
</template>

<script>
import _Debounce from 'lodash/debounce'

export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: [],
    }
  },
  watch: {
    // 当省份变更时，城市也要重新获取
    async pvalue(newPvalue) {
      const { status, data } = await this.$axios.get(`/geo/province/${newPvalue}`)

      if (status === 200) {
        this.city = data.data.map(item => {
          return {
            value: item.id,
            label: ['市辖区', '省直辖县级行政区划'].includes(item.name) ? item.province : item.name,
          }
        })
        this.cvalue = ''
      }
    },
  },
  mounted() {
    this.initProvinces()
  },
  methods: {
    async initProvinces() {
      const { status, data } = await this.$axios.get('/geo/province')

      if (status === 200) {
        this.province = data.data.map(item => {
          return {
            value: item.id,
            label: item.value,
          }
        })
      }
    },
    querySearchAsync: _Debounce(async function(query, cb) {
      if (this.cities.length) {
        cb(this.cities.filter(item => item.value.includes(query)))
        return
      }

      const { status, data } = await this.$axios.get('/geo/city')

      if (status === 200) {
        this.cities = data.data.map(item => {
          return {
            value: item.name,
          }
        })
        cb(this.cities.filter(item => item.value.includes(query)))
      }
    }, 200),
    handleSelect(item) {
      // item.value
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/changeCity/iselect.scss';
</style>
