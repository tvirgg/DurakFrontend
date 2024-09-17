import React, { useEffect, useRef, useState } from "react";
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
import balanceOwned from "../api/balanceOwned";
// Navigation
import { useNavigate } from "react-router-dom";
// img
import ImgProfile from "../media/img/avatar.png";
import { I18nText } from "./i18nText";
import getCosmeticActive from "../api/cosmeticActive";

const CardUserProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [activeCosmetic, setActiveCosmetic] = useState();
  const [activeBalance, setActiveBalance] = useState();

  useEffect(() => {
    async function fetch() {
      const data = await getCosmeticActive();
      const data2 = await balanceOwned();
      setActiveBalance(data2);
      setActiveCosmetic(data);
      console.log(data);
    }

    setTimeout(() => {
      fetch();
    }, 2000);
  }, []);

  // Navigation handlers
  const linkeDeposit = () => navigate("/deposit");
  const linkWithdraw = () => navigate("/withdraw");
  const linkExchange = () => navigate("/exchange");

  // Modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="card user_profile anim_sjump">
      <div className="user_info_container">
        <div className="user_picture">
          <img
            className="img"
            src={
              userInfo?.tgNickname
                ? `https://t.me/i/userpic/160/${userInfo?.tgNickname}.jpg`
                : ImgProfile
            }
            alt="user-img"
          />
          <img
            className="frame"
            src={`/res/skins/${
              activeCosmetic && activeCosmetic[0]
                ? activeCosmetic[0].cosmetic.link
                : "/frames/frame-0.svg"
            }`}
            alt="user-frame"
          />
        </div>
        <div className="user_info">
          <p className="user_name">
            {userInfo?.tgNickname || "-"}
            {userInfo?.isPremium && <IconStarPremium />}
          </p>
          <span className="user_status">
            <IconPlayArrow />
            {userInfo?.status}
          </span>
          <div className="balance_info">
            <span className="coins_count">
              {activeBalance?.usualBalance || 0}
              <IconCoin />
            </span>
            <span className="dur">
              <IconDUR /> {activeBalance?.premiumBalanceReturnable || 0} DUR
            </span>
          </div>
          <div className="premium_usdt">
            {userInfo?.isPremium && (
              <button className="cancel_premium" onClick={openModal}>
                <I18nText path="premium_title" />
              </button>
            )}
            {userInfo?.premiumBalance && (
              <div className="usdt">
                <span>USDT:</span> {userInfo?.premiumBalance}$
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="btns">
        <button className="btn_deposit" onClick={linkeDeposit}>
          <IconAdd />
          <I18nText path="user_profile_deposit" />
        </button>
        <button className="btn_withdraw" onClick={linkWithdraw}>
          <IconArrowCrook />
          <I18nText path="user_profile_withdraw" />
        </button>
        <button className="btn_exchange" onClick={linkExchange}>
          <IconArrowTraffic />
          <I18nText path="user_profile_exchange" />
        </button>
      </div>
      {isModalOpen && (
        <div className="premium_cancel_modal_overlay">
          <div className="premium_cancel_modal" ref={modalRef}>
            <h2>
              <I18nText path="user_profile_cancel_subscription" />
            </h2>
            <div className="btns">
              <button className="btn cancel" onClick={closeModal}>
                <I18nText path="user_profile_cancel" />
              </button>
            </div>
            <h3>
              <I18nText path="user_profile_are_you_sure" />
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardUserProfile;
