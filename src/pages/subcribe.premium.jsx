import React from 'react'
// css
import '../media/css/page/subcribe.premium.css'
// components
import Preloader from '../includes/preloader'
//icons
import IconCheck from '../components/icons/check'
import IconBigBlueChek from '../components/icons/bigBlueCheck'
// img
import ImgPremium from '../media/svg/premium.svg'
//

const PagePremium = () => {
  return (
    <section className="page premium pb-80">
      <Preloader />
      <div className="container">
        <header className="banner anim_sjump">
          <img
            src={ImgPremium}
            alt="img"
          />
          <h1 className="page_title">Durak Premium</h1>
        </header>
        {/* offers */}
        <div className="card offers anim_sjump">
          {/* Monthly */}
          <input
            type="radio"
            name="offer"
            id="mounth"
          />
          <label htmlFor="mounth">
            <div className="offer-container">
              <div className="crc">
                <IconCheck />
              </div>
              <div className="title">
                <p>Monthly</p>
              </div>
            </div>
            <div className="price">
              <span
                className="installment"
                style={{ opacity: 0 }}
              >
                -0%
              </span>
              5.00 TON/month
            </div>
          </label>

          {/* 6 Months */}
          <input
            type="radio"
            name="offer"
            id="sexmounths"
          />
          <label htmlFor="sexmounths">
            <div className="offer-container">
              {' '}
              <div className="crc">
                <IconCheck />
              </div>
              <div className="title">
                <p>6 Months</p>
                <div className="subtext">
                  <span
                    className="old"
                    style={{ textDecoration: 'line-through' }}
                  >
                    30 TON/half a year
                  </span>
                  <br />
                  <span className="new">25 TON/half a year</span>
                </div>
              </div>
            </div>
            <div className="price">
              <span className="installment">-15%</span>
              4.16 TON/month
            </div>
          </label>

          {/* Annual */}
          <input
            type="radio"
            name="offer"
            id="annual"
          />
          <label htmlFor="annual">
            <div className="offer-container">
              <div className="crc">
                <IconCheck />
              </div>
              <div className="title">
                <p>Annual</p>
                <div className="subtext">
                  <span
                    className="old"
                    style={{ textDecoration: 'line-through' }}
                  >
                    60 TON/year
                  </span>
                  <br />
                  <span className="new">45 TON/year</span>
                </div>
              </div>
            </div>
            <div className="price">
              <span className="installment">-25%</span>
              3.75 TON/month
            </div>
          </label>
        </div>
        {/* Features */}
        <div className="group anim_sjump">
          <p className="card_title">Features</p>
          <div className="card features">
            {/* rows */}
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>+100% XP</p>
                <span className="subtext">Get +100% Rating for each game</span>
              </div>
            </div>
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>+50% XP for all players</p>
                <span className="subtext">
                  Every player in the room with you gets +50% Rating for each
                  game
                </span>
              </div>
            </div>
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>Priority</p>
                <span className="subtext">
                  Your rooms are always at the top of the list of games
                </span>
              </div>
            </div>
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>Help during games</p>
                <span className="subtext">
                  We help you with the best advice on how to play
                </span>
              </div>
            </div>
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>Bonuses for friends</p>
                <span className="subtext">
                  Invite friends and get more bonuses for yourself and them
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="subcribe_btn anim_sjump">Subcribe</button>
    </section>
  )
}
export default PagePremium
