import Vuex from 'vuex'
import { RouterLinkStub } from '@vue/test-utils'

export const mockUser = {
  fullname: 'A nice user name',
}

const userState = {
  loggedUser: mockUser,
}

export const store = new Vuex.Store({
  modules: {
    userStore: {
      state: userState,
      namespaced: true,
    },
  },
})

export const options = {
  mocks: {
    $nuxt: {
      $route: {
        path: '',
      },
      $router: {
        go: jest.fn(),
      },
    },
    $vuetify: {
      breakpoint: {
        mobile: false,
      },
    },
  },
  stubs: {
    NuxtLink: RouterLinkStub,
  },
}
