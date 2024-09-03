const defaultMessages = require('@/static/locales/ru.json')

export const getMessagesByLocale = (locale) => {
  try {
    return require(`/src/static/locales/${locale}.json`)
  } catch (error) {
    console.error('Error loading messages for locale', locale, error)

    return defaultMessages
  }
}
