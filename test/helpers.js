import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import es from '~/locales/es.json'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)
Vue.use(Vuetify)

// Inject the 'es' translations into the components. In the future can be changed to admit language by param
// Exported to be available in testing
export const mocki18n = new VueI18n({
  locale: 'es',
  messages: {
    es,
  },
})

/**
 * It returns a NON SHALLOW wrapper instance of the component
 * @param {Object} component The Vue component to instantiate
 * @param {Object} store A vuex store object to inject
 * @param {Object} options Additional options, like mocks, parameters, dependency injections, etc
 */
export const createWrapper = (component, store = {}, options = {}) => {
  const vuetify = new Vuetify()
  return mount(component, {
    // Inject object with dependencies, store, vuetify and
    // optional additional mocks
    store,
    i18n: mocki18n,
    localVue,
    vuetify,
    ...options,
    sync: false,
  })
}

/**
 * It returns a SHALLOW (stubbed children) wrapper instance of the component
 * @param {Object} component The Vue component to instantiate
 * @param {Object} store A vuex store object to inject
 * @param {Object} options Additional options, like mocks, parameters etc
 */
export const createWrapperShallow = (component, store = {}, options = {}) => {
  const vuetify = new Vuetify()
  return shallowMount(component, {
    // Inject object with dependencies, store, vuetify and
    // optional additional mocks
    store,
    i18n: mocki18n,
    localVue,
    vuetify,
    ...options,
    sync: false,
  })
}

/**
 * Asserts that a text is equal to the text of a HTML element
 * @param {Wrapper} wrapper A vue component wrapper instance
 * @param {String} selector The HTML selector, for example, div.a-class
 * @param {String} text The text to assert
 */
export function textEquals(wrapper, selector, text) {
  const elementText = wrapper.find(selector).text()
  expect(elementText).toEqual(text)
}

/**
 * Asserts that an HTML element text contains the given string
 * @param {Wrapper} wrapper A vue component wrapper instance
 * @param {String} selector The HTML selector, for example, div.a-class
 * @param {String} text The string to assert
 */
export function textContains(wrapper, selector, text) {
  const elementText = wrapper.find(selector).text()
  expect(elementText).toContain(text)
}

/**
 * Creates a mocked axios object to use in tests
 * @param {Object} data The data that the axios call would return. Defaults to empty
 * @param {Number} statusCode The simulated returned status code from API. Defaults to 200
 */
export function createMockedAxios(data = {}, statusCode = 200) {
  return {
    get: jest.fn(() => Promise.resolve({ data, status: statusCode })),
    post: jest.fn(() => Promise.resolve({ data, status: statusCode })),
    patch: jest.fn(() => Promise.resolve({ data, status: statusCode })),
    put: jest.fn(() => Promise.resolve({ data, status: statusCode })),
  }
}

// Ignore promise rejections in test environment as they won't be properly catched
process.on('unhandledRejection', () => {})
