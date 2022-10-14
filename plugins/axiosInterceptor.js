/**
 * This interceptor is responsible for authenticating the protected requests
 * with the user token if the user is logged in. If the user is NOT logged in,
 * return to login page
 */
export default function ({ $axios, store, redirect }, inject) {
  // Handler function to use in each request attempt
  const requestHandler = (config) => {
    try {
      const accessToken = localStorage.getItem('access')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    } catch (e) {
      console.error('The access token was invalid or expired --> ', e)
      store.dispatch('userStore/logout')
    }
  }

  // Handler function to use in case of an unouthorized response
  const responseErrorHandler = async (err) => {
    if (err.config && err.response && err.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh')
      if (refreshToken) {
        return await store
          .dispatch('tokenStore/getRefresh', refreshToken)
          .then((newToken) => {
            err.config.headers.Authorization = `Bearer ${newToken}`
            return $axios.request(err.config)
          })
          .catch((reqError) => {
            console.error('Refresh token failed with -->', reqError)
            store.dispatch('userStore/logout', {}, { root: true })
            redirect('/login')
            throw reqError
          })
      }
      store.dispatch('userStore/logout', {}, { root: true })
      redirect('/login')
    }
  }

  // Try to add the token on each authenticated request
  $axios.onRequest(requestHandler)

  // In case of an unauthorized response, try to refresh the token.
  // If it fails, return to login
  $axios.onResponseError(responseErrorHandler)

  // Create a public axios instance, for the URLS that DON'T need the jwt token
  const publicAxios = $axios.create({
    headers: { 'Content-Type': 'application/json' },
  })
  inject('publicAxios', publicAxios)

  // Return the handlers to be available in other places, for example, tests
  return {
    requestHandler,
    responseErrorHandler,
  }
}
