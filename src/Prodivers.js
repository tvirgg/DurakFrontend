import React, { useState, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import enMessages from './static/locales/en.json'
import ruMessages from './static/locales/ru.json'

const messages = {
  en: enMessages,
  ru: ruMessages,
}

const Providers = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      const systemLanguage = navigator.language.split('-')[0]
      return messages[systemLanguage] ? systemLanguage : 'en'
    }
    return 'en' // Fallback для SSR
  })

  const handleChangeLanguage = (newLocale) => {
    setLocale(newLocale)
  }

  const providerValue = useMemo(
    () => ({
      locale,
      setLocale: handleChangeLanguage,
    }),
    [locale],
  )

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { intlProviderValue: providerValue })
          : child,
      )}
    </IntlProvider>
  )
}

export default Providers
