<template>
  <div class="m-menu">
    <dl @mouseleave="mouseleave" class="nav">
      <dt>全部分类</dt>

      <dd :key="index" @mouseenter="enter" v-for="(item, index) in menu">
        <i :class="item.type" />
        {{ item.name }}
        <span class="arrow" />
      </dd>
    </dl>

    <div @mouseenter="sover" @mouseleave="sout" class="detail" v-if="kind">
      <template v-for="(item, index) in curDetail.child">
        <h4 :key="index">{{ item.title }}</h4>
        <span :key="v" v-for="v in item.child">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      timer: null,
      kind: '',
    }
  },
  computed: {
    ...mapState('modules/pageIndex', ['menu']),
    curDetail() {
      return this.menu && this.menu.filter(item => item.type === this.kind)[0]
    },
  },
  methods: {
    mouseleave() {
      this.timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    enter(e) {
      this.kind = e.target.querySelector('i').className
    },
    sover() {
      clearTimeout(this.timer)
    },
    sout() {
      this.kind = ''
    },
  },
}
</script>
