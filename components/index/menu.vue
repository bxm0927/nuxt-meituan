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
export default {
  data() {
    return {
      timer: null,
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [{ title: '美食', child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐'] }],
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [{ title: '外卖', child: ['美团外卖'] }],
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            { title: '酒店星级1', child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星'] },
            { title: '酒店星级2', child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星'] },
            { title: '酒店星级3', child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星'] },
            { title: '酒店星级4', child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星'] },
          ],
        },
      ],
    }
  },
  computed: {
    curDetail() {
      return this.menu.filter(item => item.type === this.kind)[0]
      // return this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
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
