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
const bids = [0, 1, 10, 100, 500, 1000, 5000, 10000, 50000, 100000];

const LobbiesCreate = () => {
  const [playerAmount, setPlayerAmount] = React.useState(1);
  const [bidCur, setBidCur] = React.useState("Free");
  const [bidAmount, setBidAmount] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
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
  return (
    <LobbiesLayout>
      <div className="create_window">
        <div className="lobby_name">
          <input
            type="text"
            placeholder="Enter lobby name..."
            name="lobby_name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* players / progress-bar */}
        <p>Choose number of players</p>
        <div className="players_number">
          <input type="radio" id="pn1" name="players_number" />
          <label htmlFor="pn1" onClick={() => setPlayerAmount(1)}>
            1
          </label>
          <input type="radio" id="pn2" name="players_number" />
          <label htmlFor="pn2" onClick={() => setPlayerAmount(2)}>
            2
          </label>
          <input type="radio" id="pn3" name="players_number" />
          <label htmlFor="pn3" onClick={() => setPlayerAmount(3)}>
            3
          </label>
          <input type="radio" id="pn4" name="players_number" />
          <label htmlFor="pn4" onClick={() => setPlayerAmount(4)}>
            4
          </label>
          <input type="radio" id="pn5" name="players_number" />
          <label htmlFor="pn5" onClick={() => setPlayerAmount(5)}>
            5
          </label>
          <input type="radio" id="pn6" name="players_number" />
          <label htmlFor="pn6" onClick={() => setPlayerAmount(6)}>
            6
          </label>
        </div>
        {/* bid */}
        <p>Bids currency</p>
        <div className="bid">
          <input type="radio" id="cbid1" name="bid" />
          <label htmlFor="cbid1" onClick={() => setBidCur("Free")}>
            Free
          </label>
          <input type="radio" id="cbid2" name="bid" />
          <label htmlFor="cbid2" onClick={() => setBidCur("premium")}>
            DUR
          </label>
          <input type="radio" id="cbid3" name="bid" />
          <label htmlFor="cbid3" onClick={() => setBidCur("usual")}>
            Usual
          </label>
        </div>
        {/* bids */}
        <p>Bids amount</p>
        <ProgressBar
          values={[0, 1, 10, 100, 500, "1k", "5k", "10k", "50k", "100k"]}
          progress={progress}
          setProgress={bidChanger}
        />
        {/* Game Type */}
        <p>Type</p>
        <div className="game_type">
          <input type="radio" id="cgt1" name="game_type" />
          <label htmlFor="cgt1" onClick={() => setGameType("CLASSIC")}>
            Classical <IconArrowDegRight />
          </label>
          <input type="radio" id="cgt2" name="game_type" />
          <label htmlFor="cgt2" onClick={() => setGameType("PEREVODNOY")}>
            Passing <IconRefresh />
          </label>
          <input type="radio" id="cgt2" name="game_type" />
          <label htmlFor="cgt2" onClick={() => setGameType("PODKIDNOY")}>
            Throwing Extra <IconRefresh />
          </label>
          <input type="radio" id="cgt2" name="game_type" />
          <label htmlFor="cgt2" onClick={() => setGameType("SHULLERS")}>
            With Shullers <IconRefresh />
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
