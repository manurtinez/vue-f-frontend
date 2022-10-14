import { mount, RouterLinkStub } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { exampleCreatedLink } from './mocks'
import Success from '~/pages/PaymentLink/Success.vue'

describe('Success created link page', () => {
  test('It gets the created link info from route params', () => {
    const vuetify = new Vuetify()
    const wrapper = mount(Success, {
      vuetify,
      mocks: {
        $route: {
          params: {
            createdLink: exampleCreatedLink,
          },
        },
      },
      stubs: {
        NuxtLink: RouterLinkStub,
        CreatedLinkCard: {
          template: '<div></div>',
        },
      },
    })

    expect(wrapper.vm.$data.createdLink).toBe(exampleCreatedLink)
  })
})
