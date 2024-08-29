import React, { useState } from "react";
//
import "../media/css/page/lobbies.css";
// icons
import IconListBlack from "../components/icons/listBlack";
import IconChevronRight from "../components/icons/chevronRight";
import IconChevronRightBlack from "../components/icons/chevronRightBlack";
import IconArrowDegRight from "../components/icons/arrowDegRight";
import IconRefresh from "../components/icons/refresh";
// components
import FilterWindow from "../components/lobbies.filter.window";
// data
import rArr from "../db/rooms";
// layout
import LobbiesLayout from "../layouts/lobbies.layout";
import { useNavigate } from "react-router-dom";
// -
const Lobbies = () => {
  const navigate = useNavigate();

  const linkLobbiesCreate = () => {
    navigate("/lobbies/create");
  };

  const [filter, setFilter] = useState("open");

  const getPriceLabel = (price, currency) => {
    if (price === null) return "Free";
    return `${price} ${currency}`;
  };

  const filteredRooms = rArr.filter((room) => room.status === filter);

  // filter_btn
  const toggleFilter = () => {
    let w = document.querySelector(".filter_window"),
      btns = document.querySelector(".btn_bar");
    w.classList.toggle("filter_window_active");
    btns.classList.toggle("fmode");
  };

  return (
    <LobbiesLayout>
      {/* lobbies list */}
      <div className="list pb-80">
        <header className="header">
          <div className="filter_bar">
            <button
              className="filter_btn"
              onClick={() => {
                toggleFilter();
              }}
            >
              filter
              <IconListBlack />
            </button>
          </div>
          {/* / */}
          {/* filter window */}
          {/* / */}
          <FilterWindow />
          {/* / */}
          {/* / */}
          {/* / */}
          <div className="row">
            <button
              className={`btn btn_open ${
                filter === "open" ? "btn_active" : ""
              }`}
              onClick={() => setFilter("open")}
            >
              Open
            </button>
            <button
              className={`btn btn_private ${
                filter === "private" ? "btn_active" : ""
              }`}
              onClick={() => setFilter("private")}
            >
              Private
            </button>
          </div>
        </header>
        {/* list */}
        <div className="rooms_list">
          {filteredRooms.map((room) => (
            <div className="room" key={room.id}>
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
      <div className="btn_bar">
        <div className="filter_btns">
          <button className="reset">Reset</button>
          <button className="apply">Apply</button>
        </div>
        <button className="create_btn" onClick={linkLobbiesCreate}>
          Create your new lobby
          <IconChevronRightBlack />
        </button>
      </div>
    </LobbiesLayout>
  );
};

export default Lobbies;
