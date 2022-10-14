import mutations from './mutations'
import actions from './actions'

const state = () => ({
  movementList: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})

export default {
  state,
  mutations,
  actions,
}
