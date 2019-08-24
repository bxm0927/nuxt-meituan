/*
 * Vuex Store
 * 什么样的数据建议放到 Vuex Store 中集中管理：
 *    1. 多个视图依赖的同一个状态
 *    2. 来自不同视图的行为需要变更同一个状态
 *    3. 多层嵌套的组件、兄弟组件间的状态传递
 * @Author: xiaoming.bai
 * @Date: 2019-08-24 19:03:43
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-24 23:24:16
 */

export const state = () => ({
  test: 'hello root store!',
})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, context) {},
}
