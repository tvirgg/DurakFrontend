import React, { useState } from 'react'
import { useIntl } from 'react-intl'

const LanguageSwitcher = ({ onChange }) => {
  const { locale } = useIntl()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleChange = (newLocale) => {
    onChange(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="lang-switcher">
      <button
        onClick={toggleDropdown}
        className="lang-switcher__button"
      >
        {locale.toUpperCase()}
      </button>
      {isOpen && (
        <div className="lang-switcher__dropdown">
          <button
            onClick={() => handleChange('en')}
            className="lang-switcher__option"
          >
            ENG
          </button>
          <button
            onClick={() => handleChange('ru')}
            className="lang-switcher__option"
          >
            RUS
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
