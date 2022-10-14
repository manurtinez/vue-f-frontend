import { RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import actions from '~/store/linkStore/actions'
import mutations from '~/store/linkStore/mutations'

// An array of example links with various status
export const exampleLinkArray = [
  {
    title: 'Door sea space.',
    amount: '8675.00',
    currency: 'USD',
    link: '26vEG5vI9I4hs4S3064wc718V2',
    expiration_date: '1983-03-15T16:04:24Z',
    status: 'Active',
    user: '',
    memo: 'a cool memo',
    invoice_number: 1,
  },
  {
    title: 'Several explain run home really.',
    amount: '6646.00',
    currency: 'USD',
    link: '62gOO2FX2f3FF8q2748RI748o9',
    expiration_date: '1986-03-03T18:47:16Z',
    status: 'Expired',
    user: '',
    memo: '',
    invoice_number: 2,
  },
  {
    title: 'Attorney every individual.',
    amount: '7378.00',
    currency: 'USD',
    link: '01EMz6ie7E8wI4J9763Nv990q3',
    expiration_date: '2014-07-05T23:47:35Z',
    status: 'Canceled',
    user: '',
    memo: 'a cool memo',
    invoice_number: 3,
  },
  {
    title: 'Technology each oil.',
    amount: '8900.00',
    currency: 'USD',
    link: '73ZDP0PB1M6eH7M5181ac838v5',
    expiration_date: '2003-02-24T15:26:44Z',
    status: 'Paid',
    user: 'https://localhost/api/v1/accounts/2/',
    memo: 'a cool memo',
    invoice_number: 4,
  },
  {
    title: 'Health all your event wear.',
    amount: '5297.00',
    currency: 'USD',
    link: '54ASa3TZ6A8uQ5w2502mf762C7',
    expiration_date: '1990-02-13T03:57:30Z',
    status: 'Canceled',
    user: 'https://localhost/api/v1/accounts/2/',
    memo: 'a cool memo',
    invoice_number: 5,
  },
  {
    title: 'Guy effort project break speak.',
    amount: '2213.00',
    currency: 'USD',
    link: '29HNJ8Xw7N6Ae5F7085LE627Z1',
    expiration_date: '1995-09-24T17:39:10Z',
    status: 'Paid',
    user: 'https://localhost/api/v1/accounts/2/',
    memo: 'a cool memo',
    invoice_number: 6,
  },
]

export const listStateEmpty = {
  linkList: {
    count: 12,
    next: null,
    previous: null,
    results: [],
  },
  requestCancelToken: null,
}

export const listState = {
  linkList: {
    count: 12,
    next: null,
    previous: null,
    results: exampleLinkArray,
  },
  requestCancelToken: null,
}

export const listMutations = {
  // Mock the mutation that updates the list in the store
  updateLinkList: jest.fn(
    (state, newLinkList) => (state.linkList = { ...newLinkList })
  ),
  clearLinkList: jest.fn((state) => (state.linkList = { results: [] })),
  updateCancelToken: mutations.updateCancelToken,
}

export const listActions = {
  getLinks: actions.getLinks,
}

// Default mock store for components that need it
export const listStore = new Vuex.Store({
  modules: {
    linkStore: {
      state: listState,
      actions: listActions,
      mutations: listMutations,
      namespaced: true,
    },
  },
})

// Default mock store (empty) for components that need it
export const listStoreEmpty = new Vuex.Store({
  modules: {
    linkStore: {
      state: listStateEmpty,
      actions: listActions,
      mutations: listMutations,
      namespaced: true,
    },
  },
})

// Function to simulate filtering of links in the backend
// This is then injected into axios.get() to mock it
export const mockFilterLinks = (url) => {
  // Get the query params from URL
  const params = new URLSearchParams(url)
  let filteredList
  // Filter the list according to status
  if (params.get('status')) {
    filteredList = exampleLinkArray.filter(
      (link) => link.status === statusMappings[params.get('status')]
    )
  } else if (params.get('expired')) {
    filteredList = exampleLinkArray.filter(
      (link) => link.status === statusMappings.EXP
    )
  } else {
    filteredList = exampleLinkArray
  }
  // If filter includes invoice, filter it as well
  if (params.get('invoice')) {
    filteredList = filteredList.filter(
      (link) => link.invoice_number === parseInt(params.get('invoice'))
    )
  }
  filteredList = filteredList.slice(params.get('offset'), params.get('limit'))
  return {
    status: 200,
    data: { results: filteredList, count: 12 },
    config: { url },
  }
}

// Default mocks for tests that need a list of links
export const listOptions = {
  // Stubs replace external components with mock ones
  stubs: {
    NuxtLink: RouterLinkStub,
    PaymentLinkTable: {
      name: 'PaymentLinkTable',
      template: '<div></div>',
    },
    ConfirmDialog: {
      name: 'ConfirmDialog',
      template: '<div></div>',
    },
    LinkStatus: {
      name: 'LinkStatus',
      template: '<div></div>',
    },
  },
  mocks: {
    $router: {
      push: jest.fn(),
    },
  },
}
// Default mocks for link status component test
export const linkStatusOptions = (item) => {
  return {
    propsData: {
      item,
    },
  }
}

// Associate status codes with the words
const statusMappings = {
  PAI: 'Paid',
  CAN: 'Canceled',
  EXP: 'Expired',
  ACT: 'Active',
}
