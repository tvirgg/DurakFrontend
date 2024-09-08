import React, { useState, useRef, useEffect } from "react";
import catFrame from "../media/img/catFrame.png";
import catTable from "../media/img/catTable.png";
import catCard from "../media/img/catCard.png";
import catEmoji from "../media/img/catEmoji.png";
import PModal from "./ui/pModal";
import { I18nText } from "./i18nText";
import { getMarket, buyItemForFriend } from "../api/market";
import IconCoin from "./icons/coin";
import IconCoinDUR from "./icons/coinDur";

const ProfileWindows = () => {
  const [present, setPresent] = useState({
    userId: null,
    cat: null,
    lvl: null,
    pid: null,
    availablePresents: [],
  });

  const [modalState, setModalState] = useState({
    isActive: false,
    type: null,
    succesText: <I18nText path="new_item" />,
  });

  const [windowActive, setWindowActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const windowsRef = useRef(null);

  const [presentsArray, setPresentsArray] = useState();

  useEffect(() => {
    async function fetchMarket() {
      const data = await getMarket();
      setPresentsArray(data);
    }

    setTimeout(() => {
      fetchMarket();
    }, 1500);
  }, []);

  const catBtns = [
    { label: <I18nText path="gift_frames" />, cat: "frame", img: catFrame },
    { label: <I18nText path="gift_tables" />, cat: "table", img: catTable },
    { label: <I18nText path="gift_cards" />, cat: "card", img: catCard },
    { label: <I18nText path="gift_emojis" />, cat: "emoji", img: catEmoji },
  ];

  const lvlBtns = [
    { label: "Standard", lvl: "standard" },
    { label: "Special", lvl: "special" },
    { label: "Relic", lvl: "relic" },
    { label: "Rare", lvl: "rare" },
  ];

  const catSelect = cat => {
    const filteredPresents = presentsArray.filter(
      presentItem => presentItem.cosmetic.type === cat
    );

    setPresent(prevPresent => ({
      ...prevPresent,
      cat: cat,
      availablePresents: filteredPresents,
    }));
  };

  const lvlSelect = lvl => {
    const filteredPresents = present.availablePresents.filter(
      presentItem => presentItem.cosmetic.rarity === lvl
    );

    setPresent(prevPresent => ({
      ...prevPresent,
      lvl: lvl,
      availablePresents: filteredPresents,
    }));
  };

  const presentSelect = pid => {
    setPresent(prevPresent => ({
      ...prevPresent,
      pid: pid,
    }));
    console.log(pid);
  };

  const handleSendPresent = async () => {
    const selectedPresent = present.availablePresents.filter(
      presentItem => presentItem.id === present.pid
    )[0];

    console.log(selectedPresent);
    const selectedFriendId = localStorage.getItem("selected_friend");

    try {
      await buyItemForFriend({
        id: selectedPresent.id,
        userId: selectedFriendId,
      });

      setModalState({
        isActive: true,
        type: "success",
        succesText: "You’ve sent the present!",
      });
      setPresent({
        cat: null,
        lvl: null,
        pid: null,
        availablePresents: [],
      });
      setCurrentSlide(0);
      setWindowActive(false);
      localStorage.setItem("selected_friend", "");
    } catch (error) {
      setPresent({
        cat: null,
        lvl: null,
        pid: null,
        availablePresents: [],
      });
      setCurrentSlide(0);
      setWindowActive(false);
      setModalState({ isActive: true, type: "fail" });
    }
  };

  const closeModal = () => {
    setModalState({ isActive: false, type: null });
    setCurrentSlide(0);
  };

  const closeWindow = () => {
    if (windowsRef.current.classList.contains("windows_active")) {
      setWindowActive(false);
      document
        .querySelector(".profile_section .windows")
        .classList.remove("windows_active");

      setPresent({
        cat: null,
        lvl: null,
        pid: null,
        availablePresents: [],
      });

      closeModal();
    }
  };

  const renderPresents = () => {
    const evenPresents = [];
    const oddPresents = [];

    present.availablePresents.forEach((presentItem, index) => {
      const button = (
        <button
          key={index}
          className={`pbtn ${present.pid === presentItem.id ? "p_active" : ""}`}
          onClick={() => presentSelect(presentItem.id)}
        >
          <img src={`/res/skins${presentItem.cosmetic.link}`} alt="present" />
          <span>
            {presentItem.price}{" "}
            {presentItem.priceCurrency === "usual" ? (
              <IconCoin />
            ) : presentItem.priceCurrency === "premium" ? (
              <IconCoinDUR />
            ) : (
              "$"
            )}
          </span>
        </button>
      );

      if (index % 2 === 0) {
        evenPresents.push(button);
      } else {
        oddPresents.push(button);
      }
    });

    return (
      <>
        <div className="row">{evenPresents}</div>
        <div className="row">{oddPresents}</div>
      </>
    );
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div className="slide choose_cat slide_active">
            <p className="title">
              <I18nText path="profile_windows_choose_category_of_present" />
            </p>
            <div className="btns">
              {catBtns.map((btn, index) => (
                <button
                  key={index}
                  className={`btn ${btn.cat} ${
                    present.cat === btn.cat ? "cat_active" : ""
                  }`}
                  onClick={() => catSelect(btn.cat)}
                >
                  <span>{btn.label}</span>
                  <img src={btn.img} alt={btn.label} />
                </button>
              ))}
            </div>
            <div className="button_container">
              <button
                className="sbtn next_btn"
                onClick={() => setCurrentSlide(1)}
                disabled={!present.cat}
                style={{
                  backgroundColor: present.cat ? "var(--blue-light)" : "#ccc",
                  cursor: present.cat ? "pointer" : "not-allowed",
                }}
              >
                <I18nText path="go_further" />
              </button>
              <button className="cancel_btn" onClick={closeWindow}>
                <I18nText path="user_profile_cancel" />
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="slide choose_lvl">
            <p className="title">
              <I18nText path="profile_windows_choose_level_of_present" />
            </p>
            <div className="btns">
              {lvlBtns.map((btn, index) => (
                <button
                  key={index}
                  className={`btn ${btn.lvl} ${
                    present.lvl === btn.lvl ? "lvl_active" : ""
                  }`}
                  onClick={() => lvlSelect(btn.lvl)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="button_container">
              <button
                className="sbtn next_btn"
                onClick={() => setCurrentSlide(2)}
                disabled={!present.lvl}
                style={{
                  backgroundColor: present.lvl ? "var(--blue-light)" : "#ccc",
                  cursor: present.lvl ? "pointer" : "not-allowed",
                }}
              >
                <I18nText path="go_further" />
              </button>
              <button className="cancel_btn" onClick={closeWindow}>
                <I18nText path="user_profile_cancel" />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="slide choose_present">
            <p className="title">
              <I18nText path="profile_windows_choose_present" />
            </p>
            <div className="presents">{renderPresents()}</div>
            <div className="button_container">
              <button
                className="sbtn send_btn"
                onClick={handleSendPresent}
                disabled={present.pid === null}
                style={{
                  backgroundColor:
                    present.pid !== null ? "var(--blue-light)" : "#ccc",
                  cursor: present.pid !== null ? "pointer" : "not-allowed",
                }}
              >
                <I18nText path="profile_windows_send_present" />
              </button>
              <button className="cancel_btn" onClick={closeWindow}>
                <I18nText path="user_profile_cancel" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`windows ${windowActive ? "windows_active" : ""}`}
      ref={windowsRef}
    >
      <div className="window w_present">
        <div className="w_container" id="w_container">
          {renderSlide()}
        </div>
        <PModal
          isActive={modalState.isActive}
          type={modalState.type}
          closeModal={closeModal}
          succesText={modalState.succesText}
        />
      </div>
    </div>
  );
};

export default ProfileWindows;
