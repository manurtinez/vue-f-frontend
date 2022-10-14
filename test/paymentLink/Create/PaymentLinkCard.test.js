import { createWrapper } from '../../helpers'
import { createOptions } from './mocks'
import PaymentLinkCard from '~/components/cards/PaymentLinkCard'

describe('Payment link create card', () => {
  let wrapper
  const spySubmitLink = jest.spyOn(PaymentLinkCard.methods, 'submitLink')

  afterEach(() => wrapper.destroy())

  test('it renders expire options if showExpire is true', async () => {
    wrapper = createWrapper(PaymentLinkCard, {}, createOptions)
    wrapper.setData({ showExpire: false })
    await wrapper.vm.$forceUpdate()
    expect(wrapper.find('#expire-options').element.style.display).toBe('none')

    wrapper.setData({ showExpire: true })
    await wrapper.vm.$forceUpdate()
    expect(wrapper.find('#expire-options').element.style.display).toBe('')
  })

  test('it ignores expire data from submit if showExpire is false', async () => {
    wrapper = createWrapper(PaymentLinkCard, {}, createOptions)

    // Fill fields
    wrapper.find('#titleField').setValue('A title')
    wrapper.find('#amountField').setValue(123)
    wrapper.find('#memoField').setValue('nice memo!')

    // Select expire date, and then decide to not select it
    wrapper.setData({
      showExpire: true,
    })
    await wrapper.vm.$nextTick()
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedExpire).not.toBe(-1)
    wrapper.setData({
      showExpire: false,
    })
    await wrapper.vm.$nextTick()

    // Trigger submit button
    const submitBtn = wrapper.find('#submit-btn')
    await submitBtn.trigger('click')

    // Assert that submit is made, and date is ignored
    expect(spySubmitLink).toHaveBeenCalled()
    expect(wrapper.emitted().onSubmitLink).toBeTruthy()
    expect(wrapper.emitted().onSubmitLink[0][0]).toEqual({
      title: 'A title',
      amount: '123',
      memo: 'nice memo!',
      finalAmount: 121,
    })
  })

  test("If it's editing an existing link, the template reacts with the data", async () => {
    wrapper = createWrapper(
      PaymentLinkCard,
      {},
      {
        ...createOptions,
        // Mock that a link is being edited
        propsData: {
          originalLink: {
            editing: true,
            id: 1,
            title: 'A title being edited',
            amount: 123,
            memo: 'nice memo!',
            expiration_date: '12-12-1912',
          },
        },
      }
    )
    await wrapper.vm.$nextTick()

    // Assert that fields are the same as the original link, and expire options are enabled
    expect(wrapper.find('#titleField').element.value).toBe(
      'A title being edited'
    )
    expect(wrapper.find('#amountField').element.value).toBe('123')
    expect(wrapper.find('#memoField').element.value).toBe('nice memo!')
    expect(wrapper.vm.showExpire).toBe(true)
    expect(wrapper.find('#expire-options').element.style.display).toBe('')

    wrapper.destroy()

    // Assert again with no expiration date
    wrapper = createWrapper(
      PaymentLinkCard,
      {},
      {
        ...createOptions,
        // Mock that a link is being edited
        propsData: {
          originalLink: {
            editing: true,
            id: 1,
          },
        },
      }
    )
    await wrapper.vm.$nextTick()

    // Assert that this time, expire options are hidden
    expect(wrapper.vm.showExpire).toBe(false)
    expect(wrapper.find('#expire-options').element.style.display).toBe('none')
  })

  test('if the link is being edited, submit it with the corresponding id', async () => {
    // Again, create wrapper with prop link received
    wrapper = createWrapper(
      PaymentLinkCard,
      {},
      {
        ...createOptions,
        // Mock that a link is being edited
        propsData: {
          originalLink: {
            link: '67BAX8qj1V2lm9n8864iD434y3',
            title: 'A title being edited',
            amount: 123,
            memo: 'nice memo!',
          },
          editing: true,
        },
      }
    )

    await wrapper.vm.submitLink()

    // Assert that id was added to patch the link afterwards
    expect(wrapper.emitted().onSubmitLink[0][0]).toHaveProperty('link')
  })

  test('Comission message is passed the correct prop', async () => {
    // Initially, test a value which would result in final amount being 0 or negative
    wrapper = createWrapper(
      PaymentLinkCard,
      {},
      {
        ...createOptions,
        data() {
          return {
            amount: 1, // Subtracting current comission, this results in a final value of -1
          }
        },
        computed: {},
      }
    )

    // If the final amount is 0 or less, the box is passed 0
    expect(wrapper.find('#comissionBox').attributes()['final-amount']).toBe('0')

    // Now, set a higher value
    await wrapper.setData({
      amount: 12,
    })

    // The final amount should be passed now as its greater than 0
    // Parse to String object as props are passed as strings
    expect(wrapper.find('#comissionBox').attributes()['final-amount']).toBe(
      String(wrapper.vm.finalAmount)
    )
  })
})
