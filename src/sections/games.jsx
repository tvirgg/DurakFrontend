import React from 'react'
//
import '../media/css/component/filter.window.css'
import '../media/css/games.css'
// components
import GamesPlayCards from '../components/games.play.cards'
import GamesRooms from '../components/games.rooms'
import Preloader from '../includes/preloader'
// NavBar
import NavBar from '../components/nav.bar'
import { I18nText } from '../components/i18nText'

const Games = () => {
  return (
    <section className="page games pb-80">
      <Preloader />
      <div className="container">
        {/* play cards */}
        <GamesPlayCards />
        {/* rooms */}
        <GamesRooms />
        {/* / */}
        <div className="btn_bar">
          <button className="reset">
            <I18nText path="reset_button" />
          </button>
          <button className="apply">
            <I18nText path="apply_button" />
          </button>
        </div>
        {/* nav */}
        <NavBar />
      </div>
    </section>
  )
}
export default Games
