import React from 'react'
//
// css
import '../media/css/earn.css'
// components
import Preloader from '../includes/preloader'
// img
import imgCoins from '../media/img/earn/coins.png'
import imgT1 from '../media/img/earn/t1.png'
import imgT2 from '../media/img/earn/t2.png'
import imgT3 from '../media/img/earn/t3.png'
import imgT4 from '../media/img/earn/t4.png'
import imgT5 from '../media/img/earn/t5.png'
import imgT6 from '../media/img/earn/t6.png'
import imgT7 from '../media/img/earn/t7.png'
import imgT8 from '../media/img/earn/t8.png'
import imgT9 from '../media/img/earn/t9.png'
import imgT10 from '../media/img/earn/t10.png'
import imgT11 from '../media/img/earn/t11.png'
import imgT12 from '../media/img/earn/t12.png'
import imgT13 from '../media/img/earn/t13.png'
import imgT14 from '../media/img/earn/t14.png'
import imgT15 from '../media/img/earn/t15.png'
import imgT16 from '../media/img/earn/t16.png'
import imgT17 from '../media/img/earn/t17.png'
import imgT18 from '../media/img/earn/t18.png'
import imgT19 from '../media/img/earn/t19.png'
import imgT20 from '../media/img/earn/t20.png'

// icon
import IconCoin from '../components/icons/coin'
import IconDUR from '../components/icons/dur'
import IconChevronRight from '../components/icons/chevronRight'
import IconUnknownFrame from '../components/icons/unknownFrame.jsx'
import IconUnknownCard from '../components/icons/unknownCard.jsx'
// NavBar
import NavBar from '../components/nav.bar'
import { I18nText } from '../components/i18nText.jsx'

