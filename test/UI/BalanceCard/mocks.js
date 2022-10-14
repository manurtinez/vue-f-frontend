import Vuex from 'vuex'
import { RouterLinkStub } from '@vue/test-utils'
import getters from '~/store/userStore/getters'

const userState = (balance) => {
  return {
    loggedUser: {
      balance,
    },
  }
}

export const createStore = (balance) =>
  new Vuex.Store({
    modules: {
      userStore: {
        state: userState(balance),
        getters,
        namespaced: true,
      },
    },
  })

export const options = {
  stubs: {
    NuxtLink: RouterLinkStub,
  },
}
