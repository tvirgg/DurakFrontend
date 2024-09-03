import React from 'react'
//
import Preloader from '../includes/preloader.jsx'
// import { Outlet } from "react-router-dom";
import IconCoinDUR from '../components/icons/coinDur'
import IconCoinPRM from '../components/icons/coinPrm'
import IconCoinTON from '../components/icons/coinTon'
import '../media/css/layout/lobbies.layout.css'
import { I18nText } from '../components/i18nText.jsx'

const LobbiesLayout = ({
  tonValue = '0.00',
  prmValue = '0.00',
  durValue = '0.00',
  children,
}) => {
  return (
    <section className="page lobbies">
      <Preloader />
      <div className="container">
        {/* check */}
        <div className="check">
          <div className="vall dur">
            <IconCoinDUR />
            <span className="value">{durValue} DUR</span>
          </div>
        </div>

        {/* content */}
        <div className="page_title">
          <h1 className="title">
            <I18nText path="lobbies" />
          </h1>
          <span>
            <I18nText path="lobbies_tagline" />
          </span>
        </div>

        {/* Additional content injected through props.children */}
        {children}
      </div>
    </section>
  )
}

export default LobbiesLayout
