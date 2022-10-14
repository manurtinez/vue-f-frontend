import { mockUser, options, store } from './mocks'
import PageHeader from '~/components/UI/General/PageHeader'
import { createWrapper, mocki18n } from '~/test/helpers'

describe('User balance card', () => {
  let wrapper
  // i18n messages to assert
  const messages = mocki18n.messages[mocki18n.locale]

  beforeEach(() => (wrapper = createWrapper(PageHeader, store, options)))

  afterEach(() => wrapper.destroy())

  test('It renders correct page title OR button to go back according to path name', async () => {
    // First, try with "root pages"
    await wrapper.setData({
      $nuxt: {
        $route: {
          path: '/',
        },
      },
    })

    // And expect the title to be rendered in header
    expect(wrapper.find('#header-title').text()).toContain(
      messages.rootPageTitles['/']
    )

    // Try again with different page
    await wrapper.setData({
      $nuxt: {
        $route: {
          path: '/profile',
        },
      },
    })

    expect(wrapper.find('#header-title').text()).toContain(
      messages.rootPageTitles['/profile']
    )

    // Now, try with a page that is not "root" or "top level"
    await wrapper.setData({
      $nuxt: {
        $route: {
          path: '/not/a/top/level/page',
        },
      },
    })

    // Should render a button instead
    expect(wrapper.find('#header-title').exists()).toBeFalsy()
    const backBtn = wrapper.find('#back-btn')
    expect(backBtn.exists()).toBeTruthy()
    expect(backBtn.text()).toContain(messages.header.backBtn)
  })

  test('The back button takes the user one page back', async () => {
    await wrapper.setData({
      $nuxt: {
        $route: {
          path: '/aRandomPage',
        },
      },
    })
    const backBtn = wrapper.find('#back-btn')
    await backBtn.trigger('click')

    // Expect the button to take the router one page back
    expect(wrapper.vm.$nuxt.$router.go).toHaveBeenCalledWith(-1)
  })

  test('It renders the user name in the header button', () => {
    const profileBtn = wrapper.find('#profile-btn')
    expect(profileBtn.text()).toContain(mockUser.fullname)
  })

  // TODO here, the tests for the bell notification icon should be added when needed
})
