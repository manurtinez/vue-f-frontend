import { publicUrls } from '~/utils/misc-constants'

/**
 * This middleware will prevent navigation unless the user is logged in.
 * If the user is logged in, but his / her profile isn't complete yet, it will
 * prompt the user to complete it after logging for the first time.
 */
export default function authGuard({ route, store, redirect }) {
  // Url does not require auth
  if (publicUrls.includes(route.path)) return true
  // User is not present in store
  if (!store.state.userStore.loggedUser.id && route.path !== '/login') {
    // Attempt to get token and pass, else ask to login again
    const token = localStorage.getItem('access')
    // If access token is available, store the user and pass
    if (token) {
      store.dispatch('userStore/getCurrentUser')
      return true
    }
    // Else, if there was no token or it failed to refresh it, ask to login again
    redirect('/login')
  }
  // User is logged, but his / her profile is incomplete
  else if (
    !store.state.userStore.loggedUser.is_profile_completed &&
    route.path !== '/completeregister'
  ) {
    redirect('/completeregister')
  }
  return true
}
