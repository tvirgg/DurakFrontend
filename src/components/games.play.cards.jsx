import React from "react";

// css
import "../media/css/component/games.play.cards.css";
// img
import cardImg from "../media/img/games/cardPlayImg.png";
//
import { useNavigate } from "react-router-dom";
import { I18nText } from "./i18nText";
import connectQuickGame from "../api/connectQuickGame";
import axios from "axios";
import config from "../config";
// icons

const GamesPlayCards = () => {
  const navigate = useNavigate();
  const linkTourney = () => {
    navigate("/tourneys");
  };
  const linkQuickGame = async () => {
    try {
      const connectInfo = await connectQuickGame();
      const createGameInfo = await axios
          .post(
              config.url + "/game/create",
              {
                fieldSize: connectInfo?.fieldSize || 24,
                type: connectInfo?.type,
                allowedShullerMoves: connectInfo?.allowedShullerMoves,
                betAmount: connectInfo?.betAmount,
                betType: connectInfo?.betType,
                name: connectInfo?.name,
                playerAmount: connectInfo?.playerAmount,
              },
              {
                headers: {
                  "Access-Control-Expose-Headers": "X-Session",
                  "X-Session": localStorage.getItem("session_key"),
                },
              }
          )
      localStorage.setItem("session_key", createGameInfo.headers.get("X-Session"));
      console.log(createGameInfo.data);
      localStorage.setItem("game_status", JSON.stringify(createGameInfo.data));
      navigate("/game?type=quick");
    } catch (e) {
      console.log(e);
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
