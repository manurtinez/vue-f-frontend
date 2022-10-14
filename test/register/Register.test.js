import Register from '@/pages/Register.vue'
import { createWrapperShallow } from '../helpers'
import { options, store, actions, mutations } from './mocks'

describe('Register page', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapperShallow(Register, store, options)
  })
  afterEach(() => {
    wrapper.destroy()
  })

  test('It triggers register action when form is submitted', async () => {
    const exampleData = {
      email: 'user@example.com',
      password: 'Pass123!',
    }
    await wrapper.vm.register(exampleData)
    // The first object assert was necessary because vuex actions
    // append additional things in front of the payload
    expect(actions.submitRegister).toBeCalledWith(
      expect.any(Object),
      exampleData
    )
  })

  test('It sets validation pending and redirects if register was a success', async () => {
    wrapper.vm.submitRegister = jest.fn(() => Promise.resolve({ status: 201 }))
    await wrapper.vm.register()
    expect(mutations.setValidationPending).toHaveBeenCalled()
  })

  test('It shows error when register failed', async () => {
    wrapper.vm.submitRegister = jest.fn(() => Promise.resolve({ status: 400 }))
    await wrapper.vm.register()
    expect(wrapper.vm.error).toBeTruthy()

    const errorMsg = wrapper.find('#errorMsg')
    expect(errorMsg.element.style.display).not.toBe('none')
  })
})
