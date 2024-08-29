import React from "react";

// css
import "../media/css/component/games.play.cards.css";
// img
import cardImg from "../media/img/games/cardPlayImg.png";
//
import { useNavigate } from "react-router-dom";
// icons

const GamesPlayCards = () => {
  const navigate = useNavigate();
  const linkTourney = () => {
    navigate("/tourneys");
  };
  const linkQuickGame = () => {
    navigate("/game?type=quick");
  };
  return (
    <div className="play_cards">
      <button className="card card_quick anim_sjump" onClick={linkQuickGame}>
        <div className="title">
          <h1>QUICK GAME</h1>
          <h2>play</h2>
        </div>
        <img className="cardImg" src={cardImg} alt="icon" />
      </button>
      <button className="card card_tourneys anim_sjump" onClick={linkTourney}>
        <div className="title">
          <h1>TOURNEYS</h1>
          <h2>play</h2>
        </div>
        <img className="cardImg" src={cardImg} alt="icon" />
      </button>
      <button className="card card_trainings anim_sjump">
        <div className="title">
          <h1>TRAININGs</h1>
          <h2>play</h2>
        </div>
        <img className="cardImg" src={cardImg} alt="icon" />
      </button>
    </div>
  );
};
export default GamesPlayCards;
