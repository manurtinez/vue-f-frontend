import { RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'

export const actions = {
  submitRegister: jest.fn(),
}
export const mutations = {
  setValidationPending: jest.fn(),
}
export const store = new Vuex.Store({
  mutations,
  modules: {
    userStore: {
      actions,
      namespaced: true,
    },
  },
})
export const options = {
  mocks: {
    $router: {
      push: jest.fn(),
    },
  },
  stubs: {
    NuxtLink: RouterLinkStub,
    RegisterForm: {
      template: '<form></form>',
    },
  },
}
