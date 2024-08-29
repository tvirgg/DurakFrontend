import React from "react";
// img
import IconCoin from "../components/icons/coin";

const CardUserEarn = () => {
  return (
    <div className="card_user_earn anim_sjump">
      <h1>EARN</h1>
      <div className="progress_bar">
        <div className="progress"></div>
      </div>
      <div className="earn_check">
        115/200
        <IconCoin />
      </div>
      <span className="perhour">10/per hour</span>
    </div>
  );
};
export default CardUserEarn;
