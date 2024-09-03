import * as React from 'react'
// icons
import { useNavigate } from 'react-router-dom'
// img
import ImgPoster from '../media/posters/premiumMask.svg'
import { I18nText } from './i18nText'
//
const CardSubcribePremium = () => {
  const navigate = useNavigate()
  // Define a function to handle navigation
  const handleClick = () => {
    navigate('/subcribe/premium')
  }
  return (
    <button
      className="card_premium"
      onClick={handleClick}
    >
      <div className="texts">
        <div className='wrapper'>
          <h1 className="title">Premium</h1>
          <span className="discount">-25%</span>
        </div>
        <div className="prices">
          <span className="old">
            60 TON / <I18nText path="year" />
          </span>
          <span className="new">
            45 TON / <I18nText path="year" />
          </span>
        </div>
      </div>
      <img
        className="cardImg"
        src={ImgPoster}
        alt="card"
      />
    </button>
  )
}
export default CardSubcribePremium
