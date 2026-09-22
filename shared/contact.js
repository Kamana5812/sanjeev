export const DEPARTMENTS = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'Dermatology', 'Gynecology', 'General Medicine', 'Diagnostic Services',
]
export const EMPTY_CONTACT = {
  name: '', phone: '', email: '', department: '', message: '', website: '',
}
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
const controlCharacters = /[\u0000-\u001f\u007f]/u // eslint-disable-line no-control-regex
export function isEmail(value) {
  return typeof value === 'string' && value.length <= 254 &&
    !controlCharacters.test(value) && emailPattern.test(value)
}
// Both browser and server use these rules. Untrusted values may not be strings.
export function validateContact(input) {
  const source = input && typeof input === 'object' && !Array.isArray(input) ? input : {}
  const data = Object.fromEntries(Object.keys(EMPTY_CONTACT).map(key => [
    key, typeof source[key] === 'string' ? source[key].trim() : '',
  ]))
  const errors = {}
  if (data.name.length < 2 || data.name.length > 50 || controlCharacters.test(data.name)) {
    errors.name = 'Enter a name between 2 and 50 characters.'
  }
  const digits = data.phone.replace(/\D/g, '')
  if (!/^\+?[\d ()-]+$/.test(data.phone) || digits.length < 10 || digits.length > 15 || data.phone.length > 25) {
    errors.phone = 'Enter a phone number with 10 to 15 digits.'
  }
  if (!isEmail(data.email)) errors.email = 'Enter a valid email address (up to 254 characters).'
  if (!DEPARTMENTS.includes(data.department)) errors.department = 'Select a department from the list.'
  if (data.message.length < 5 || data.message.length > 1000) {
    errors.message = 'Enter a message between 5 and 1,000 characters.'
  }
  if (data.website || (source.website !== undefined && typeof source.website !== 'string')) {
    errors.website = 'Unable to accept this submission.'
  }
  return { data, errors, valid: Object.keys(errors).length === 0 }
}