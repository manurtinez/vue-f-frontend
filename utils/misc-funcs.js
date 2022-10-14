import dayjs from 'dayjs'

/**
 * This function returns whether the give object is empty or not
 * @param {Object} obj An object to test for empty
 */
export function isEmpty(obj) {
  if (!obj) return true
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * This function returns the current date plus a wanted number of time
 * @param {Number} amount Number of weeks / months to add
 * @param {'day' | 'week' | 'month' | 'year'} type Type of time to add (from dayjs lib https://day.js.org/docs/en/manipulate/add)
 */
export function addToDate(amount, type) {
  return dayjs().add(amount, type)
}

/**
 * This function takes an expire date, and parses it to a string according to the amount of days
 * remaining until said date.
 * @param {String} expirationDate A date string, can be in ISO form or any commonly used date format.
 * @param {Number} limit The limit of days, if the diff is below, returns day count, otherwise returns the date
 * @returns {String} Returns a formatted string of the expire date
 */
export function expireAsString(expirationDate, limit) {
  if (!expirationDate) return 'Sin fecha de vencimiento'
  const expAsDate = dayjs(expirationDate)
  const diff = -this.today.diff(expAsDate, 'day')
  return diff > limit
    ? `Vence el ${expAsDate.format('DD/MM/YYYY')}`
    : `Vence en ${diff} días`
}

/**
 * Formats the given date with the app current locale and returns long form
 * @param date An ISO string for a date
 * @param locale The app locale. When invoked, can be accessed by this.$i18n.locale from script or
 * $i18n.locale from template
 * @returns {string} A long stringified form of the date
 */
export function getLocalizedDate(date, locale) {
  const parsedDate = new Date(date)
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  // If the movement is from a year different than the current one, add the year
  if (dayjs().get('year') !== parsedDate.getFullYear()) options.year = 'numeric'
  return parsedDate.toLocaleDateString(locale, options)
}
