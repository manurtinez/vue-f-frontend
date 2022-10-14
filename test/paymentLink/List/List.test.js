import { createWrapper, createWrapperShallow } from '../../helpers'
import { listOptions } from './mocks'
import List from '~/pages/PaymentLink/List.vue'

describe('Successful link created card', () => {
  let wrapper
  console.error = jest.fn()
  const spySetInvoice = jest.spyOn(List.methods, 'setInvoice')

  afterEach(() => wrapper.destroy())

  test('It renders the table and top bar', () => {
    wrapper = createWrapperShallow(List, {}, listOptions)
    const table = wrapper.findComponent({ name: 'PaymentLinkTable' })
    const btn = wrapper.findComponent({ name: 'v-btn' })
    const select = wrapper.findComponent({ name: 'v-select' })

    expect(table.exists()).toBe(true)
    expect(btn.exists()).toBe(true)
    expect(select.exists()).toBe(true)
  })

  test('The select changes the current filter', async () => {
    wrapper = createWrapper(List, {}, listOptions)
    const select = wrapper.find('#filter-select')
    await select.trigger('click')

    // Get options from select menu
    const options = wrapper.findAll('.v-list-item__title')

    // Click on fourth option, "Pagados"
    await options.at(3).trigger('click')
    expect(wrapper.vm.filters.statusFilter).toBe('PAI')

    // Click on second option, "Vencidos"
    await options.at(1).trigger('click')
    expect(wrapper.vm.filters.statusFilter).toBe('EXP')
  })

  test('If an invoice is searched, the request is debounced', async () => {
    jest.useFakeTimers()
    wrapper = createWrapper(List, {}, listOptions)

    // Fill the invoice field to search and trigger input
    const invoiceField = wrapper.find('#invoiceField')
    invoiceField.setValue('123')
    await invoiceField.trigger('input')

    // Immediately, the function is called, but filter doesn't change yet
    expect(spySetInvoice).toHaveBeenCalled()
    expect(wrapper.vm.filters.invoiceFilter).toBe('')

    // After half a second, expect the value to have changed
    jest.advanceTimersByTime(500)
    expect(wrapper.vm.filters.invoiceFilter).toBe('123')
  })
})
