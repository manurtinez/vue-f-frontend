import Vuex from 'vuex'
import { RouterLinkStub } from '@vue/test-utils'
import dayjs from 'dayjs'

export const mockMovementList = [
  {
    id: Math.random(),
    type: 'cashout',
    amount: Math.trunc(Math.random() * (1000 - 1) + 1),
    date: dayjs().format('YYYY-MM-DD'),
    title: 'a title 1',
    currency: 'USDC',
  },
  {
    id: Math.random(),
    type: 'payment',
    amount: Math.trunc(Math.random() * (1000 - 1) + 1),
    date: dayjs().format('YYYY-MM-DD'),
    title: 'a title 2',
    currency: 'USDC',
  },
  {
    id: Math.random(),
    type: 'cashout',
    amount: Math.trunc(Math.random() * (1000 - 1) + 1),
    date: dayjs().format('YYYY-MM-DD'),
    title: 'a title 3',
    currency: 'USDC',
  },
  {
    id: Math.random(),
    type: 'cashout',
    amount: Math.trunc(Math.random() * (1000 - 1) + 1),
    date: dayjs().format('YYYY-MM-DD'),
    title: 'a title 4',
    currency: 'USDC',
  },
  {
    id: Math.random(),
    type: 'payment',
    amount: Math.trunc(Math.random() * (1000 - 1) + 1),
    date: dayjs().format('YYYY-MM-DD'),
    title: 'a title 5',
    currency: 'USDC',
  },
]

const movementState = (isEmpty, limit) => ({
  movementList: {
    count: 4,
    next: null,
    previous: null,
    results: isEmpty ? [] : mockMovementList.slice(0, limit),
  },
})

const actions = {
  getMovements: jest.fn(),
}

export const createStore = (isEmpty, limit = 4) =>
  new Vuex.Store({
    modules: {
      movementStore: {
        state: movementState(isEmpty, limit),
        actions,
        namespaced: true,
      },
    },
  })

export const options = {
  stubs: {
    NuxtLink: RouterLinkStub,
  },
}
