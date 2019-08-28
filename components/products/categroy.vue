<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd :key="idx" v-for="(item, idx) in types">
        <iselect :list="item.module" :name="item.type" />
      </dd>
    </dl>

    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd :key="idx" v-for="(item, idx) in areas">
        <iselect :list="item.module" :name="item.type" />
      </dd>
    </dl>
  </div>
</template>

<script>
import iselect from './iselect.vue'

export default {
  components: {
    iselect,
  },
  props: {
    types: {
      type: Array,
      default() {
        return []
      },
    },
    areas: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="scss">
.m-product-categroy {
  padding: 15px 20px 0;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.classic {
  display: flex;
  padding-bottom: 10px;
  > dt {
    width: 80px;
    &:nth-child(2) {
      border-radius: 100px;
      background: #13d1be;
      color: #fff;
      height: 22px;
      line-height: 22px;
      width: 40px;
      box-sizing: border-box;
      margin-right: 40px;
      text-align: center;
    }
  }
  &:nth-child(1) {
    dd {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
