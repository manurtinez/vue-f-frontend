import { createWrapper } from '../../helpers'
import { createdLinkCardOptions, exampleCreatedLink } from './mocks'
import CreatedLinkCard from '~/components/cards/CreatedLinkCard'

describe('Successful link created card', () => {
  let wrapper
  const spyCopyLink = jest.spyOn(CreatedLinkCard.methods, 'copyLink')
  console.error = jest.fn()

  afterEach(() => wrapper.destroy())

  test('It renders the correct info for the provided created link', () => {
    wrapper = createWrapper(CreatedLinkCard, {}, createdLinkCardOptions)
    const linkField = wrapper.find('#linkField')
    const titleField = wrapper.find('#createdLinkTitle')
    const amountField = wrapper.find('#createdLinkAmount')
    const finalAmountField = wrapper.find('#createdLinkFinalAmount')
    const invoiceField = wrapper.find('#createdLinkInvoice')

    expect(titleField.text()).toContain(exampleCreatedLink.title)
    expect(amountField.text()).toContain(exampleCreatedLink.amount)
    expect(finalAmountField.text()).toContain(exampleCreatedLink.finalAmount)
    expect(linkField.element.value).toContain(exampleCreatedLink.link)
    expect(invoiceField.text()).toContain(exampleCreatedLink.invoice_number)
  })

  test('It calls copy function when clicking the link', async () => {
    wrapper = createWrapper(CreatedLinkCard, {}, createdLinkCardOptions)
    const btn = wrapper.findComponent({ name: 'v-btn' })
    await btn.trigger('click')

    expect(spyCopyLink).toHaveBeenCalled()
  })

  test('If copy is successful a message is displayed', async () => {
    wrapper = createWrapper(CreatedLinkCard, {}, createdLinkCardOptions)
    // Mock copy to clipboard function
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    })
    await wrapper.vm.copyLink()

    const snackBar = wrapper.findComponent({ name: 'v-snackbar' })
    expect(snackBar.exists()).toBe(true)
    expect(snackBar.html()).toContain('copiado')
  })

  test('If copy is NOT successful an error message is displayed', async () => {
    wrapper = createWrapper(CreatedLinkCard, {}, createdLinkCardOptions)
    // Mock copy to clipboard function with error
    Object.assign(navigator, {
      clipboard: {
        writeText: () => Promise.reject(new Error('error')),
      },
    })
    await wrapper.vm.copyLink()

    const snackBar = wrapper.findComponent({ name: 'v-snackbar' })
    expect(snackBar.exists()).toBe(true)
    expect(snackBar.html()).toContain('error')
  })
})
