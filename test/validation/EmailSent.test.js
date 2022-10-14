import EmailSent from '@/pages/EmailSent'
import { createMockedAxios, createWrapper, textContains } from '../helpers'
import { options, store } from './mocks'

describe('Email Sent Page', () => {
  let wrapper
  const mockResend = jest.spyOn(EmailSent.methods, 'reSendEmail')

  beforeEach(() => {
    wrapper = createWrapper(EmailSent, store, options)
  })

  test('it renders the correct email after registration', () => {
    textContains(wrapper, '.sent-description', 'user@example.com')
  })

  test('it calls resend function when button is clicked', async () => {
    wrapper.vm.$publicAxios = createMockedAxios({})
    const button = wrapper.findComponent({ name: 'v-btn' })
    await button.trigger('click')
    expect(mockResend).toHaveBeenCalled()
  })

  test('it gives correct alert if resend is successful / failed', async () => {
    // Disable console.error just for testing
    console.error = jest.fn()
    wrapper.vm.$publicAxios = createMockedAxios({}, 200)
    wrapper.vm.reSendEmail()
    await wrapper.vm.$nextTick()

    let snackBar = wrapper.findComponent({ name: 'v-snackbar' })
    expect(snackBar.html()).toContain('Email enviado')

    wrapper.vm.$publicAxios = createMockedAxios({}, 400)
    await wrapper.vm.reSendEmail()
    await wrapper.vm.$nextTick()

    snackBar = wrapper.findComponent({ name: 'v-snackbar' })
    expect(snackBar.html()).toContain('Hubo algún error al enviar el mail')
  })
})
