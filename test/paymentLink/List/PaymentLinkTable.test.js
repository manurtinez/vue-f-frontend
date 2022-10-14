import axios from 'axios'
import Vuex from 'vuex'
import MockAdapter from 'axios-mock-adapter'
import { createWrapper, mocki18n, textContains } from '../../helpers'
import {
  listOptions,
  listStore,
  listState,
  listStoreEmpty,
  exampleLinkArray,
  listStateEmpty,
  listActions,
  listMutations,
  mockFilterLinks,
} from './mocks'
import PaymentLinkTable from '~/components/lists/PaymentLink/PaymentLinkTable'
import { linkStatuses } from '~/utils/misc-constants'

describe('Payment links table', () => {
  let wrapper
  let axiosMock
  // i18n messages to assert
  const messages = mocki18n.messages[mocki18n.locale]

  // Suppress console errors and logs not relevant to test
  console.error = jest.fn()
  const firstLink = listState.linkList.results[0]
  const spyGetLinks = jest.spyOn(PaymentLinkTable.methods, 'getLinks')

  // Add constants before each test
  beforeEach(() => {
    listStore.$urls = { PAYMENT_LINK: '' }
    listStoreEmpty.$urls = {
      PAYMENT_LINK: '',
    }

    // Mocking axios functionality
    listStoreEmpty.$axios = {
      CancelToken: axios.CancelToken,
      get: jest.fn(
        (url) => new Promise((resolve) => resolve(mockFilterLinks(url)))
      ),
    }
    listStore.$axios = {
      CancelToken: axios.CancelToken,
      get: jest.fn(
        (url) => new Promise((resolve) => resolve(mockFilterLinks(url)))
      ),
    }
  })

  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
  })

  test('It renders the list of items correctly', async () => {
    wrapper = createWrapper(PaymentLinkTable, listStore, listOptions)
    const linkRows = wrapper.findAll('tr')
    expect(linkRows).toHaveLength(6)

    const columnsOfFirstRow = linkRows.at(0).findAll('td')
    textContains(
      columnsOfFirstRow.at(0),
      '#invoice-field',
      firstLink.invoice_number
    )
    textContains(columnsOfFirstRow.at(0), '#title-field', firstLink.title)

    // Assert that the first link (has memo) renders tooltip correctly
    const icons = wrapper.findAllComponents({ name: 'v-icon' })
    await icons.at(0).trigger('mouseenter')
    await wrapper.vm.$nextTick()

    // Check that tooltip showed with the memo
    requestAnimationFrame(() => {
      expect(wrapper.findAll('#tooltip-text').at(0).text()).toEqual(
        firstLink.memo
      )
    })

    // Now assert that the second link (has NO memo) DOESN'T show tooltip
    await icons.at(1).trigger('mouseenter')
    requestAnimationFrame(() => {
      expect(wrapper.findAll('#tooltip-text').at(1).exists()).toBeFalsy()
    })
  })

  test('If there are no links, it shows a message', () => {
    // Create new store just for this test, prevents polluting the original one and cause next tests to fail
    const cloneListEmpty = new Vuex.Store({
      modules: {
        linkStore: {
          state: listStateEmpty,
          actions: listActions,
          mutations: listMutations,
          namespaced: true,
        },
      },
    })
    cloneListEmpty.$urls = {
      PAYMENT_LINK: '',
    }
    cloneListEmpty.$axios = {
      CancelToken: axios.CancelToken,
      get: jest.fn(
        (url) => new Promise((resolve) => resolve(mockFilterLinks(url)))
      ),
    }
    wrapper = createWrapper(PaymentLinkTable, cloneListEmpty, listOptions)
    const message = wrapper.find('p')

    expect(message.text()).toBe(messages.paymentLinkList.table.noResults)
  })

  test('It fetches more links if button is available and pressed', async () => {
    wrapper = createWrapper(PaymentLinkTable, listStore, listOptions)
    const btn = wrapper.find('#fetch-btn')
    await btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(spyGetLinks).toHaveBeenCalled()
  })

  test('It redirects with corresponding link when pressing recreate / modify buttons', async () => {
    wrapper = createWrapper(PaymentLinkTable, listStore, listOptions)
    // For some reason, some actions take 2 ticks to update the template
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    // This will grab the first row button
    const menuBtn = wrapper.find('#menu-btn')
    await menuBtn.trigger('click')

    // Click button to recreate link and test if it redirects correctly
    const recreateLinkBtn = wrapper.find('#recreate-btn')
    await recreateLinkBtn.trigger('click')

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'PaymentLink-Create',
      params: {
        editing: false,
        originalLink: firstLink,
      },
    })

    // Try again with the edit button, this time editing param should be true
    const editLinkBtn = wrapper.find('#edit-btn')
    await editLinkBtn.trigger('click')

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'PaymentLink-Create',
      params: {
        editing: true,
        originalLink: firstLink,
      },
    })
  })

  test('It fetches correct links with every combination of filter', async () => {
    // Initial fetch on mounted, reset list to 0 for testing
    wrapper = createWrapper(PaymentLinkTable, listStoreEmpty, listOptions)
    // For some reason, some actions take 2 ticks to update the template
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(spyGetLinks).toHaveBeenCalledWith({
      limit: 4,
      offset: 0,
    })

    // Assert that links of all types were fetched and shown (4 rows)
    expect(wrapper.vm.linkList.results.length).toBe(4)
    expect(wrapper.findAll('tr').length).toBe(4)

    // Expect filter to have fetched url with no status or expired
    expect(listStoreEmpty.$axios.get).toHaveBeenCalledWith(
      '?limit=4&offset=0&ordering=-created_at',
      {
        cancelToken: expect.any(Object),
      }
    )
    jest.clearAllMocks()

    // Trigger change of filter and assert correct fetch (only one paid)
    await wrapper.setProps({ filters: { statusFilter: linkStatuses.paid } })
    await wrapper.vm.$nextTick()
    expect(spyGetLinks).toHaveBeenCalledWith({
      limit: 4,
      offset: 0,
      status: 'PAI',
      expired: false,
    })
    expect(wrapper.vm.linkList.results.length).toBe(2)
    expect(wrapper.findAll('tr').length).toBe(2)

    // Expect filter to have fetched url with paid status
    expect(listStoreEmpty.$axios.get).toHaveBeenCalledWith(
      '?limit=4&offset=0&ordering=-created_at&status=PAI',
      {
        cancelToken: expect.any(Object),
      }
    )
    jest.clearAllMocks()

    // Try again with expired filter, and this time expect two results
    await wrapper.setProps({ filters: { statusFilter: linkStatuses.expired } })
    await wrapper.vm.$nextTick()
    expect(spyGetLinks).toHaveBeenCalledWith({
      limit: 4,
      offset: 0,
      expired: true,
    })
    expect(wrapper.vm.linkList.results.length).toBe(1)
    expect(wrapper.findAll('tr').length).toBe(1)

    // Expect filter to have fetched url with expired set to true
    expect(listStoreEmpty.$axios.get).toHaveBeenCalledWith(
      '?limit=4&offset=0&ordering=-created_at&expired=true',
      {
        cancelToken: expect.any(Object),
      }
    )
    jest.clearAllMocks()

    // Try again with active filter, this time only one result is active
    await wrapper.setProps({ filters: { statusFilter: linkStatuses.active } })
    await wrapper.vm.$nextTick()
    expect(spyGetLinks).toHaveBeenCalledWith({
      limit: 4,
      offset: 0,
      expired: false,
      status: 'ACT',
    })
    expect(wrapper.vm.linkList.results.length).toBe(1)
    expect(wrapper.findAll('tr').length).toBe(1)

    // Expect filter to have fetched url with status active AND expired false
    expect(listStoreEmpty.$axios.get).toHaveBeenCalledWith(
      '?limit=4&offset=0&ordering=-created_at&status=ACT&expired=false',
      {
        cancelToken: expect.any(Object),
      }
    )
    jest.clearAllMocks()

    // Test to filter with invoice number in addition to status filter
    await wrapper.setProps({
      filters: { statusFilter: linkStatuses.active, invoiceFilter: 1 },
    })
    await wrapper.vm.$nextTick()
    expect(spyGetLinks).toHaveBeenCalledWith({
      limit: 4,
      offset: 0,
      expired: false,
      status: 'ACT',
      invoice: 1,
    })
    // There exists a link with invoice 1 and active
    expect(wrapper.vm.linkList.results.length).toBe(1)
    expect(wrapper.findAll('tr').length).toBe(1)

    // Expect filter to have fetched url with status active AND expired false AND invoice number
    expect(listStoreEmpty.$axios.get).toHaveBeenCalledWith(
      '?limit=4&offset=0&ordering=-created_at&status=ACT&expired=false&invoice=1',
      {
        cancelToken: expect.any(Object),
      }
    )
    jest.clearAllMocks()

    // Finally, test with a combination that shouldn't return anything (3 is canceled)
    await wrapper.setProps({
      filters: { statusFilter: linkStatuses.active, invoiceFilter: 3 },
    })
    await wrapper.vm.$nextTick()
    expect(spyGetLinks).toHaveBeenCalledWith({
      limit: 4,
      offset: 0,
      expired: false,
      status: 'ACT',
      invoice: 3,
    })
    // Nothing was returned
    expect(wrapper.vm.linkList.results.length).toBe(0)
    expect(wrapper.findAll('tr').length).toBe(0)

    // Expect filter to have fetched url with status active AND expired false AND invoice number
    expect(listStoreEmpty.$axios.get).toHaveBeenCalledWith(
      '?limit=4&offset=0&ordering=-created_at&status=ACT&expired=false&invoice=3',
      {
        cancelToken: expect.any(Object),
      }
    )
    jest.clearAllMocks()
  })

  test('If multiple requests are dispatched, the template always shows the last one', async () => {
    jest.useFakeTimers()
    wrapper = createWrapper(PaymentLinkTable, listStore, listOptions)
    // This time, simulate that the first request will be longer than the other ones
    // Response delay == 1000 ms
    axiosMock = new MockAdapter(axios, { delayResponse: 1000 })

    // Simulate an invoice is searched (first link is returned)
    axiosMock.onGet().reply(200, { results: [exampleLinkArray[0]] })
    await wrapper.setProps({
      filters: { invoiceFilter: 1 },
    })

    // Subsequent requests will take half of the first (delay response == 500 ms)
    axiosMock = new MockAdapter(axios, { delayResponse: 500 })

    // Immediately, simulate two more searches, before the first one had time to complete
    // Return 3rd link
    axiosMock.onGet().reply(200, { results: [exampleLinkArray[2]] })
    await wrapper.setProps({
      filters: { invoiceFilter: 3 },
    })

    // Return 2nd link
    axiosMock.onGet().reply(200, { results: [exampleLinkArray[1]] })
    await wrapper.setProps({
      filters: { invoiceFilter: 2 },
    })

    // Advance timers by one second, requests are all resolved
    jest.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()

    // Assert that indeed the search was triggered 3 times. (Plus 1 call that is always made when entering PaymentLinkTable)
    expect(spyGetLinks).toHaveBeenCalledTimes(4)

    // ASSERT THAT --> even if the first request finished AFTER the other two,
    // the store is updated ONLY with the one that was requested LAST, rest are cancelled

    // Expect the template to show link with invoice 2 (latest request)
    // and NOT link with invoice 1 or invoice 3
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.linkList.results.length).toBe(1)
    expect(wrapper.findAll('tr').length).toBe(1)
    expect(wrapper.find('#invoice-field').text()).toContain(
      exampleLinkArray[1].invoice_number
    )
    expect(wrapper.find('#invoice-field').text()).not.toContain(
      exampleLinkArray[0].invoice_number
    )
    expect(wrapper.find('#invoice-field').text()).not.toContain(
      exampleLinkArray[2].invoice_number
    )
  })

  // TODO This test is really tricky, will come back to it later
  test.skip('It prompts to cancel a link when clicking cancel button', async () => {
    // wrapper = createWrapper(PaymentLinkTable, listStore, listOptions)
    // wrapper.vm.$refs.ConfirmDialog.open = jest.fn(() => Promise.resolve(true))
    //
    // // This will grab the first row button
    // const menuBtn = wrapper.find('#menu-btn')
    // await menuBtn.trigger('click')
    //
    // const cancelLinkBtn = wrapper.find('#cancel-btn')
    // await cancelLinkBtn.trigger('click')
    //
    // expect(wrapper.vm.$root.$refs.ConfirmDialog.open).toHaveBeenCalled()
    // expect(spyModifyLink).toHaveBeenCalledWith({
    //   ...firstLink,
    //   new_status: 'Canceled',
    // })
  })
})
