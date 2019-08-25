/*
 * Vuex Store
 * 什么样的数据建议放到 Vuex Store 中集中管理：
 *    1. 多个视图依赖的同一个状态
 *    2. 来自不同视图的行为需要变更同一个状态
 *    3. 多层嵌套的组件、兄弟组件间的状态传递
 * @Author: xiaoming.bai
 * @Date: 2019-08-24 19:03:43
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-25 13:45:49
 */

export const state = () => ({
  test: 'hello root store!',
  position: null, // 地理定位
})

export const mutations = {
  setPosition(state, payload) {
    state.position = payload
  },
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, context) {
    await dispatch('getPosition')
  },
  async getPosition({ commit }) {
    const { status, data } = await this.$axios.get('/geo/getPosition')

    if (status === 200 && data && data.code === 0) {
      const { province, city, ip } = data.data
      const has = v => v && !Array.isArray(v)

      commit('setPosition', {
        province: has(province) ? province : '上海市',
        city: has(city) ? city : '上海市',
        shortCity: has(city) ? city.replace('市', '') : '上海',
        ip,
      })
    }
  },
}
