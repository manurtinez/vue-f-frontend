import {
  $axios,
  store,
  redirect,
  mockInterceptor,
  mockRequest,
  mockTokenValidator,
  refreshedToken,
  expiredToken,
  validToken,
} from './mocks'

describe('JWT access tokens test', () => {
  afterEach(() => {
    mockRequest.headers = {}
    window.localStorage.clear()
    jest.clearAllMocks()
  })

  test("If token is present, it's added to the request without problem", () => {
    // Add token to LS
    window.localStorage.setItem('access', validToken)
    const modifiedRequest = mockInterceptor.requestHandler(mockRequest)

    // Expect interceptor to have added the token to headers (check for expire done another test)
    expect(modifiedRequest.headers.Authorization).toBe(`Bearer ${validToken}`)
  })

  test('If access is present but expired, and refresh is not expired, token is refreshed and request passes', async () => {
    // Set an expired access and valid refresh
    window.localStorage.setItem('access', expiredToken)
    window.localStorage.setItem('refresh', validToken)

    const response = mockTokenValidator(expiredToken)

    // Expect response to be unauthorized because access is expired
    expect(response.status).toBe(401)
    expect(response.msg).toBe('Token is expired')

    // After no token is found, request failed and error handler is called
    await mockInterceptor.responseErrorHandler({
      response,
      config: mockRequest,
    })

    // This time, the token should refresh and the request pass with the token
    expect(store.dispatch).toHaveBeenCalledWith(
      'tokenStore/getRefresh',
      validToken
    )
    expect($axios.request).toHaveBeenCalledWith({
      ...mockRequest,
      headers: { Authorization: `Bearer ${refreshedToken}` },
    })
  })

  test('If none of the tokens are available, the request fails once and redirects to login without refreshing', async () => {
    const modifiedRequest = mockInterceptor.requestHandler(mockRequest)

    // Token was not set
    expect(modifiedRequest.headers.Authorization).toBeUndefined()

    // Response from backend
    const response = mockTokenValidator()

    // Response failed because there was no token
    expect(response.status).toBe(401)
    expect(response.msg).toBe('No token was given')

    // After no token is found, request fails and error handler is called
    await mockInterceptor.responseErrorHandler({
      response,
      config: mockRequest,
    })

    // As there is not refresh token either, the dispatch to refresh wasn't called and the interceptor rejects the request
    expect($axios.request).not.toHaveBeenCalled()

    // The user is redirected to the login and logged out
    expect(store.dispatch).toHaveBeenCalledWith(
      'userStore/logout',
      {},
      { root: true }
    )
    expect(redirect).toHaveBeenCalledWith('/login')
  })

  test('If both tokens are expired, the request fails and redirects to login', async () => {
    // For this test, simulate that the refresh throws unauthorized error because it's expired
    store.dispatch = jest.fn().mockRejectedValue(Error('Refresh expired'))
    // Mock functions to assert them later
    console.error = jest.fn()
    mockInterceptor.responseErrorHandler = jest.fn(
      mockInterceptor.responseErrorHandler
    )

    // Generate expired tokens
    window.localStorage.setItem('access', expiredToken)
    window.localStorage.setItem('refresh', expiredToken)

    // Initial request fails because access is expired
    const response = mockTokenValidator(expiredToken)
    expect(response.status).toBe(401)

    // The error handler should throw an error because refresh is expired and invalid
    await expect(
      mockInterceptor.responseErrorHandler({
        response,
        config: mockRequest,
      })
    ).rejects.toStrictEqual(Error('Refresh expired'))

    // Check that the attempt to refresh failed and throwed the same error
    expect(store.dispatch).toHaveBeenCalledWith(
      'tokenStore/getRefresh',
      expiredToken
    )
    await expect(store.dispatch).rejects.toThrowError(Error('Refresh expired'))

    // Assert that the interceptor entered in the catch error and handled it properly
    expect(console.error).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalledWith(
      'userStore/logout',
      {},
      { root: true }
    )
    expect(redirect).toHaveBeenCalledWith('/login')
  })
})
