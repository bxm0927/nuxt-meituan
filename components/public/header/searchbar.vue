<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img alt="美团" src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" />
      </el-col>

      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            @blur="blur"
            @focus="focus"
            @input="input"
            placeholder="搜索商家或地点"
            v-model="search"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>

          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <!-- <dd :key="index" v-for="(item, index) in $store.state.home.hotPlace.slice(0, 5)"> -->
            <dd :key="index" v-for="(item, index) in hotPlace">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item }}</a>
            </dd>
          </dl>

          <dl class="searchList" v-if="isSearchList">
            <dd :key="index" v-for="(item, index) in searchList">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item }}</a>
            </dd>
          </dl>
        </div>

        <p class="suggest">
          <!-- v-for="(item, index) in $store.state.home.hotPlace.slice(0, 5)" -->
          <a
            :href="'/products?keyword='+encodeURIComponent(item.name)"
            :key="index"
            v-for="(item,index) in hotPlace"
          >{{ item }}</a>
        </p>

        <ul class="nav">
          <li>
            <nuxt-link class="takeout" to="/">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link class="movie" to="/">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link class="hotel" to="/">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link class="apartment" to="/">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link class="business" to="/">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>

      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _Debounce from 'lodash/debounce'

export default {
  data() {
    return {
      isFocus: false,
      search: '',
      hotPlace: ['天安门1', '天安门2', '天安门3', '天安门4'],
      searchList: ['火锅', '火锅', '火锅', '火锅', '火锅'],
    }
  },
  computed: {
    isHotPlace() {
      // 聚焦状态下，没输入内容
      return this.isFocus && !this.search
    },
    isSearchList() {
      // 聚焦状态下，输入了内容
      return this.isFocus && this.search
    },
  },
  methods: {
    blur() {
      // 防止点击搜索结果先触发 blur，后触发 click
      setTimeout(() => {
        this.isFocus = false
      }, 200)
    },
    focus() {
      this.isFocus = true
    },
    input: _Debounce(async () => {
      const city = this.$store.state.geo.position.city.replace('市', '')
      this.searchList = []

      const { data } = await this.$axios.get('/search/top', {
        params: {
          input: this.search,
          city,
        },
      })

      this.searchList = data.top.slice(0, 10)
    }, 300),
  },
}
</script>

<style lang="scss" scoped>
</style>
