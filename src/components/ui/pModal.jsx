import React, { useRef, useEffect } from 'react'
// css
import '../../media/css/ui/pModal.css'
// Assume pSucces and pFail are imported images
import pSucces from '../../media/img/profile/pSucces.png'
import pFail from '../../media/img/icons/coinGold.png'
import { I18nText } from '../i18nText'

const PModal = ({ isActive, type, closeModal, succesText }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive, closeModal])

  if (!isActive) return null

  return (
    <div className="p_verify_modal modal_active">
      <div ref={modalRef}>
        {type === 'success' ? (
          <div className="modal success active">
            <img
              src={pSucces}
              alt="Success"
            />
            <h1>
              <I18nText path="congratulations" />
            </h1>
            <h2>
              <I18nText path="new_item" />
            </h2>
            <button
              className="close_btn"
              onClick={closeModal}
            >
              <I18nText path="user_profile_close" />
            </button>
          </div>
        ) : (
          <div className="modal fail active">
            <img
              src={pFail}
              alt="Fail"
            />
            <h1>
              <I18nText path="sorry_message" />
            </h1>
            <h2>
              <I18nText path="insufficient_balance" />
            </h2>
            <button
              className="close_btn"
              onClick={closeModal}
            >
              <I18nText path="user_profile_close" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PModal
