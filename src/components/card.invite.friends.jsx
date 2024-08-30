import * as React from 'react'
// css
import '../media/css/component/card.invite.friends.css'
// icons
import { useNavigate } from 'react-router-dom'
// img
import ImgPoster from '../media/posters/inviteFriends.svg'
import { I18nText } from './i18nText'

//
const CardInviteFriends = () => {
  const navigate = useNavigate()
  // Define a function to handle navigation
  const handleClick = () => {
    navigate('/subcribe/invite-friends')
  }
  return (
    <button
      className="card_invite"
      onClick={handleClick}
    >
      <div className="texts">
        <h1 className="title">
          <I18nText path="invite" />{' '}
          <span>
            <I18nText path="friends" />
          </span>
        </h1>
        <h3 className="sub">
          <I18nText path="invite_friends_subtitle" />
        </h3>
        <span className="prize">+40 DUR</span>
      </div>
      <img
        className="cardImg"
        src={ImgPoster}
        alt="card"
      />
    </button>
  )
}
export default CardInviteFriends
