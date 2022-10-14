import {
  UPDATE_ACCESS_TOKEN,
  UPDATE_REFRESH_TOKEN,
  CLEAR_ACCESS_TOKEN,
  CLEAR_REFRESH_TOKEN,
} from './mutationTypes'

export default {
  [UPDATE_ACCESS_TOKEN](state, accessToken) {
    state.accessToken = accessToken
    localStorage.setItem('access', accessToken)
  },
  [UPDATE_REFRESH_TOKEN](state, refreshToken) {
    state.refreshToken = refreshToken
    localStorage.setItem('refresh', refreshToken)
  },
  [CLEAR_ACCESS_TOKEN](state) {
    state.accessToken = ''
    localStorage.removeItem('access')
  },
  [CLEAR_REFRESH_TOKEN](state) {
    state.refreshToken = ''
    localStorage.removeItem('refresh')
  },
}
