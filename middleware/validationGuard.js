/**
 * This middleware prevents access to the "/validation" path,
 * unless the user is coming directly from succeeding in registering,
 * OR via the verification email
 */
export default function ({ redirect, from, query }) {
  if (from.name !== 'register' && from.name !== 'validation' && !query.q)
    redirect({ path: '/register' })
}
