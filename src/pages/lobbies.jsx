import React, { useState } from 'react'
//
import '../media/css/page/lobbies.css'
// icons
import IconListBlack from '../components/icons/listBlack'
import IconChevronRight from '../components/icons/chevronRight'
import IconChevronRightBlack from '../components/icons/chevronRightBlack'
import IconArrowDegRight from '../components/icons/arrowDegRight'
import IconRefresh from '../components/icons/refresh'
// components
import FilterWindow from '../components/lobbies.filter.window'
// data
import rArr from '../db/rooms'
// layout
import LobbiesLayout from '../layouts/lobbies.layout'
import { useNavigate } from 'react-router-dom'
import { I18nText } from '../components/i18nText'
// -
const Lobbies = () => {
  const navigate = useNavigate()

  const linkLobbiesCreate = () => {
    navigate('/lobbies/create')
  }

  const [filter, setFilter] = useState('open')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const getPriceLabel = (price, currency) => {
    if (price === null) return 'Free'
    return `${price} ${currency}`
  }

  const filteredRooms = rArr.filter((room) => room.status === filter)

  // filter_btn
  const toggleFilter = () => {
    let w = document.querySelector('.filter_window'),
      btns = document.querySelector('.btn_bar')
    w.classList.toggle('filter_window_active')
    btns.classList.toggle('fmode')
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <LobbiesLayout>
      {/* lobbies list */}
      <div className="list pb-80">
        <header className="header">
          <div className="filter_bar">
            <button
              className="filter_btn"
              onClick={() => {
                toggleFilter()
              }}
            >
              <I18nText path="filter_button" />
              <IconListBlack />
            </button>
          </div>
          {/* / */}
          {/* filter window */}
          {/* / */}
          <FilterWindow
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
          {/* / */}
          {/* / */}
          {/* / */}
          <div className="row">
            <button
              className={`btn btn_open ${
                filter === 'open' ? 'btn_active' : ''
              }`}
              onClick={() => setFilter('open')}
            >
              <I18nText path="open_label" />
            </button>
            <button
              className={`btn btn_private ${
                filter === 'private' ? 'btn_active' : ''
              }`}
              onClick={() => setFilter('private')}
            >
              <I18nText path="private_label" />
            </button>
          </div>
        </header>
        {/* list */}
        <div className="rooms_list">
          {filteredRooms.map((room) => (
            <div
              className="room"
              key={room.id}
            >
              <div className="gr">
                <div className="price">
                  {getPriceLabel(room.price, room.currency)}
                </div>
                <span className="owner_name">{room.owner_name}</span>
              </div>
              <div className="info">
                <div className="corner">
                  {room.players_count < room.players_limit ? (
                    <IconArrowDegRight />
                  ) : (
                    <IconRefresh />
                  )}
                </div>
                <div className="players_count">{`${room.players_count}/${room.players_limit}`}</div>
                <button className="sign_btn">
                  <IconChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* / */}
      {/* btn_bar */}
      {/* btn_bar */}
      {!isFilterOpen && (
        <div className="btn_bar">
          <button
            className="create_btn"
            onClick={linkLobbiesCreate}
          >
            <I18nText path="create_lobby_button" />
            <IconChevronRightBlack />
          </button>
        </div>
      )}
    </LobbiesLayout>
  )
}

export default Lobbies
