<template>
  <dl class="s-item">
    <dt>
      <img :src="meta.img" alt="商品图片" />
    </dt>

    <dd>
      <h3>
        <nuxt-link
          :to="{ path: 'detail', query: { keyword: meta.name, type: meta.module }}"
        >{{ meta.name }}</nuxt-link>
      </h3>
      <el-rate
        :colors="['#ff9900', '#ff9900', '#FF9900']"
        disabled
        v-model="meta.rate"
      />
      <span class="s-item-comment" v-if="meta.rate>4">很好</span>
      <span class="s-item-comment" v-else-if="meta.rate>3">一般</span>
      <span class="s-item-comment" v-else>很差</span>
      <span class="s-item-value">{{ meta.rate }}分</span>
      <span class="s-item-comment-total">{{ meta.comment }}人评论</span>
      <p>
        <span class="s-item-type">{{ meta.type }}</span>
        <span class="s-item-addr">{{ meta.addr }}</span>
      </p>
      <p>
        <em class="s-item-price">￥{{ meta.price }}起</em>
        <b>{{ meta.status }}</b>
      </p>

      <ul>
        <!-- <li>
          <span class="detail-type">门票</span>{{meta.ticket}}
        </li>
        <li>
          <span class="detail-type">跟团</span>{{meta.group}}
        </li>-->
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>
          {{ meta.scene }}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
