import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export const defaultUser = {
  fullname: '',
  email: '',
  first_name: '',
  last_name: '',
  profile_image_url: '',
  id: null,
  username: '',
  dni: null,
  phone: null,
  gender_display: null,
  birth_date: null,
  nationality: '',
  balance: '0.0',
}

const state = () => ({
  currentEmail: '',
  loggedUser: defaultUser,
})

export default {
  state,
  mutations,
  actions,
  getters,
}
