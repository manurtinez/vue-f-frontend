import Vue from 'vue'
import LoginForm from '@/components/forms/login/LoginForm'
import { createWrapper } from '../helpers'

describe('LoginForm', () => {
  let wrapper
  beforeEach(() => {
    wrapper = createWrapper(LoginForm)
  })
  afterEach(() => wrapper.destroy())

  test('It renders the form', () => {
    const form = wrapper.findComponent({ name: 'v-form' })
    expect(form.exists()).toBe(true)
  })

  test('The submit button is disabled if form is invalid or empty', async () => {
    // Assert with empty data
    await wrapper.setData({
      email: '',
      password: '',
    })
    const btn = wrapper.getComponent({ name: 'v-btn' })
    expect(btn.attributes('disabled')).toBeTruthy()

    // Assert with valid form
    await wrapper.setData({
      email: 'user@example.com',
      password: 'Password1!',
    })
    await Vue.nextTick()
    expect(btn.attributes('disabled')).toBeFalsy()
  })

  test('The form is submitted with clicking the button', async () => {
    await wrapper.setData({
      email: 'user@example.com',
      password: 'Password1!',
    })
    await Vue.nextTick()
    const btn = wrapper.getComponent({ name: 'v-btn' })
    btn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty('onLogin')
  })
})
