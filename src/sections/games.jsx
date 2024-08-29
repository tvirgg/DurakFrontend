import React from "react";
//
import "../media/css/component/filter.window.css";
import "../media/css/games.css";
// components
import GamesPlayCards from "../components/games.play.cards";
import GamesRooms from "../components/games.rooms";
import Preloader from "../includes/preloader";
// NavBar
import NavBar from "../components/nav.bar";

const Games = () => {
  return (
    <section className="page games pb-80">
      <Preloader />
      <div className="container">
        {/* play cards */}
        <GamesPlayCards />
        {/* rooms */}
        <GamesRooms />
        {/* / */}
        <div className="btn_bar">
          <button className="reset">Reset</button>
          <button className="apply">Apply</button>
        </div>
        {/* nav */}
        <NavBar />
      </div>
    </section>
  );
};
export default Games;
