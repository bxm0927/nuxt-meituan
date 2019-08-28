export const state = () => ({
  test: 'hello page index store!',

  menu: [], // 导航菜单
})

export const mutations = {
  setMenu(state, payload) {
    state.menu = payload
  },
}

export const actions = {
  async getMenu({ commit }) {
    const { status, data } = await this.$axios.get('/geo/menu')

    if (status === 200 && data.code === 0) {
      commit('setMenu', data.data || [])
    }
  },
}
