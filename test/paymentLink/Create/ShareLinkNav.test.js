import { createWrapperShallow } from '../../helpers'
import ShareLinkNav from '~/components/cards/CreatedLinkCard/ShareLinkNav.vue'
import { shareOptions } from '~/utils/misc-constants'

const $config = {
  pageDomain: 'page/',
}

const exampleLink = {
  title: 'A really nice link title',
  amount: '1234321',
  link: '123',
}

describe('Nav share component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapperShallow(
      ShareLinkNav,
      {},
      {
        propsData: {
          linkData: exampleLink,
        },
        data() {
          return {
            shareOptions,
          }
        },
        mocks: {
          $config,
        },
      }
    )
  })
  afterEach(() => wrapper.destroy())

  test('It renders the given array of share options with icons', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' }).wrappers
    expect(buttons.length).toBe(shareOptions.length)
    let currentIcon

    // The array returned from "wrapper.findAll" method doesn't support iterating with higher order functions like forEach()
    let i = 0
    for (const btn of buttons) {
      currentIcon = btn.find('v-icon-stub')
      expect(currentIcon).toBeTruthy()
      expect(currentIcon.text()).toContain(shareOptions[i].logo)
      i++
    }
  })

  test('Each button has the correct link', () => {
    const links = wrapper.findAll('a').wrappers

    let attrs
    let i = 0

    // Assert that each links was generated with the share options array correctly
    for (const link of links) {
      attrs = link.attributes()
      expect(attrs.href).toEqual(
        shareOptions[i].generateLink(
          exampleLink.title,
          exampleLink.amount,
          `${$config.pageDomain}pay/${exampleLink.link}`
        )
      )
      i++
    }
  })
})
