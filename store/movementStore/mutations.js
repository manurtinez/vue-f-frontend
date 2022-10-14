import { UPDATE_MOVEMENT_LIST, CLEAR_MOVEMENT_LIST } from './mutationTypes'

export default {
  [UPDATE_MOVEMENT_LIST](state, newData) {
    const updatedResults = [...state.movementList.results, ...newData.results]
    state.movementList = { ...newData, results: updatedResults }
  },
  [CLEAR_MOVEMENT_LIST](state) {
    state.movementList = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }
  },
}
