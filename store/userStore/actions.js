import {
  CLEAR_ACCESS_TOKEN,
  CLEAR_REFRESH_TOKEN,
} from '../tokenStore/mutationTypes'
import {
  CLEAR_USER,
  UPDATE_CURRENT_EMAIL,
  UPDATE_LOGGED_USER,
} from './mutationTypes'

export default {
  async submitRegister({ commit }, userData) {
    try {
      const response = await this.$publicAxios.post(
        `${this.$urls.ACCOUNT_REGISTER}`,
        userData
      )
      commit(UPDATE_CURRENT_EMAIL, userData.email)
      return response
    } catch (err) {
      console.error(err)
    }
  },
  async performLogin({ dispatch }, user) {
    try {
      await dispatch('tokenStore/getTokens', user, { root: true })
      return await dispatch('getCurrentUser')
    } catch (err) {
      console.error(err)
    }
  },
  async getCurrentUser({ commit }) {
    try {
      const response = await this.$axios.get(this.$urls.GET_CURRENT_USER)
      commit(UPDATE_LOGGED_USER, response.data)
      return response
    } catch (e) {
      console.error('There was a problem getting the current user --> ', e)
    }
  },
  logout({ commit }) {
    commit(CLEAR_USER)
    commit(`tokenStore/${CLEAR_ACCESS_TOKEN}`, {}, { root: true })
    commit(`tokenStore/${CLEAR_REFRESH_TOKEN}`, {}, { root: true })
  },
  async uploadImage({ commit }, image) {
    const formData = new FormData()
    formData.append('file', image)
    try {
      const response = await this.$axios.put(
        `${this.$urls.UPLOAD_USER_IMAGE}${image.name}/`,
        formData
      )
      commit(UPDATE_LOGGED_USER, response.data)
      return response
    } catch (e) {
      console.error('There was a problem uploading the user image -->', e)
    }
  },
}
