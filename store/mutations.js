import {
  SET_VALIDATION_PENDING,
  SET_VALIDATION_SUCCESS,
  SET_VALIDATION_FAILED,
} from './mutationTypes'

export default {
  [SET_VALIDATION_PENDING](state) {
    state.validationColor = 'grey lighten-1'
  },
  [SET_VALIDATION_SUCCESS](state) {
    state.validationColor = 'green lighten-4'
  },
  [SET_VALIDATION_FAILED](state) {
    state.validationColor = 'red lighten-4'
  },
}
