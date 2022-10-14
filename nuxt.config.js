import es from 'vuetify/es5/locale/es'

import { locales } from './utils/localeUtils/localesList.js'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  // Router params, like middleware, plugins, etc
  router: {
    middleware: 'authenticationGuard',
    extendRoutes(routes) {
      // The logout route doesn't have a component, it just handles logout action
      routes.push({
        name: 'logout',
        path: '/logout',
      })
    },
  },

  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  // !! This information is subject to change, consult the content
  head: {
    titleTemplate: '%s - Foxtrot',
    title: 'Foxtrot',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'The description for the Foxtrot page goes here',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/style/global.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/globalURLs.js',
    '~/plugins/axiosInterceptor.js',
    '~/plugins/routeGuard.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', 'portal-vue/nuxt', 'nuxt-i18n'],

  // i18n configuration (https://i18n.nuxtjs.org/options-reference)
  i18n: {
    // ! TODO in production, this should contain the prod URL, improves SEO
    // baseUrl: '',
    locales,
    defaultLocale: 'es',
    lazy: true,
    strategy: 'no_prefix',
    langDir: 'utils/localeUtils/',
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: 'es',
      onlyOnRoot: true,
      useCookie: true,
      cookieKey: 'foxtrot-i18n',
      cookieSecure: true,
    },
    vueI18n: {
      fallbackLocale: 'es',
    },
  },

  // Public env vars
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    apiName: process.env.API_NAME,
    currentApiVersion: process.env.CURRENT_API_VERSION,
    localesPath: process.env.LOCALES_PATH,
    // THIS ENV WILL CONTAIN THE PRODUCTION DOMAIN FOR THE PAGE, CAN BE CHANGED WHEN NEEDED
    pageDomain: process.env.PAGE_DOMAIN || 'https://www.foxtrot.com/',
  },

  // Env vars to use outside nuxt context
  env: {
    fbAppId: process.env.FB_APP_ID,
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    treeShake: true,
    // customVariables: ['~/assets/style/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#FF427B',
          secondary: '#56296E',
          lightGrey: '#868B91',
          green: '#38CFDA',
        },
      },
    },
    lang: {
      locales: { es },
      current: 'es',
    },
  },

  // build source map with webpack for web debugging
  configureWebpack: {
    devtool: 'source-map',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
