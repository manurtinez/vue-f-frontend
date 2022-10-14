import AccountDataCard from '~/components/cards/Profile/AccountDataCard'
import { createWrapper } from '~/test/helpers'
import { mockUser } from '~/test/profile/mocks'

describe('Account Data Card test', () => {
  let wrapper
  beforeEach(() => {
    wrapper = createWrapper(
      AccountDataCard,
      {},
      {
        propsData: {
          currentUser: mockUser,
        },
      }
    )
  })

  afterEach(() => wrapper.destroy())

  test('It renders the user info correctly', () => {
    const usernameField = wrapper.find('#usernameField')
    const emailField = wrapper.find('#emailField')
    const fullnameField = wrapper.find('#fullnameField')
    const dniField = wrapper.find('#dniField')
    const nationalityField = wrapper.find('#nationalityField')

    expect(usernameField.text()).toEqual(mockUser.username)
    expect(emailField.text()).toEqual(mockUser.email)
    expect(fullnameField.text()).toEqual(mockUser.fullname)
    expect(dniField.text()).toEqual('DNI ' + mockUser.dni)
    expect(nationalityField.text()).toEqual(mockUser.nationality_display)
  })

  // TODO here the test for changing the password will be added
})
