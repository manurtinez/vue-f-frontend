import Login from '@/pages/Login.vue'
import { createWrapperShallow } from '../helpers'
import { options, store, actions } from './mocks'

describe('Login page', () => {
  let wrapper

  afterEach(() => {
    wrapper.destroy()
  })

  test('It triggers login action when form is submitted', async () => {
    wrapper = createWrapperShallow(Login, store, options())
    const exampleData = {
      email: 'user@example.com',
      password: 'Pass123!',
    }
    await wrapper.vm.login(exampleData)
    // The first object assert was necessary because vuex actions
    // append additional things in front of the payload
    expect(actions.performLogin).toBeCalledWith(expect.any(Object), exampleData)
  })

  test('It redirects to dashboard if login was successful and profile is complete', async () => {
    wrapper = createWrapperShallow(Login, store, options())
    wrapper.vm.performLogin = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: { is_profile_completed: true },
      })
    )
    await wrapper.vm.login()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ path: '/' })
  })

  test('It prompts to complete profile if login is successful but profile is NOT complete', async () => {
    wrapper = createWrapperShallow(Login, store, options())
    wrapper.vm.performLogin = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: { user: { is_profile_completed: false } },
      })
    )
    await wrapper.vm.login()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      path: '/completeregister',
    })
  })

  test('It shows error when login failed', async () => {
    wrapper = createWrapperShallow(Login, store, options())
    wrapper.vm.performLogin = jest.fn(() => Promise.resolve({ status: 400 }))
    await wrapper.vm.login()
    expect(wrapper.vm.error).toBeTruthy()

    const errorMsg = wrapper.find('#errorMsg')
    expect(errorMsg.element.style.display).not.toBe('none')
  })
})
