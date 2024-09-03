import React from 'react'
import '../media/css/menu.main.css'
import CardUserProfile from '../components/card.user.profile'
import CardPlayQuick from '../components/card.play.quick'
import CardUserRate from '../components/card.user.rate'
import CardUserEarn from '../components/card.user.earn'
import Preloader from '../includes/preloader'
import NavBar from '../components/nav.bar'
import MenuCarousel from '../components/menu.carousel'
import LanguageSwitcher from '../components/language.switcher'
import { useIntlProvider } from '../Prodivers'

const Main = () => {
  const intlProviderValue = useIntlProvider()

  return (
    <>
      <section className="page menu_section pb-80">
        <Preloader />
        <div className="container">
          <LanguageSwitcher onChange={intlProviderValue.setLocale} />

          {/* user-profile */}
          <CardUserProfile />
          {/* Card Carousel */}
          <MenuCarousel />
          {/* Card-Play-Custom */}
          <CardPlayQuick />
          {/* Card-User-Rate /  Cars-User-Earn */}
          <div className="double">
            <CardUserRate />
            <CardUserEarn />
          </div>
        </div>
      </section>
      <NavBar />
    </>
  )
}
export default Main
