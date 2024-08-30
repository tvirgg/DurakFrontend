import React, { useState, useRef, useEffect } from 'react'
import { useIntl } from 'react-intl'
import UKFlag from '../media/flags/Flag_of_the_United_Kingdom.svg'
import RussiaFlag from '../media/flags/Flag_of_Russia.svg'

const LanguageSwitcher = ({ onChange }) => {
  const { locale } = useIntl()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleChange = (newLocale) => {
    onChange(newLocale)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const languages = [
    { code: 'en', name: 'English', flag: UKFlag },
    { code: 'ru', name: 'Русский', flag: RussiaFlag },
  ]

  return (
    <div
      className={`lang-switcher ${isOpen ? 'open' : ''}`}
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className="lang-switcher__button"
      >
        {locale.toUpperCase()}
      </button>
      <div className="lang-switcher__dropdown">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className="lang-switcher__option"
          >
            <img
              src={lang.flag}
              alt={lang.name}
            />
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
