import React, { useState } from "react";
import "../media/css/component/nav.bar.css";
import { useNavigate, useLocation } from "react-router-dom";

// Import images
import menuIcon from "../media/navbar/menu.png";
import menuActiveIcon from "../media/navbar/menuActive.png";
import gamesIcon from "../media/navbar/games.png";
import gamesActiveIcon from "../media/navbar/gamesActive.png";
import profileIcon from "../media/navbar/profile.png";
import profileActiveIcon from "../media/navbar/profileActive.png";
import earnIcon from "../media/navbar/earn.png";
import earnActiveIcon from "../media/navbar/earnActive.png";
import marketIcon from "../media/navbar/market.png";
import marketActiveIcon from "../media/navbar/marketActive.png";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define icon paths
  const btnIcons = {
    menu: menuIcon,
    menuActive: menuActiveIcon,
    games: gamesIcon,
    gamesActive: gamesActiveIcon,
    profile: profileIcon,
    profileActive: profileActiveIcon,
    earn: earnIcon,
    earnActive: earnActiveIcon,
    market: marketIcon,
    marketActive: marketActiveIcon,
  };

  const getActiveIndex = () => {
    switch (location.pathname) {
      case "/games":
        return 1;
      case "/profile":
        return 2;
      case "/earn":
        return 3;
      case "/market":
        return 4;
      default:
        return 0;
    }
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  const handleNavigation = (path, index) => {
    setActiveIndex(index);
    navigate(path);
  };

  return (
    <div className="navbar">
      <button className="btn_menu" onClick={() => handleNavigation("/", 0)}>
        <img
          className="icon"
          src={activeIndex === 0 ? btnIcons.menuActive : btnIcons.menu}
          alt="menu"
        />
        <span>Menu</span>
      </button>
      <button
        className="btn_games"
        onClick={() => handleNavigation("/games", 1)}
      >
        <img
          className="icon"
          src={activeIndex === 1 ? btnIcons.gamesActive : btnIcons.games}
          alt="games"
        />
        <span>Games</span>
      </button>
      <button
        className="btn_profile"
        onClick={() => handleNavigation("/profile", 2)}
      >
        <img
          className="icon"
          src={activeIndex === 2 ? btnIcons.profileActive : btnIcons.profile}
          alt="profile"
        />
        <span>Profile</span>
      </button>
      <button className="btn_earn" onClick={() => handleNavigation("/earn", 3)}>
        <img
          className="icon"
          src={activeIndex === 3 ? btnIcons.earnActive : btnIcons.earn}
          alt="earn"
        />
        <span>Earn</span>
      </button>
      <button
        className="btn_market"
        onClick={() => handleNavigation("/market", 4)}
      >
        <img
          className="icon"
          src={activeIndex === 4 ? btnIcons.marketActive : btnIcons.market}
          alt="market"
        />
        <span>Market</span>
      </button>
    </div>
  );
};

export default NavBar;
