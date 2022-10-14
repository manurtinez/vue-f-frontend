import authGuard from '~/middleware/authenticationGuard'
import { publicUrls } from '~/utils/misc-constants'
import {
  createResponse,
  createStore,
  expiredToken,
  mockTokenValidator,
  refreshedToken,
  validToken,
} from '~/test/auth&routerTests/mocks'
import { defaultUser } from '~/store/userStore'

describe('Auth middleware test', () => {
  let store

  // Mock redirect function
  const redirect = jest.fn()

  // Clone a mock of the middleware to assert
  const mockAuthGuard = jest.fn(authGuard)

  // Create a dummy app for tests
  const mockApp = {
    router: {
      beforeEach: jest.fn(),
    },
  }

  afterEach(() => window.localStorage.clear())

  test('If the user is not logged in, and there are no tokens, it redirects to login page', () => {
    store = createStore(defaultUser)
    // Call middleware manually
    mockAuthGuard({
      route: {
        path: '/',
      },
      store,
      redirect,
      app: mockApp,
    })

    expect(redirect).toHaveBeenCalledWith('/login')

    // Test if coming from same page, it doesn't redirect
    mockAuthGuard({
      route: {
        path: '/login',
      },
      store,
      redirect,
      app: mockApp,
    })

    // The redirect wasn't called again
    expect(redirect).toHaveBeenCalledTimes(1)
    expect(mockAuthGuard).toHaveReturnedWith(true)

    jest.clearAllMocks()
  })

  test('If the user is logged, but profile is not complete, prompt to complete it', () => {
    store = createStore({ ...defaultUser, id: 1, is_profile_completed: false })
    // Call middleware manually
    mockAuthGuard({
      route: {
        path: '/',
      },
      store,
      redirect,
      app: mockApp,
    })

    expect(redirect).toHaveBeenCalledWith('/completeregister')

    // Test if coming from same page, it doesn't redirect
    mockAuthGuard({
      route: {
        path: '/completeregister',
      },
      store,
      redirect,
      app: mockApp,
    })

    // The redirect wasn't called again
    expect(redirect).toHaveBeenCalledTimes(1)
    expect(mockAuthGuard).toHaveReturnedWith(true)

    jest.clearAllMocks()
  })

  test('If user is logged and profile is completed, navigate normally', () => {
    store = createStore({ ...defaultUser, id: 1, is_profile_completed: true })
    // Call middleware manually
    mockAuthGuard({
      route: {
        path: '/',
      },
      store,
      redirect,
      app: mockApp,
    })

    expect(redirect).not.toHaveBeenCalled()
    expect(mockAuthGuard).toHaveReturnedWith(true)

    jest.clearAllMocks()
  })

  test("If the requested url doesn't require auth, it passes normally", () => {
    store = createStore(defaultUser)
    // Call middleware manually with each allowed URL
    for (const url of publicUrls) {
      mockAuthGuard({
        route: {
          path: url,
        },
        store,
        redirect,
        app: mockApp,
      })

      expect(mockAuthGuard).toHaveReturnedWith(true)
    }

    // Expect the middleware to not have done nothing
    expect(redirect).not.toHaveBeenCalled()

    jest.clearAllMocks()
  })

  test('If the user is not in the store, but access token is present, fetch the user and pass', () => {
    // Set access token in local storage
    window.localStorage.setItem('access', validToken)
    // Create store with corresponding response
    store = createStore(defaultUser)
    const responseType = createResponse(
      mockTokenValidator(window.localStorage.getItem('access')).status
    )
    store.dispatch = jest.fn(responseType)
    // Call middleware manually
    mockAuthGuard({
      route: {
        path: '/',
      },
      store,
      redirect,
      app: mockApp,
    })

    // Expect the user to have been fetched, and to not have redirected
    expect(store.dispatch).toHaveBeenCalledWith('userStore/getCurrentUser')
    expect(redirect).not.toHaveBeenCalled()

    jest.clearAllMocks()
  })

  test(
    'If user not in store, access is expired but refresh token is not, ' +
      'then refresh the token, fetch user and pass',
    () => {
      // Set refresh (not access) token in local storage
      window.localStorage.setItem('access', expiredToken)
      window.localStorage.setItem('refresh', validToken)

      // Simulate that get user will fail the first time
      store = createStore(defaultUser)
      let responseType = createResponse(
        mockTokenValidator(window.localStorage.getItem('access')).status
      )
      store.dispatch = jest.fn(responseType)

      // Call middleware manually
      mockAuthGuard({
        route: {
          path: '/',
        },
        store,
        redirect,
        app: mockApp,
      })

      // At this time, the user will try to be retrieved but fail
      expect(store.dispatch).toHaveBeenCalledWith('userStore/getCurrentUser')
      expect(store.dispatch).toHaveReturnedWith({
        status: 401,
        msg: 'Auth required',
      })

      // Simulate the interceptor will then refresh the token successfully
      window.localStorage.setItem('access', refreshedToken)

      // Now the user should be fetched correctly
      responseType = createResponse(
        mockTokenValidator(window.localStorage.getItem('access')).status
      )
      store.dispatch = jest.fn(responseType)
      store.dispatch()
      expect(store.dispatch).toHaveReturnedWith({
        status: 200,
        user: { name: 'aName', username: 'aUser' },
        msg: 'User retrieved',
      })

      // Expect the user to have been fetched, and to not have redirected
      expect(redirect).not.toHaveBeenCalled()

      jest.clearAllMocks()
    }
  )
})
