import {
  MODIFY_LINK,
  UPDATE_LINK_LIST,
  CLEAR_LINK_LIST,
  UPDATE_CANCEL_TOKEN,
} from './mutationTypes'

export default {
  [UPDATE_LINK_LIST](state, newData) {
    const updatedResults = [...state.linkList.results, ...newData.results]
    state.linkList = { ...newData, results: updatedResults }
  },
  [MODIFY_LINK](state, newLink) {
    const index = state.linkList.results.findIndex(
      (link) => link.link === newLink.link
    )
    // Insert new object in existing results array
    state.linkList.results = [
      ...state.linkList.results.slice(0, index),
      newLink,
      ...state.linkList.results.slice(index + 1),
    ]
  },
  [CLEAR_LINK_LIST](state) {
    state.linkList = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }
  },
  [UPDATE_CANCEL_TOKEN](state, cancelToken) {
    state.requestCancelToken = cancelToken
  },
}
