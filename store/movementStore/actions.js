import { UPDATE_MOVEMENT_LIST } from './mutationTypes'

export default {
  async getMovements({ commit }) {
    try {
      const response = await this.$axios.get(this.$urls.MOVEMENTS)
      if (response && response.status === 200) {
        commit(UPDATE_MOVEMENT_LIST, response.data)
      }
    } catch (e) {
      console.error('There was a problem fetching the movements --> ', e)
    }
  },
}
