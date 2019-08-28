<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <a href="/">
          <img
            alt="美团"
            src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          />
        </a>
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
            <dd :key="index" v-for="(item, index) in hotPlace.slice(0, 5)">
              <a
                :href="'/products?keyword='+encodeURIComponent(item.name)"
              >{{ item.name }}</a>
            </dd>
          </dl>

          <dl class="searchList" v-if="isSearchList">
            <dd :key="index" v-for="(item, index) in searchList">
              <a
                :href="'/products?keyword='+encodeURIComponent(item.name)"
              >{{ item.name }}</a>
            </dd>
          </dl>
        </div>

        <p class="suggest">
          <a
            :href="'/products?keyword='+encodeURIComponent(item.name)"
            :key="index"
            v-for="(item, index) in hotPlace"
          >{{ item.name }}</a>
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
import { mapState } from 'vuex'
import _Debounce from 'lodash/debounce'

export default {
  data() {
    return {
      isFocus: false,
      search: '',
      searchList: [],
    }
  },
  computed: {
    ...mapState(['position', 'hotPlace']),
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
    input: _Debounce(async function() {
      const { status, data } = await this.$axios.get('/search/top', {
        params: {
          input: this.search,
          city: this.position.shortCity,
        },
      })

      if (status === 200) {
        this.searchList = data.data.slice(0, 10)
      }
    }, 200),
  },
}
</script>
