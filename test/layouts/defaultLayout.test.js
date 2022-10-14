import { RouterLinkStub } from '@vue/test-utils'
import { createWrapper, mocki18n } from '~/test/helpers'
import DefaultLayout from '~/layouts/default'
import { sideMenuItems } from '~/utils/misc-constants'

describe('Default app layout test', () => {
  let wrapper
  let i = 0
  let icon
  let title
  let dictKey
  // i18n messages to assert
  const messages = mocki18n.messages[mocki18n.locale]

  beforeEach(
    () =>
      (wrapper = createWrapper(
        DefaultLayout,
        {},
        {
          stubs: {
            nuxt: {
              template: '<div></div>',
            },
            'router-link': RouterLinkStub,
            PageHeader: {
              template: '<div></div>',
            },
          },
          mocks: {
            $router: {
              push: jest.fn(),
            },
          },
        }
      ))
  )

  afterEach(() => wrapper.destroy())

  test('It renders the side menu options correctly', () => {
    // Get all list items rendered and check that each one corresponds with the options
    const menuItems = wrapper.findAllComponents({ name: 'v-list-item' })
      .wrappers

    // Remove the first item as its the menu title
    menuItems.splice(0, 1)

    // Assert the logout button before removing it too
    icon = menuItems[menuItems.length - 1].find('.v-icon')
    title = menuItems[menuItems.length - 1].find('.v-list-item__title')
    expect(icon.classes()).toContain('mdi-exit-to-app')
    expect(title.text()).toBe(messages.defaultLayout.sideMenuItems.logout)
    menuItems.splice(menuItems.length - 1, 1)

    for (const item of menuItems) {
      icon = item.find('.v-icon')
      title = item.find('.v-list-item__title')
      expect(icon.classes()).toContain(sideMenuItems[i].icon)

      dictKey = sideMenuItems[i].title.split('.')[1]
      expect(title.text()).toBe(messages.sideMenuItems[dictKey])
      i++
    }
  })

  test('The drawer shrinks on small screens', async () => {
    // Start with a big screen
    wrapper.vm.$vuetify.breakpoint.mobile = false
    await wrapper.vm.$nextTick()
    const drawer = wrapper.findComponent({ name: 'v-navigation-drawer' })

    // Expect the drawer to have the default "wide" width
    expect(drawer.element.style.width).toBe('256px')

    // Now, change to a small screen
    wrapper.vm.$vuetify.breakpoint.mobile = true
    await wrapper.vm.$nextTick()

    // Expect the drawer to now be mobile sized
    expect(drawer.element.style.width).toBe('56px')
  })
})
