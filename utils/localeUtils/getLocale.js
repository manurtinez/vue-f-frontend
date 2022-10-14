import axios from 'axios'

// Array of loaded languages, this prevents fetching the same one more than once.
// More on http://kazupon.github.io/vue-i18n/guide/lazy-loading.html
const loadedLanguages = []

/**
 * This function handles the fetching of the language files, and
 * requests them as needed, implementing lazy loading.
 */
export default async ({ $config: { localesPath }, app }, locale) => {
  // If file was already loaded at some point, don't fetch and just set it
  if (app.i18n.locale === locale || loadedLanguages.includes(locale)) {
    app.i18n.setLocale(locale)
  } else {
    // The location to fetch is defined with the `localesPath` env variable.
    const path = `${localesPath}${locale}.json`
    try {
      const file = await axios.get(path)
      app.i18n.setLocale(locale)
      loadedLanguages.push(locale)
      return file.data
    } catch (err) {
      console.error(
        'There was a problem fetching locale. Fallback to default',
        err
      )
      const fallbackLocale = app.i18n.defaultLocale
      loadedLanguages.push(fallbackLocale)
      app.i18n.setLocale(fallbackLocale)
      return await import('@/locales/' + fallbackLocale + '.json')
    }
  }
}
