export const state = () => ({
  test: 'hello page index store!',

  menu: [], // 导航菜单
  hotPlace: [], // 热门搜索
})

export const mutations = {
  setMenu(state, payload) {
    state.menu = payload
  },
  setHotPlace(state, payload) {
    state.hotPlace = payload
  },
}

export const actions = {
  async getMenu({ commit }) {
    const { status, data } = await this.$axios.get('/geo/menu')

    if (status === 200 && data.code === 0) {
      commit('setMenu', data.data || [])
    }
  },
  async getHotPlace({ commit, rootState }) {
    const { status, data } = await this.$axios.get('/search/hotPlace', {
      params: {
        city: rootState.position.shortCity,
      },
    })

    if (status === 200 && data.code === 0) {
      commit('setHotPlace', data.data || [])
    }
  },
}
