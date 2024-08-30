import React from 'react'
import './app.css'
import './media/css/animations.css'
// Routes
import Routes from './router/routes'
import LanguageSwitcher from './components/language.switcher'
import Providers from './Prodivers'
function App({ intlProviderValue }) {
  return (
    <main className="App">
      <Routes />
      <LanguageSwitcher onChange={intlProviderValue.setLocale} />
    </main>
  )
}

export default function AppWithProviders() {
  return (
    <Providers>
      <App />
    </Providers>
  )
}
