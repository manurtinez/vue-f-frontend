/**
 * Validates that the email matches a common email format
 * @param {String} emailText The email to check
 */
export const email = (emailText) => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailPattern.test(emailText) || 'El email debe tener un formato válido'
}

/**
 * Validates that a password is at least 8 chars long
 * @param {String} passwordText The password to check
 */
export const passwordLength = (passwordText) =>
  passwordText.length >= 8 || 'La contraseña debe tener al menos 8 caracteres'

/**
 * Validates that a password has at least one uppercase letter
 * @param {String} passwordText The password to check
 */
export const passwordCase = (passwordText) =>
  /[A-Z]/.test(passwordText) ||
  'La contraseña debe contener al menos una mayúscula'

/**
 * Validates that a password has at least one special character
 * @param {String} passwordText The password to check
 */
export const passwordSpecial = (passwordText) =>
  /[!@#$%^&*)(+=._-]/.test(passwordText) ||
  'La contraseña debe contener al menos un carácter especial'

/**
 * Validates that a password has at least one number
 * @param {String} passwordText The password to check
 */
export const passwordNumber = (passwordText) =>
  /[0-9]/.test(passwordText) || 'La contraseña debe contener al menos un número'

/**
 * Makes sure the given value is positive
 * @param {Number} amount Amount to check if its positive
 */
export const checkPositiveAmount = (amount) => !!amount && amount > 0
