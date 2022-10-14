import { RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'

export const actions = {
  performLogin: jest.fn(),
  logout: jest.fn(),
}
export const store = new Vuex.Store({
  modules: {
    userStore: {
      actions,
      namespaced: true,
    },
  },
})
export const options = (needsLogout) => ({
  mocks: {
    $router: {
      push: jest.fn(),
    },
    $route: {
      params: {
        needsLogout,
      },
    },
  },
  stubs: {
    NuxtLink: RouterLinkStub,
    LoginForm: {
      template: '<form></form>',
    },
  },
})
