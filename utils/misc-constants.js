import { addToDate } from './misc-funcs'

/**
 * These are the options to set an expire date to a payment link
 */
export const expiredOptions = [
  {
    id: 0,
    date: addToDate(1, 'week'),
  },
  {
    id: 1,
    date: addToDate(2, 'week'),
  },
  {
    id: 2,
    date: addToDate(1, 'month'),
  },
]

/**
 * These will be the available options to share links
 * and possibly more things
 */
export const shareOptions = [
  {
    title: 'Whatsapp',
    logo: 'mdi-whatsapp',
    // ! Link message subject to change
    generateLink: (title, amount, link) =>
      `https://wa.me/?text=${encodeURI(
        `¡Hola! Aquí esta el link para el pago de ${title} por $${amount}, ${link}`
      )}`,
  },
  {
    title: 'Facebook',
    logo: 'mdi-facebook',
    // The FB id must be stripped of quotations, as they are added in string env vars
    generateLink: (title, amount, link) =>
      `https://www.facebook.com/dialog/send?app_id=${process.env.fbAppId.replace(
        /^"(.*)"$/,
        ''
      )}&display=popup&link=${link}&redirect_uri=${link}`,
  },
  {
    title: 'Email',
    logo: 'mdi-email-outline',
    // ! Link message subject to change
    generateLink: (title, amount, link) =>
      `mailto:?subject=${encodeURI(title)}&body=${encodeURI(
        `¡Hola! Aquí esta el link para el pago de ${title} por $${amount}, ${link}`
      )}`,
  },
]

/**
 * The various statuses that a payment link can have
 */
export const linkStatuses = {
  active: 'ACT',
  paid: 'PAI',
  canceled: 'CAN',
  expired: 'EXP',
}

/**
 * This array contains the urls that are NOT required to have
 * authentication to access
 * @type {string[]}
 */
export const publicUrls = ['/register', '/login', '/emailsent', '/validation']

/**
 * This array contains the options to be rendered in the side menu of the app
 * Each option is an object with:
 * - icon: A material icon name
 * - title: the key to the option title from the i18n dictionary
 * - to: the app path to redirect when clicking the option
 */
export const sideMenuItems = [
  {
    icon: 'mdi-apps',
    title: 'sideMenuItems.root',
    to: '/',
  },
  {
    icon: 'mdi-bank-transfer-out',
    title: 'sideMenuItems.cashout',
    to: '/cashout',
  },
  {
    icon: 'mdi-bank-transfer-in',
    title: 'sideMenuItems.charge',
    to: '/paymentlink/list',
  },
  {
    icon: 'mdi-currency-usd-circle-outline',
    title: 'sideMenuItems.activity',
    to: '/activity',
  },
]
