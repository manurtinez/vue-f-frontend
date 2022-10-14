/**
 * This middleware prevents access to the success page of
 * payment link unless coming directly from creating one
 */
export default function ({ from, redirect }) {
  if (from.path.toLowerCase() !== '/paymentlink/create') redirect('/')
  return true
}
