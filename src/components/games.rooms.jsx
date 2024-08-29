import React from "react";
import "../media/css/component/games.rooms.css";
import "../media/css/component/rooms.list.css";
import IconSearch from "../components/icons/search";
import IconFilter from "../components/icons/filter";
import IconChevronRight from "./icons/chevronRight";
import IconArrowDegRight from "./icons/arrowDegRight";
import IconPlayWhite from "./icons/playWhite";
import IconDur from "./icons/dur";
import IconCoin from "./icons/coin";
//
import { useNavigate } from "react-router-dom";
//
import FilterWindow from "../components/lobbies.filter.window";

//
const GamesRooms = () => {
  const navigate = useNavigate();

  const linkLobbies = () => {
    navigate("/lobbies");
  };

  const toggleSearchBar = () => {
    const bar = document.querySelector(".search_bar");
    bar.classList.toggle("search_bar_active");
  };

  const roomsData = [
    {
      id: 1,
      price: 5,
      currency: null,
      owner_name: "Christian Bale",
      players_count: 2,
      players_limit: 3,
      status: null,
    },
    {
      id: 2,
      price: null,
      currency: null,
      owner_name: "Christian Bale",
      players_count: 2,
      players_limit: 3,
      status: null,
    },
    {
      id: 3,
      price: 10,
      currency: "DUR",
      owner_name: "Christian Bale",
      players_count: 1,
      players_limit: 2,
      status: null,
    },
    {
      id: 4,
      price: 2,
      currency: "Coin",
      owner_name: "Christian Bale",
      players_count: 2,
      players_limit: 3,
      status: null,
    },
    {
      id: 5,
      price: null,
      currency: null,
      owner_name: "Christian Bale",
      players_count: 2,
      players_limit: 2,
      status: null,
    },
    {
      id: 6,
      price: 1,
      currency: "Coin",
      owner_name: "Christian Bale",
      players_count: 2,
      players_limit: 3,
      status: null,
    },
  ];

  const getPriceContent = (price, currency) => {
    if (price === null) return "Free";
    if (currency === "DUR")
      return (
        <>
          {price}
          <IconDur />
        </>
      );
    if (currency === "Coin")
      return (
        <>
          {price}
          <IconCoin />
        </>
      );
    return price;
  };
  const toggleFilter = () => {
    let w = document.querySelector(".filter_window"),
      btns = document.querySelector(".btn_bar");
    w.classList.toggle("filter_window_active");
    btns.classList.toggle("fmode");
  };
  return (
    <div className="rooms">
      {/* Header */}
      <header className="header anim_sjump">
        <div className="row">
          <h2 className="title">Rooms:</h2>
          <button className="btn_create" onClick={linkLobbies}>
            Create game
          </button>
          <div className="btns">
            <button className="btn_search" onClick={toggleSearchBar}>
              <IconSearch />
            </button>
            <button className="btn_filter" onClick={toggleFilter}>
              <IconFilter />
            </button>
          </div>
        </div>
        <div className="search_bar">
          <input
            type="text"
            name="search"
            className="search_input"
            placeholder="Search room"
          />
        </div>
      </header>
      <FilterWindow />

      {/* list */}
      <div className="rooms_list anim_sjump">
        {roomsData.map((room) => (
          <div className="room" key={room.id}>
            <div className="gr">
              <div className="price">
                {getPriceContent(room.price, room.currency)}
              </div>
              <span className="owner_name">{room.owner_name}</span>
            </div>
            <div className="info">
              <div className="corner">
                {room.players_count < room.players_limit ? (
                  <IconArrowDegRight />
                ) : (
                  <IconPlayWhite />
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
      {/* / */}
    </div>
  );
};

export default GamesRooms;
