import React from "react";

// css
import "../media/css/component/games.play.cards.css";
// img
import cardImg from "../media/img/games/cardPlayImg.png";
//
import { useNavigate } from "react-router-dom";
import { I18nText } from "./i18nText";
import connectQuickGame from "../api/connectQuickGame";

// icons

const GamesPlayCards = () => {
  const navigate = useNavigate();
  const linkTourney = () => {
    navigate("/tourneys");
  };

  const linkQuickGame = async () => {
    try {
      const connectInfo = await connectQuickGame();
      
      localStorage.setItem("game_status", JSON.stringify(connectInfo));
      navigate(`/game?type=quick`);
    } catch (err) {
      localStorage.setItem(
        "session_key",
        err.response.headers.get("X-Session")
      );
      return null;
    }
  };

  return (
    <div className="play_cards">
      <button className="card card_quick anim_sjump" onClick={linkQuickGame}>
        <div className="title">
          <h1>
            <I18nText path="quick_game_title" />
          </h1>
          <h2>
            <I18nText path="quick_game_play" />
          </h2>
        </div>
        <img className="cardImg" src={cardImg} alt="icon" />
      </button>
      <button className="card card_tourneys anim_sjump" onClick={linkTourney}>
        <div className="title">
          <h1>
            <I18nText path="tourneys_title" />
          </h1>
          <h2>
            <I18nText path="quick_game_play" />
          </h2>
        </div>
        <img className="cardImg" src={cardImg} alt="icon" />
      </button>
      <button className="card card_trainings anim_sjump" onClick={linkQuickGame}>
        <div className="title">
          <h1>
            <I18nText path="trainings_title" />
          </h1>
          <h2>
            <I18nText path="quick_game_play" />
          </h2>
        </div>
        <img className="cardImg" src={cardImg} alt="icon" />
      </button>
    </div>
  );
};
export default GamesPlayCards;
