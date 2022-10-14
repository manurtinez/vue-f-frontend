import { RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import getters from '~/store/userStore/getters'

const userGetters = getters

export const store = new Vuex.Store({
  modules: {
    userStore: {
      namespaced: true,
      getters: userGetters,
    },
  },
})

export const options = {
  mocks: {
    $store: {
      state: {
        userStore: {
          loggedUser: 'aUser',
        },
      },
    },
  },
  stubs: {
    NuxtLink: RouterLinkStub,
  },
}
