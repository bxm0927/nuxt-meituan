<template>
  <div class="page-cart">
    <el-row>
      <el-col :span="24" class="m-cart" v-if="cart.length">
        <list :cart-data="cart" />

        <p>
          应付金额：
          <em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button @click="submit" type="primary">提交订单</el-button>
        </div>
      </el-col>

      <el-col class="empty" v-else>购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/cart/list.vue'

export default {
  components: {
    List,
  },
  data() {
    return {
      cart: [],
    }
  },
  computed: {
    total() {
      let total = 0
      this.cart.forEach(item => {
        total += item.price * item.count
      })
      return total
    },
  },
  async asyncData({ query, app }) {
    const { id } = query
    const { status, data } = await app.$axios.post('/cart/getCart', { id })

    if (status === 200 && data.code === 0) {
      return {
        cartNo: id,
        cart: [
          {
            name: data.data.name,
            price: data.data.price,
            count: 1,
          },
        ],
      }
    }
  },
  methods: {
    async submit() {
      const {
        status,
        data: { code, id },
      } = await this.$axios.post('/order/createOrder', {
        count: this.cart[0].count,
        price: this.cart[0].price,
        id: this.cartNo,
      })

      if (status === 200 && code === 0) {
        this.$alert(`恭喜您，已成功下单，订单号:${id}`, '下单成功', {
          confirmButtonText: '确定',
          callback: action => {
            location.href = '/order'
          },
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/cart/index.scss';
</style>