const Earn = () => {
  const tasks = [
    {
      id: 1,
      picture: imgT1,
      title: 'Daily Login',
      info: 'Login in to the game 7 days in a row',
      prize: '+50',
      prize_type: 'DUR',
      category: 'basic',
    },
    {
      id: 2,
      picture: imgT2,
      title: 'First victory',
      info: 'Win one game during the day',
      prize: '+1000',
      prize_type: 'Coin',
      category: 'basic',
    },
    {
      id: 3,
      picture: imgT3,
      title: 'Ready, steady, go!',
      info: 'Play one game in Training mode',
      prize: 'rare avatar frame',
      prize_type: 'IconUnknownFrame',
      category: 'basic',
    },
    // ... добавь все остальные задачи аналогично
  ]

  return (
    <>
      <section className="page earn pb-80">
        <Preloader />
        <div className="container">
          <h1 className="page_title">
            <I18nText path="earn" />
          </h1>
          {/* header */}
          <div className="header_bar anim_sjump">
            <div className="content">
              <img
                className="back_img"
                src={imgCoins}
                alt="imgCoins"
              />
              <p className="coins">
                115/200 <IconCoin />
              </p>
              <span className="per">
                10/
                <I18nText path="per_hour" />
              </span>
            </div>
            <div className="buffs">
              <span>
                <I18nText path="buff_collect" />
              </span>
              <span>
                <I18nText path="buff_speed" />
              </span>
              <span>
                <I18nText path="buff_capacity" />
              </span>
            </div>
          </div>
          {/* tasks */}

          <div className="tasks">
            {/* Basic tasks */}
            <h2>
              <I18nText path="basic_tasks" />
            </h2>
            {/* task */}
            <button className="task anim_sjump">
              <img
                className="picture anim_sjump"
                src={imgT1}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_daily_login_title" />
                </p>
                <span className="info">
                  <I18nText path="task_daily_login_info" />
                </span>
                <div className="prize">
                  +50 <IconDUR />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT2}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_first_victory_title" />
                </p>
                <span className="info">
                  <I18nText path="task_first_victory_info" />
                </span>
                <div className="prize">
                  +1000 <IconCoin />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT3}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_ready_steady_go_title" />
                </p>
                <span className="info">
                  <I18nText path="task_ready_steady_go_info" />
                </span>
                <div className="prize">
                  <I18nText path="rare_avatar" />
                  <IconUnknownFrame />
                </div>
              </div>
              <IconChevronRight />
            </button>
            {/* Special Tasks */}
            <h2>
              <I18nText path="special_tasks" />
            </h2>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT4}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_series_of_victories_title" />
                </p>
                <span className="info">
                  <I18nText path="task_series_of_victories_info" />
                </span>
                <div className="prize">
                  +50
                  <IconDUR />{' '}
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT5}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_game_marathon_title" />
                </p>
                <span className="info">
                  <I18nText path="task_game_marathon_info" />
                </span>
                <div className="prize">
                  <I18nText path="special_table" /> <IconUnknownCard />
                </div>
              </div>
              <IconChevronRight />
            </button>
            {/* Rare Tasks */}
            <h2>
              <I18nText path="special_tasks" />
            </h2>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT6}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_game_veteran_title" />
                </p>
                <span className="info">
                  <I18nText path="task_game_veteran_info" />
                </span>
                <div className="prize">
                  <I18nText path="rare_avatar" />
                  <IconUnknownFrame />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT7}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_rating_leader_title" />
                </p>
                <span className="info">
                  <I18nText path="task_rating_leader_info" />
                </span>
                <div className="prize">
                  +100 <IconDUR />
                </div>
              </div>
              <IconChevronRight />
            </button>
            {/* Relic Tasks */}
            <h2>
              <I18nText path="relic_tasks" />
            </h2>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT8}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_legend_of_the_table_title" />
                </p>
                <span className="info">
                  <I18nText path="task_legend_of_the_table_info" />
                </span>
                <div className="prize">
                  <I18nText path="relic_avatar" /> <IconUnknownFrame />
                </div>
              </div>
              <IconChevronRight />
            </button>

            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT9}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_mythical_player_title" />
                </p>
                <span className="info">
                  <I18nText path="task_mythical_player_info" />
                </span>
                <div className="prize">
                  <I18nText path="relic_card_pattern" />
                  <IconUnknownCard />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT10}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_get_collection_title" />
                </p>
                <span className="info">
                  <I18nText path="task_get_collection_info" />
                </span>
                <div className="prize">
                  +500 <IconDUR />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT11}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_ton_conquerer_title" />
                </p>
                <span className="info">
                  <I18nText path="task_ton_conquerer_info" />
                </span>
                <div className="prize">
                  <I18nText path="relic_table_pattern" />
                </div>
              </div>
              <IconChevronRight />
            </button>
            {/* Specific tasks */}
            <h2>
              <I18nText path="specific_tasks" />
            </h2>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT12}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_prize_for_friends_title" />
                </p>
                <span className="info">
                  <I18nText path="task_prize_for_friends_info" />
                </span>
                <div className="prize">
                  <I18nText path="relic_avatar" />
                  <IconUnknownFrame />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT13}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_constant_player_title" />
                </p>
                <span className="info">
                  <I18nText path="task_constant_player_info" />
                </span>
                <div className="prize">
                  +500
                  <IconDUR />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT14}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_make_supply_title" />
                </p>
                <span className="info">
                  <I18nText path="task_make_supply_info" />{' '}
                </span>
                <div className="prize">+500 </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT15}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_follow_us_title" />
                </p>
                <span className="info">
                  <I18nText path="task_follow_us_info" />{' '}
                </span>
                <div className="prize">
                  +500
                  <IconCoin />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT16}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  {' '}
                  <I18nText path="task_be_in_the_business_title" />
                </p>
                <span className="info">
                  <I18nText path="task_be_in_the_business_info" />{' '}
                </span>
                <div className="prize">
                  +10.000 <IconCoin />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT17}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_the_start_title" />
                </p>
                <span className="info">
                  <I18nText path="task_the_start_info" />{' '}
                </span>
                <div className="prize">
                  <I18nText path="card_pattern" />
                  <IconUnknownCard />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT18}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_player_title" />
                </p>
                <span className="info">
                  <I18nText path="task_player_info" />{' '}
                </span>
                <div className="prize">
                  +15.000 <IconCoin />
                </div>
              </div>
              <IconChevronRight />
            </button>
            {/* Specific tasks */}
            <h2>
              <I18nText path="task_other" />
            </h2>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT19}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_get_the_collection_title" />
                </p>
                <span className="info">
                  <I18nText path="task_get_the_collection_info" />
                </span>
                <div className="prize">
                  +500
                  <IconDUR />
                </div>
              </div>
              <IconChevronRight />
            </button>
            <button className="task anim_sjump">
              <img
                className="picture"
                src={imgT20}
                alt="task_picture"
              />
              <div className="content">
                <p className="title">
                  <I18nText path="task_golden_player_title" />
                </p>
                <span className="info">
                  <I18nText path="task_golden_player_info" />
                </span>
                <div className="prize">
                  +500
                  <IconDUR />
                </div>
              </div>
              <IconChevronRight />
            </button>

            {/* end */}
          </div>
          {/* nav */}
        </div>
      </section>
      <NavBar />
    </>
  )
}
export default Earn
