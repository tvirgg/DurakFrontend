import React from "react";
// Import Swiper React components
import IconPlay from "./icons/play";
import IconAlertCircle from "./icons/alertCircle";
import IconArrowDegRight from "./icons/arrowDegRight";
import IconRefresh from "./icons/refresh";
// UI
import ProgressBar from "./ui/progressBar";
//
import { XLg } from "react-bootstrap-icons";

//
const FilterWindow = () => {
  const toggleFilter = () => {
    let w = document.querySelector(".filter_window"),
      btns = document.querySelector(".btn_bar");
    w.classList.toggle("filter_window_active");
    btns.classList.toggle("fmode");
  };
  return (
    <div className="filter_window">
      <button className="close_btn" onClick={toggleFilter}>
        <XLg fill="#fff5" />
      </button>
      <p>Choose number of cards</p>
      <div className="cards_number">
        <input type="radio" id="v1" name="cards_count" />
        <label htmlFor="v1">24</label>
        <input type="radio" id="v2" name="cards_count" />
        <label htmlFor="v2">36</label>
        <input type="radio" id="v3" name="cards_count" />
        <label htmlFor="v3">52</label>
      </div>
      {/* players / progress-bar */}
      <p>Amount of players</p>
      <ProgressBar values={[1, 2, 3, 4, 5, 6]} />
      {/* bid */}
      <p>Bid type</p>
      <div className="bid">
        <input type="radio" id="bid1" name="bid" />
        <label htmlFor="bid1">DUR</label>
        <input type="radio" id="bid2" name="bid" />
        <label htmlFor="bid2">Coins</label>
      </div>
      {/* bids */}
      <p>Bids amount</p>
      <ProgressBar
        values={[0, 1, 10, 100, 500, "1k", "5k", "10k", "50k", "100k"]}
      />
      {/* Game Type */}
      <p>Game type</p>
      <div className="game_type">
        <input type="radio" id="gt1" name="game_type" />
        <label htmlFor="gt1">
          Classical <IconArrowDegRight />
        </label>
        <input type="radio" id="gt2" name="game_type" />
        <label htmlFor="gt2">
          Passing <IconRefresh />
        </label>
        <input type="radio" id="gt3" name="game_type" />
        <label htmlFor="gt3">
          Throwing extra <IconPlay />
        </label>
        <input type="radio" id="gt4" name="game_type" />
        <label htmlFor="gt4">
          With schullers <IconAlertCircle />
        </label>
      </div>
    </div>
  );
};
export default FilterWindow;
