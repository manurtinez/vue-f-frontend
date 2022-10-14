// Hook to handle each route change. Here, functionality can be added to run before each navigation
export function beforeEachHook(to, from, next, store) {
  if (to.path === '/logout') {
    store.dispatch('userStore/logout')
    next('/login')
  } else {
    next()
  }
}

/**
 * This plugin handles the router guards and hooks, and can be extended as needed
 */
export default ({ app, store }) => {
  // Add the beforeEach hook function to the router.
  app.router.beforeEach((to, from, next) =>
    beforeEachHook(to, from, next, store)
  )
}
