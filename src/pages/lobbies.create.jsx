import React from "react";
import "../media/css/page/lobbies.create.css";
// import IconAlertCircle from "../components/icons/alertCircle";
import IconArrowDegRight from "../components/icons/arrowDegRight";
import IconRefresh from "../components/icons/refresh";
// UI
import ProgressBar from "../components/ui/progressBar";
import IconEye from "../components/icons/eye";
// data
import LobbiesLayout from "../layouts/lobbies.layout";
// -
import axios from "axios";
import ShowPopup from "../ShowPopup";
import config from "../config";
import connectToSocket from "../connectToSocket";
import {I18nText} from "../components/i18nText";
import IconPlay from "../components/icons/play";
import IconAlertCircle from "../components/icons/alertCircle";
const bids = [0, 1, 10, 100, 500, 1000, 5000, 10000, 50000, 100000];
const players = [1, 2, 3, 4, 5, 6];

const LobbiesCreate = () => {
  const [playerAmount, setPlayerAmount] = React.useState(1);
  const [bidCur, setBidCur] = React.useState("Free");
  const [bidAmount, setBidAmount] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [progressPlayers, setProgressPlayers] = React.useState(0);
  const [name, setName] = React.useState("Anonim");
  const [gameType, setGameType] = React.useState("CLASSIC");

  const createGame = async () => {
    try {
      await axios
        .post(
          config.url + "/game/create",
          {
            fieldSize: (playerAmount + 1) * 6,
            type: gameType,
            allowedShullerMoves: gameType === "SHULLER" ? 1 : 0,
            betAmount: bidCur === "Free" ? 0 : bidAmount,
            betType: bidCur === "Free" ? "usual" : bidCur,
            name: name.length > 0 ? name : "Anonimus",
          },
          {
            headers: {
              "Access-Control-Expose-Headers": "X-Session",
              "X-Session": localStorage.getItem("session_key"),
            },
          }
        )
        .then((res) => {
          localStorage.setItem("session_key", res.headers.get("X-Session"));
          console.log(res.data);
          localStorage.setItem("game_status", JSON.stringify(res.data));
          window.location.href = `/game?type=quick`;
        });
    } catch (err) {
      localStorage.setItem(
        "session_key",
        err.response.headers.get("X-Session")
      );
      return null;
    }
  };

  const bidChanger = (value) => {
    setBidAmount(bids[value]);
    setProgress(value);
  };

  const playersNumberChanger = (value) => {
    setPlayerAmount(players[value]);
    setProgressPlayers(value);
  };

  return (
    <LobbiesLayout>
      <div className="filter_window create_window">
        <div className="lobby_name">
          <input
              type="text"
              placeholder="Enter lobby name..."
              name="lobby_name"
              onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p>
          <I18nText path="filter_window_choose_number_of_cards"/>
        </p>

        <div className="cards_number">
          <input
              type="radio"
              id="v1"
              name="cards_count"
          />
          <label htmlFor="v1">24</label>
          <input
              type="radio"
              id="v2"
              name="cards_count"
          />
          <label htmlFor="v2">36</label>
          <input
              type="radio"
              id="v3"
              name="cards_count"
          />
          <label htmlFor="v3">52</label>
        </div>

        <p>
          <I18nText path="filter_window_amount_of_players"/>
        </p>

        <ProgressBar
            values={players}
            progress={progressPlayers}
            setProgress={playersNumberChanger}
        />

        <p>
          <I18nText path="filter_window_bid_type"/>
        </p>

        <div className="bid">
          <input type="radio" id="cbid2" name="bid"/>
          <label htmlFor="cbid2" onClick={() => setBidCur("premium")}>
            DUR
          </label>
          <input type="radio" id="cbid3" name="bid" />
          <label htmlFor="cbid3" onClick={() => setBidCur("usual")}>
            <I18nText path="coins_label"/>
          </label>
        </div>

        <p><I18nText path="filter_window_bids_amount"/></p>
        <ProgressBar
          values={[0, 1, 10, 100, 500, "1k", "5k", "10k", "50k", "100k"]}
          progress={progress}
          setProgress={bidChanger}
        />

        <p>
          <I18nText path="filter_window_game_type"/>
        </p>

        <div className="game_type">
          <input type="radio" id="cgt1" name="game_type" />
          <label htmlFor="cgt1" onClick={() => setGameType("CLASSIC")}>
            <I18nText path="filter_window_classical"/> <IconArrowDegRight/>
          </label>
          <input type="radio" id="cgt2" name="game_type" />
          <label htmlFor="cgt2" onClick={() => setGameType("PEREVODNOY")}>
            <I18nText path="filter_window_passing"/> <IconRefresh/>
          </label>
          <input type="radio" id="cgt3" name="game_type" />
          <label htmlFor="cgt3" onClick={() => setGameType("PODKIDNOY")}>
            <I18nText path="filter_window_passing"/> <IconRefresh/>
          </label>
          <input type="radio" id="cgt4" name="game_type" />
          <label htmlFor="cgt4" onClick={() => setGameType("SHULLERS")}>
            <I18nText path="filter_window_with_schullers"/> <IconAlertCircle/>
          </label>
        </div>
      </div>
      <div className="btn_bar">
        <button className="create_btn" onClick={createGame}>
          Create game
        </button>
      </div>
    </LobbiesLayout>
  );
};

export default LobbiesCreate;
