import Create from '~/pages/PaymentLink/Create'
import { createMockedAxios, createWrapper, textContains } from '~/test/helpers'
import { listStore } from '~/test/paymentLink/List/mocks'
import { createOptions } from '~/test/paymentLink/Create/mocks'

describe('Create link page', () => {
  let wrapper

  beforeEach(() => (wrapper = createWrapper(Create, listStore, createOptions)))

  afterEach(() => wrapper.destroy())

  test('It redirects to correct page whether link was edited OR created correctly', async () => {
    // First, try with creating link from scratch
    wrapper.vm.$axios = createMockedAxios({ link: '123' }, 201)
    await wrapper.vm.submitLink({ finalAmount: 200 }, false)
    expect(wrapper.vm.$axios.post).toHaveBeenCalled()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'PaymentLink-Success',
      params: {
        createdLink: {
          finalAmount: 200,
          link: '123',
        },
      },
    })

    // Try again, this time with a link being edited
    wrapper.vm.$axios = createMockedAxios({}, 200)
    await wrapper.vm.submitLink({ finalAmount: 200 }, true)
    expect(wrapper.vm.$axios.put).toHaveBeenCalled()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'PaymentLink-List',
      params: {
        successfulEdit: true,
      },
    })
  })

  test('It renders error if request to create fails', async () => {
    console.error = jest.fn()
    wrapper.vm.$axios = {
      post: jest.fn(() => Promise.reject(new Error('error'))),
    }
    await wrapper.vm.submitLink({})

    const snackBar = wrapper.find('.v-snack')
    textContains(snackBar, '.v-snack__content', 'error')
  })
})
