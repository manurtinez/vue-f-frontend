/**
 * This array defines the available languages in the app.
 * Whenever a new language is implemented, a new entry MUST be added
 * with the following attributes:
 * - code: The unique identifier for the language
 * - name: The display name for the language, for example, in a lang selector
 * - iso: The language code according to ISO 639 and ISO 3166-1 standards, separated by "-"
 * - file: This will always contain the file that fetches the *real* language files, "getLocale"
 * - dir: The direction of the writing (left to right: ltr, right to left: rtl, or auto)
 * - isCatchallLocale: This attribute sets the hreflang header in the page. Should be true only on
 * the default language.
 */
export const locales = [
  {
    code: 'es',
    name: 'Español',
    iso: 'es-AR',
    file: 'getLocale',
    dir: 'auto',
    isCatchallLocale: true,
  },
]
