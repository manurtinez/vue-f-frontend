import Validation from '@/pages/Validation.vue'
import { createMockedAxios, createWrapper } from '../helpers'
import { mutations, options, store } from './mocks'
import EmailError from '~/components/UI/Emails/EmailError.vue'
import EmailSuccess from '~/components/UI/Emails/EmailSuccess.vue'

describe('Validation of email page', () => {
  const mockValidateHash = jest.spyOn(Validation.methods, 'validateHash')

  test('it processes the hash if its present in the url', () => {
    createWrapper(Validation, store, options)
    expect(mockValidateHash).toHaveBeenCalledWith('123')
  })

  test('it renders error component if hash validation is not valid', async () => {
    console.error = jest.fn()
    // this is just to replace the mocked response with a 400
    const failedAxiosOptions = {
      ...options,
      mocks: {
        ...options.mocks,
        $publicAxios: createMockedAxios({}, 400),
      },
    }
    const wrapper = createWrapper(Validation, store, failedAxiosOptions)
    await wrapper.vm.validateHash('123')
    await wrapper.vm.$nextTick()

    const errorComponent = wrapper.findComponent(EmailError)
    const successComponent = wrapper.findComponent(EmailSuccess)

    expect(errorComponent.exists()).toBe(true)
    expect(successComponent.exists()).toBe(false)
    expect(mutations.setValidationFailed).toHaveBeenCalled()
  })

  test('it renders success component if hash validation is valid', async () => {
    console.error = jest.fn()
    const wrapper = createWrapper(Validation, store, options)
    await wrapper.vm.validateHash('123')
    await wrapper.vm.$nextTick()

    const errorComponent = wrapper.findComponent(EmailError)
    const successComponent = wrapper.findComponent(EmailSuccess)

    expect(successComponent.exists()).toBe(true)
    expect(errorComponent.exists()).toBe(false)
    expect(mutations.setValidationSuccess).toHaveBeenCalled()
  })
})
