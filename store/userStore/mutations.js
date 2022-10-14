import {
  UPDATE_CURRENT_EMAIL,
  UPDATE_LOGGED_USER,
  CLEAR_USER,
} from './mutationTypes'
import { defaultUser } from '.'

export default {
  [UPDATE_CURRENT_EMAIL](state, newEmail) {
    state.currentEmail = newEmail
  },
  [UPDATE_LOGGED_USER](state, user) {
    state.loggedUser = user
  },
  [CLEAR_USER](state) {
    state.loggedUser = defaultUser
  },
}
