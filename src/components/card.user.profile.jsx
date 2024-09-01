import React, { useEffect, useRef, useState } from 'react'
// css
import '../media/css/component/card.user.profile.css'
// icons
import IconPlayArrow from '../components/icons/playArrow'
import IconDUR from '../components/icons/dur'
import IconCoin from './icons/coin'
import IconAdd from '../components/icons/add'
import IconArrowCrook from '../components/icons/arrowCrook'
import IconArrowTraffic from '../components/icons/arrowTraffic'
import IconStarPremium from '../components/icons/starPremium'
// Navigation
import { useNavigate } from 'react-router-dom'
// img
import ImgProfile from '../media/img/avatar.png'
import UserFrame from '../game/res/skins/frames/frame-0.svg'
import { I18nText } from './i18nText'

const CardUserProfile = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  // Navigation handlers
  const linkeDeposit = () => navigate('/deposit')
  const linkWithdraw = () => navigate('/withdraw')
  const linkExchange = () => navigate('/exchange')

  // Modal handlers
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  return (
    <div className="card user_profile anim_sjump">
      <div className="user_info_container">
        <div className="user_picture">
          <img
            className="img"
            src={ImgProfile}
            alt="user-img"
          />
          <img
            className="frame"
            src={UserFrame}
            alt="user-frame"
          />
        </div>
        <div className="user_info">
          <p className="user_name">
            Paul
            <IconStarPremium />
          </p>
          <span className="user_status">
            <IconPlayArrow />
            <I18nText path="user_profile_in_game" />
          </span>
          <div className="balance_info">
            <span className="coins_count">
              1.230.200
              <IconCoin />
            </span>
            <span className="dur">
              <IconDUR />
              0.00 DUR
            </span>
          </div>
          <div className="premium_usdt">
            <button
              className="cancel_premium"
              onClick={openModal}
            >
              <I18nText path="premium_title" />
            </button>
            <div className="usdt">
              <span>USDT:</span> 10.99$
            </div>
          </div>
        </div>
      </div>
      <div className="btns">
        <button
          className="btn_deposit"
          onClick={linkeDeposit}
        >
          <IconAdd />
          <I18nText path="user_profile_deposit" />
        </button>
        <button
          className="btn_withdraw"
          onClick={linkWithdraw}
        >
          <IconArrowCrook />
          <I18nText path="user_profile_withdraw" />
        </button>
        <button
          className="btn_exchange"
          onClick={linkExchange}
        >
          <IconArrowTraffic />
          <I18nText path="user_profile_exchange" />
        </button>
      </div>
      {isModalOpen && (
        <div className="premium_cancel_modal_overlay">
          <div
            className="premium_cancel_modal"
            ref={modalRef}
          >
            <h2>
              <I18nText path="user_profile_cancel_subscription" />
            </h2>
            <div className="btns">
              <button
                className="btn cancel"
                onClick={closeModal}
              >
                <I18nText path="user_profile_cancel" />
              </button>
            </div>
            <h3>
              <I18nText path="user_profile_are_you_sure" />
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardUserProfile
