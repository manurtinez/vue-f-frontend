import {
  MODIFY_LINK,
  UPDATE_LINK_LIST,
  UPDATE_CANCEL_TOKEN,
} from './mutationTypes'

export default {
  /**
   * Get the list of payment link. Has pagination and filters. Parameters:
   * @param VuexParams {{ commit: Function, state: object }} The vuex received params
   * @param options {{ limit: Number, offset: Number, status: 'ACT' | 'PAI' | 'CAN' | '', expired: Boolean, invoice: String | Number }}
   * An object to construct the filters and pagination if needed
   */
  async getLinks({ commit, state }, options = {}) {
    let url =
      state.linkList.next ||
      this.$urls.PAYMENT_LINK +
        `?limit=${options.limit}` +
        `&offset=${options.offset}` +
        '&ordering=-created_at' // Order by DESC created date, can change in future
    if (options.status) url += `&status=${options.status}`
    if (options.expired || options.status === 'ACT')
      url += `&expired=${options.expired}`
    if (options.invoice) url += `&invoice=${options.invoice}`

    // Get cancel token from store. If it exists, use it to cancel previous request
    const cancelToken = state.requestCancelToken
    if (cancelToken) cancelToken.cancel()

    // Create a new one, push it and use it in the request.
    // Same previous token could be used, however it caused unreliable cancels, creating a new one
    // makes sure it always cancels correctly
    const newCancelToken = this.$axios.CancelToken.source()
    commit(UPDATE_CANCEL_TOKEN, newCancelToken)

    const response = await this.$axios
      .get(url, {
        cancelToken: newCancelToken.token,
      })
      .catch((error) => {
        if (this.$axios.isCancel(error)) {
          console.log('The request was cancelled')
        } else {
          console.error(
            'There was a problem fetching the payment links --> ',
            error
          )
        }
      })
    if (response && response.status === 200) {
      // Remove leftover cancel token
      commit(UPDATE_CANCEL_TOKEN, null)
      commit(UPDATE_LINK_LIST, response.data)
    }
  },
  async modifyLink({ commit }, newLink) {
    try {
      const response = await this.$axios.patch(
        `${this.$urls.PAYMENT_LINK}${newLink.link}/`,
        newLink
      )
      if (response && response.status === 200) {
        commit(MODIFY_LINK, response.data)
        return true
      } else {
        throw new Error('There was a problem modifying the link -->', response)
      }
    } catch (e) {
      console.error(e)
      return false
    }
  },
}
