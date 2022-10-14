import Vuex from 'vuex'

export const state = {
  loggedUser: {
    id: 2,
  },
}

export const mutations = {
  updateLoggedUser: jest.fn(),
}

export const store = new Vuex.Store({
  modules: {
    userStore: {
      state,
      mutations,
      namespaced: true,
    },
  },
})

export const options = {
  mocks: {
    $urls: {
      SUBMIT_USER: '/finishregister/',
      SUBMIT_USER_LOGIN: '/login',
    },
    $axios: {
      get: jest.fn(() => Promise.resolve({ status: 200 })),
      patch: jest.fn(() => Promise.resolve({ status: 200 })),
    },
    $router: {
      push: jest.fn(),
    },
  },
}
