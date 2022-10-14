import mutations from './mutations'
import actions from './actions'

const state = () => ({
  linkList: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  requestCancelToken: null,
})

export default {
  state,
  mutations,
  actions,
}
