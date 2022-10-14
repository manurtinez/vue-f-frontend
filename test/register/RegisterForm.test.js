import Vue from 'vue'
import RegisterForm from '@/components/forms/register/RegisterForm'
import { createWrapper } from '../helpers'

describe('RegisterForm', () => {
  let wrapper
  beforeEach(() => {
    wrapper = createWrapper(RegisterForm)
  })

  test('It renders the form', () => {
    const form = wrapper.findComponent({ name: 'v-form' })
    expect(form.exists()).toBe(true)
  })

  test('The submit button is disabled if form is invalid or empty', async () => {
    // Assert with empty data
    await wrapper.setData({
      email: '',
      password: '',
      rePassword: '',
      termsCheck: false,
    })
    const btn = wrapper.getComponent({ name: 'v-btn' })
    expect(btn.attributes('disabled')).toBeTruthy()

    // Assert with valid form
    await wrapper.setData({
      email: 'user@example.com',
      password: 'Password1!',
      rePassword: 'Password1!',
      termsCheck: true,
    })
    await Vue.nextTick()
    expect(btn.attributes('disabled')).toBeFalsy()
  })

  test('The passwords are required to match', async () => {
    await wrapper.setData({
      password: 'Password1!',
      rePassword: 'Password2!',
    })
    expect(wrapper.vm.doPasswordsMatch).toStrictEqual(
      'Las contraseñas no coinciden'
    )
    await wrapper.setData({
      rePassword: 'Password1!',
    })
    expect(wrapper.vm.doPasswordsMatch).toStrictEqual(true)
  })

  test('The form is submitted with clicking the button', async () => {
    await wrapper.setData({
      email: 'user@example.com',
      password: 'Password1!',
      rePassword: 'Password1!',
      termsCheck: true,
    })
    await Vue.nextTick()
    const btn = wrapper.getComponent({ name: 'v-btn' })
    btn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty('onRegister')
  })
})
