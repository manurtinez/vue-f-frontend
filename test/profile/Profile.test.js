import { createWrapper } from '../helpers'
import { store, options } from './mocks'
import Profile from '~/pages/Profile'

describe('Profile page test', () => {
  let wrapper
  beforeEach(() => (wrapper = createWrapper(Profile, store, options)))

  afterEach(() => wrapper.destroy())

  test('It renders the correct card and tooltip below', () => {
    expect(
      wrapper.findComponent({ name: 'AccountDataCard' }).exists()
    ).toBeTruthy()
    expect(wrapper.findComponent({ name: 'tooltip' }).exists()).toBeTruthy()
  })
})
