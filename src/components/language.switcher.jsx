import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import UKFlag from '../media/flags/Flag_of_the_United_Kingdom.svg'
import RussiaFlag from '../media/flags/Flag_of_Russia.svg'

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
            <span>
              <img
                src={UKFlag}
                alt=""
              />
            </span>
            EN
          </button>
          <button
            onClick={() => handleChange('ru')}
            className="lang-switcher__option"
          >
            <span>
              <img
                src={RussiaFlag}
                alt=""
              />
            </span>
            RU
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
