import dayjs from 'dayjs'
import axiosInterceptor from '~/plugins/axiosInterceptor'

// Mock redirect function
export const redirect = jest.fn()

// Simulate a new token generated
export const refreshedToken = generateToken(dayjs().add(1, 'day').unix())

// Expired token
export const expiredToken = generateToken(
  dayjs(dayjs().subtract(2, 'days').format()).unix()
)

// Valid token
export const validToken = generateToken(
  dayjs(dayjs().add(2, 'days').format()).unix()
)

// Mock vuex store and methods
export const store = {
  dispatch: jest.fn(() => Promise.resolve(refreshedToken)),
}

// Mock axios object provided by nuxt
export const $axios = {
  onRequest: jest.fn(),
  onResponseError: jest.fn(),
  create: jest.fn(),
  request: jest.fn(),
}

export const mockInterceptor = axiosInterceptor(
  { $axios, store, redirect },
  jest.fn()
)

export const mockRequest = {
  url: '/a/url/',
  method: 'GET',
  headers: {},
}

// Param date: a date in seconds, for example, generated with Date.now(), or dayjs
export function generateToken(date) {
  const token = JSON.stringify({
    payload: 'a/random/payload',
    exp: date,
  })
  // Convert to base64
  return btoa(token)
}

// Mock token validation done in the backend
export const mockTokenValidator = (token) => {
  if (!token) return { status: 401, msg: 'No token was given' }
  const nowDate = dayjs().unix()
  // Decode base64 token
  const decodedToken = JSON.parse(atob(token))
  // If seconds of expire are less than current seconds
  if (decodedToken.exp < nowDate)
    return { status: 401, msg: 'Token is expired' }
  return { status: 200, msg: 'Token is OK' }
}

export const createResponse = (status) =>
  status === 200
    ? () => ({
        status,
        user: { name: 'aName', username: 'aUser' },
        msg: 'User retrieved',
      })
    : () => ({
        status,
        msg: 'Auth required',
      })

export const createStore = (loggedUser) => ({
  state: {
    userStore: {
      loggedUser,
    },
  },
  dispatch: jest.fn(),
})
