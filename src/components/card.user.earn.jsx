import React from 'react'
// img
import IconCoin from '../components/icons/coin'
import { I18nText } from './i18nText'

const CardUserEarn = () => {
  return (
    <div className="card_user_earn anim_sjump">
      <h1 style={{ textTransform: 'uppercase' }}>
        <I18nText path="earn" />
      </h1>
      <div className="progress_bar">
        <div className="progress"></div>
      </div>
      <div className='earn_info'>
        <div className="earn_check">
          115/200
          <IconCoin />
        </div>
        <span className="perhour">
          10/
          <I18nText path="per_hour" />
        </span>
      </div>
    </div>
  )
}
export default CardUserEarn
