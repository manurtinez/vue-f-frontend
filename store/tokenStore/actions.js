import {
  UPDATE_ACCESS_TOKEN,
  UPDATE_REFRESH_TOKEN,
} from '~/store/tokenStore/mutationTypes'

export default {
  async getTokens({ commit }, user) {
    try {
      const response = await this.$publicAxios.post(
        this.$urls.ACCESS_TOKEN,
        user
      )
      commit(UPDATE_ACCESS_TOKEN, response.data.access)
      commit(UPDATE_REFRESH_TOKEN, response.data.refresh)
    } catch (e) {
      console.error(e)
    }
  },
  getRefresh({ commit }, refreshToken) {
    return this.$publicAxios
      .post(this.$urls.REFRESH_TOKEN, {
        refresh: refreshToken,
      })
      .then((res) => {
        commit(UPDATE_ACCESS_TOKEN, res.data.access)
        return res.data.access
      })
  },
}
