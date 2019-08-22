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
            { title: '酒店星级1', child: ['经济型1', '舒适/三星1', '高档/四星1', '豪华/五星1'] },
            { title: '酒店星级2', child: ['经济型2', '舒适/三星2', '高档/四星2', '豪华/五星2'] },
            { title: '酒店星级3', child: ['经济型3', '舒适/三星3', '高档/四星3', '豪华/五星3'] },
            { title: '酒店星级4', child: ['经济型4', '舒适/三星4', '高档/四星4', '豪华/五星4'] },
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
