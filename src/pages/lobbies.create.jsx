import React from "react";
import "../media/css/page/lobbies.create.css";
// Import Swiper React components
import IconEye from "../components/icons/eye";
// import IconAlertCircle from "../components/icons/alertCircle";
import IconArrowDegRight from "../components/icons/arrowDegRight";
import IconRefresh from "../components/icons/refresh";
// UI
import ProgressBar from "../components/ui/progressBar";

// data
import LobbiesLayout from "../layouts/lobbies.layout";
// -
const LobbiesCreate = () => {
  return (
    <LobbiesLayout>
      <div className="create_window">
        <div className="lobby_name">
          <input
            type="text"
            placeholder="Enter lobby name..."
            name="lobby_name"
          />
        </div>
        {/* players / progress-bar */}
        <p>Choose number of players</p>
        <div className="players_number">
          <input type="radio" id="pn1" name="players_number" />
          <label htmlFor="pn1">1</label>
          <input type="radio" id="pn2" name="players_number" />
          <label htmlFor="pn2">2</label>
          <input type="radio" id="pn3" name="players_number" />
          <label htmlFor="pn3">3</label>
          <input type="radio" id="pn4" name="players_number" />
          <label htmlFor="pn4">4</label>
          <input type="radio" id="pn5" name="players_number" />
          <label htmlFor="pn5">5</label>
          <input type="radio" id="pn6" name="players_number" />
          <label htmlFor="pn6">6</label>
        </div>
        {/* bid */}
        <p>Bids currency</p>
        <div className="bid">
          <input type="radio" id="cbid1" name="bid" />
          <label htmlFor="cbid1">Free</label>
          <input type="radio" id="cbid2" name="bid" />
          <label htmlFor="cbid2">DUR</label>
          <input type="radio" id="cbid3" name="bid" />
          <label htmlFor="cbid3">TON</label>
          <input type="radio" id="cbid4" name="bid" />
          <label htmlFor="cbid4">PRM</label>
        </div>
        {/* bids */}
        <p>Bids amount</p>
        <ProgressBar
          values={[0, 1, 10, 100, 500, "1k", "5k", "10k", "50k", "100k"]}
        />
        {/* Game Type */}
        <p>Type</p>
        <div className="game_type">
          <input type="radio" id="cgt1" name="game_type" />
          <label htmlFor="cgt1">
            Classical <IconArrowDegRight />
          </label>
          <input type="radio" id="cgt2" name="game_type" />
          <label htmlFor="cgt2">
            Passing <IconRefresh />
          </label>
        </div>
        <div className="cheating">
          <span className="title">
            Cheating
            <IconEye />
          </span>
          <div className="chekbox">
            <input type="checkbox" id="cheat" name="cheating" />
            <label htmlFor="cheat" className="cheat_label">
              <span className="crc"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="btn_bar">
        <button className="create_btn">Create game</button>
      </div>
    </LobbiesLayout>
  );
};

export default LobbiesCreate;
