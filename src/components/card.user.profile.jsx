import React, { useState } from "react";
// css
import "../media/css/component/card.user.profile.css";
// icons
import IconPlayArrow from "../components/icons/playArrow";
import IconDUR from "../components/icons/dur";
import IconCoin from "./icons/coin";
import IconAdd from "../components/icons/add";
import IconArrowCrook from "../components/icons/arrowCrook";
import IconArrowTraffic from "../components/icons/arrowTraffic";
import IconStarPremium from "../components/icons/starPremium";
// Navigation
import { useNavigate } from "react-router-dom";
// img
import ImgProfile from "../media/img/avatar.png";
import UserFrame from "../game/res/skins/frames/frame-0.svg";

const CardUserProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Navigation handlers
  const linkeDeposit = () => navigate("/deposit");
  const linkWithdraw = () => navigate("/withdraw");
  const linkExchange = () => navigate("/exchange");

  // Modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="card user_profile anim_sjump">
      <div className="row">
        <div className="user_picture">
          <img className="img" src={ImgProfile} alt="user-img" />
          <img className="frame" src={UserFrame} alt="user-frame" />
        </div>
        {/* /user-info */}
        <div className="user_info">
          <p className="user_name">
            PAUL
            <IconStarPremium />
          </p>
          <span className="user_status">
            <IconPlayArrow />
            In Game
          </span>
          <div className="row check">
            <span className="coins_count">
              1.230.200
              <IconCoin />
            </span>
            <span className="dur">
              <IconDUR />
              0.00 DUR
            </span>
          </div>
          <div className="row gr2">
            <button className="cancel_premium" onClick={openModal}>
              Premium
            </button>
            <div className="usdt">
              <span>USDT:</span> 10.99$
            </div>
          </div>
        </div>
      </div>
      <div className="btns">
        <button className="btn_deposit" onClick={linkeDeposit}>
          <IconAdd />
          Deposit
        </button>
        <button className="btn_withdraw" onClick={linkWithdraw}>
          <IconArrowCrook />
          Withdraw
        </button>
        <button className="btn_exchange" onClick={linkExchange}>
          <IconArrowTraffic />
          Exchange
        </button>
      </div>
      {isModalOpen && (
        <div className="premium_cancel_modal">
          <h2>Cancel subscription</h2>
          <div className="btns">
            <button className="btn cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
          <h3>Are you sure?</h3>
          <button className="btn close" onClick={closeModal}>
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
};

export default CardUserProfile;
