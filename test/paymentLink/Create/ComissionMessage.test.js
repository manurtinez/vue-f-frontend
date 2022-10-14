import { createWrapper, mocki18n } from '../../helpers'
import ComissionMessage from '~/components/cards/PaymentLinkCard/ComissionMessage'

describe('Comission Message test', () => {
  let wrapper
  // i18n messages to assert
  const messages = mocki18n.messages[mocki18n.locale]

  beforeEach(
    () =>
      (wrapper = createWrapper(
        ComissionMessage,
        {},
        {
          propsData: {
            finalAmount: 123,
            comission: 23,
          },
        }
      ))
  )

  afterEach(() => wrapper.destroy())

  test('The message renders the correct text with the given props', async () => {
    // Grab the two paragraphs and check them
    const paragraphs = wrapper.findAll('p')

    // Replace interpolation in messages to assert
    let amountText = messages.paymentLinkCreate.card.comissionMsg.amountReceived.replace(
      /\{(.+?)\}/g,
      '123'
    )
    // The template generated a bunch of whitespace with this message so it has to be removed to assert
    let comissionText = messages.paymentLinkCreate.card.comissionMsg.amountPaid
      .replace(/\{(.+?)\}/g, '23')
      .replace(/\s/g, '')

    expect(paragraphs.at(0).text()).toEqual(amountText)
    expect(paragraphs.at(1).text().replace(/\s/g, '')).toEqual(comissionText)

    // Change the props and assert that the component reacts
    await wrapper.setProps({
      finalAmount: 222111,
      comission: 250,
    })

    // Replace interpolation in messages to assert
    amountText = messages.paymentLinkCreate.card.comissionMsg.amountReceived.replace(
      /\{(.+?)\}/g,
      '222111'
    )
    // The template generated a bunch of whitespace with this message so it has to be removed to assert
    comissionText = messages.paymentLinkCreate.card.comissionMsg.amountPaid
      .replace(/\{(.+?)\}/g, '250')
      .replace(/\s/g, '')

    expect(paragraphs.at(0).text()).toEqual(amountText)
    expect(paragraphs.at(1).text().replace(/\s/g, '')).toEqual(comissionText)
  })
})
