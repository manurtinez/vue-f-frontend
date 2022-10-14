import { RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'

export const state = {
  validationColor: '',
}

export const mutations = {
  setValidationSuccess: jest.fn(),
  setValidationFailed: jest.fn(),
}

export const userState = {
  currentEmail: 'user@example.com',
}

export const options = {
  mocks: {
    $urls: {
      RE_SEND_EMAIL: '/resend',
    },
    $route: {
      query: {
        q: '123',
      },
    },
    $nuxt: {
      $loading: {
        start: jest.fn(),
      },
    },
    $publicAxios: {
      get: jest.fn(() => Promise.resolve({ status: 201 })),
    },
  },
  stubs: {
    Portal: {
      template: '<div></div>',
    },
    NuxtLink: RouterLinkStub,
  },
}

export const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    userStore: {
      state: userState,
      namespaced: true,
    },
  },
})
