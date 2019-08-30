<template>
  <li class="m-detail-item" v-if="meta.photos.length">
    <dl class="section">
      <dd>
        <img :alt="meta.photos[0].title" :src="meta.photos[0].url" />
      </dd>

      <dd>
        <h4>{{ meta.name }}</h4>
        <p>
          <span
            v-if="meta.biz_ext && meta.biz_ext.ticket_ordering"
          >剩余：{{ Number(meta.biz_ext.ticket_ordering) }}</span>
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span class="price">{{ Number(meta.biz_ext.cost) }}</span>
          <sub>门店价{{ Number(meta.biz_ext.cost) }}</sub>
        </p>
      </dd>

      <dd>
        <el-button @click="createCart" round type="warning">立即抢购</el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async createCart() {
      const randomId = Math.random()
        .toString()
        .slice(3, 9)
      const { status, data } = await this.$axios.post('/cart/create', {
        id: randomId,
        detail: {
          name: this.meta.name,
          price: this.meta.biz_ext.cost,
          imgs: this.meta.photos,
        },
      })

      if (status === 200 && data.code === 0) {
        window.location.href = `/cart?id=${data.data}`
      }
    },
  },
}
</script>
