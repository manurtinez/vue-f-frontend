import { createStore } from './mocks'
import { beforeEachHook } from '~/plugins/routeGuard'
import { defaultUser } from '~/store/userStore'

describe('Router guard plugin tests', () => {
  let store
  test('If the router is called to logout page, the logout action is dispatched', () => {
    // Mock the beforeEach guard to simulate a call
    const mockBeforeEach = jest.fn(beforeEachHook)

    // Call the hook to simulate a route change, the from param is irrelevant in this case
    const to = { path: '/logout' }
    const next = jest.fn()
    store = createStore(defaultUser)
    mockBeforeEach(to, {}, next, store)

    // Assert that the logout was dispatched and it redirects to login
    expect(store.dispatch).toHaveBeenCalledWith('userStore/logout')
    expect(next).toHaveBeenCalledWith('/login')
    jest.resetAllMocks()

    // If the route is NOT logout, then these actions are not taken
    to.path = '/someRandomRoute'
    mockBeforeEach(to, {}, next, store)

    expect(store.dispatch).not.toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })
})
