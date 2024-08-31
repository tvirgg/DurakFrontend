import React from 'react'
import '../media/css/page/lobbies.create.css'
// import IconAlertCircle from "../components/icons/alertCircle";
import IconArrowDegRight from '../components/icons/arrowDegRight'
import IconRefresh from '../components/icons/refresh'
// UI
import ProgressBar from '../components/ui/progressBar'

// data
import LobbiesLayout from '../layouts/lobbies.layout'
// -
const LobbiesCreate = () => {
  return (
    <LobbiesLayout>
      <div className="create_window">
        <p>Choose number of cards</p>
        <div className="number-cards">
          <input
            type="radio"
            id="cards1"
            name="card"
          />
          <label htmlFor="cards1">24</label>
          <input
            type="radio"
            id="cards2"
            name="card"
          />
          <label htmlFor="cards2">36</label>
          <input
            type="radio"
            id="cards3"
            name="card"
          />
          <label htmlFor="cards3">52</label>
        </div>
        {/* players / progress-bar */}
        <p>Amount of players</p>
        <ProgressBar values={[1, 2, 3, 4, 5, 6]} />
        {/* bid */}
        <p>Bids currency</p>
        <div className="bid">
          <input
            type="radio"
            id="cbid1"
            name="bid"
          />
          <label htmlFor="cbid1">DUR</label>
          <input
            type="radio"
            id="cbid2"
            name="bid"
          />
          <label htmlFor="cbid2">Coins</label>
        </div>
        {/* bids */}
        <p>Bids amount</p>
        <ProgressBar
          values={[0, 1, 10, 100, 500, '1k', '5k', '10k', '50k', '100k']}
        />
        {/* Game Type */}
        <p>Game Type</p>
        <div className="game_type">
          <input
            type="radio"
            id="cgt1"
            name="game_type"
          />
          <label htmlFor="cgt1">
            Classical <IconArrowDegRight />
          </label>
          <input
            type="radio"
            id="cgt2"
            name="game_type"
          />
          <label htmlFor="cgt2">
            Passing <IconRefresh />
          </label>
          <input
            type="radio"
            id="cgt2"
            name="game_type"
          />
          <label htmlFor="cgt2">
            Throwing extra <IconRefresh />
          </label>
          <input
            type="radio"
            id="cgt2"
            name="game_type"
          />
          <label htmlFor="cgt2">
            With schullers <IconRefresh />
          </label>
        </div>
        <div className="btns_wrapper">
          <button className="reset_button">Reset</button>
          <button className="apply_button">Apply</button>
        </div>
      </div>
      <div className="btn_bar">
        <button className="create_btn">Create game</button>
      </div>
    </LobbiesLayout>
  )
}

export default LobbiesCreate
