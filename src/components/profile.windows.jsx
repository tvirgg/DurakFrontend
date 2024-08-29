import React, { useState, useRef } from "react";

// images
import catFrame from "../media/img/catFrame.png";
import catTable from "../media/img/catTable.png";
import catCard from "../media/img/catCard.png";
import catEmoji from "../media/img/catEmoji.png";
//
//
import PModal from "./ui/pModal";

//
const ProfileWindows = () => {
  const user = {
    balance_DUR: 1, // Баланс пользователя
  };

  const [present, setPresent] = useState({
    cat: null,
    lvl: null,
    pid: null,
    availablePresents: [], // Состояние для доступных подарков
  });

  const [modalState, setModalState] = useState({
    isActive: false,
    type: null,
    succesText: "You’ve sent the present!", // "success" или "fail"
  });

  const [windowActive, setWindowActive] = useState(false); // Управление видимостью окна

  const windowsRef = useRef(null); // Ссылка на элемент .windows

  // Массив подарков с разными ценами от 1 до 5
  const presentsArray = [
    { img: catFrame, price: 1, category: "frame" },
    { img: catTable, price: 2, category: "tables" },
    { img: catCard, price: 1, category: "cards" },
    { img: catEmoji, price: 2, category: "emoji" },
    { img: catFrame, price: 1, category: "frame" },
    { img: catTable, price: 1, category: "tables" },
    { img: catCard, price: 2, category: "cards" },
    { img: catEmoji, price: 2, category: "emoji" },
    { img: catFrame, price: 1, category: "frame" },
  ];

  const catBtns = [
    { label: "Frames", cat: "frame", img: catFrame },
    { label: "Tables", cat: "tables", img: catTable },
    { label: "Cards", cat: "cards", img: catCard },
    { label: "Emoji", cat: "emoji", img: catEmoji },
  ];

  const lvlBtns = [
    { label: "Standart", lvl: "standart" },
    { label: "Special", lvl: "special" },
    { label: "Relic", lvl: "relic" },
    { label: "Rare", lvl: "rare" },
  ];

  const catSelect = (cat) => {
    const filteredPresents = presentsArray.filter(
      (presentItem) => presentItem.category === cat
    );
    setPresent((prevPresent) => ({
      ...prevPresent,
      cat: cat,
      availablePresents: filteredPresents, // Фильтрация подарков по категории
    }));
  };

  const lvlSelect = (lvl) => {
    setPresent((prevPresent) => ({
      ...prevPresent,
      lvl: lvl,
    }));
  };

  const presentSelect = (pid) => {
    setPresent((prevPresent) => ({
      ...prevPresent,
      pid: pid,
    }));
  };

  const handleSendPresent = () => {
    const selectedPresent = present.availablePresents[present.pid];

    if (user.balance_DUR >= selectedPresent.price) {
      // Достаточно средств
      setModalState({
        isActive: true,
        type: "success",
        succesText: "You’ve sent the present!",
      });
    } else {
      // Недостаточно средств
      setModalState({ isActive: true, type: "fail" });
    }
  };
  const onSlide = (i) => {
    const wc = document.getElementById("w_container");
    wc.style.marginLeft = `calc(${-i} * 90vw)`;
  };
  const closeModal = () => {
    setModalState({ isActive: false, type: null });
    onSlide(0);
  };

  const closeWindow = () => {
    if (windowsRef.current.classList.contains("windows_active")) {
      setWindowActive(false);
      document
        .querySelector(".profile_section .windows")
        .classList.remove("windows_active");
      // Сброс состояния выбранных подарков
      setPresent({
        cat: null,
        lvl: null,
        pid: null,
        availablePresents: [],
      });

      // Закрыть все модальные окна
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
          className={`pbtn ${present.pid === index ? "p_active" : ""}`}
          onClick={() => presentSelect(index)}
        >
          <img src={presentItem.img} alt="present" />
          <span>{presentItem.price} DUR</span>
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

  return (
    <div
      className={`windows ${windowActive ? "windows_active" : ""}`}
      ref={windowsRef}
    >
      <div className="window w_present">
        <div className="w_container" id="w_container">
          {/* Слайд выбора категории */}
          <div className="slide choose_cat slide_active">
            <p className="title">Choose category of present:</p>
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
            <button
              className="sbtn next_btn"
              onClick={() => onSlide(1)}
              disabled={!present.cat}
              style={{
                backgroundColor: present.cat ? "var(--blue-light)" : "#ccc",
                cursor: present.cat ? "pointer" : "not-allowed",
              }}
            >
              Go further
            </button>
          </div>

          {/* Слайд выбора уровня */}
          <div className="slide choose_lvl">
            <p className="title">Choose level of present:</p>
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
            <button
              className="sbtn next_btn"
              onClick={() => onSlide(2)}
              disabled={!present.lvl}
              style={{
                backgroundColor: present.lvl ? "var(--blue-light)" : "#ccc",
                cursor: present.lvl ? "pointer" : "not-allowed",
              }}
            >
              Go further
            </button>
          </div>

          {/* Слайд выбора подарка */}
          <div className="slide choose_present">
            <p className="title">Choose present:</p>
            <div className="presents">{renderPresents()}</div>
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
              Send Present
            </button>
          </div>
        </div>
        <button className="cancel_btn" onClick={closeWindow}>
          Cancel
        </button>
      </div>
      {/* Модальные окна */}
      <PModal
        isActive={modalState.isActive}
        type={modalState.type}
        closeModal={closeModal}
        succesText={modalState.succesText}
      />
    </div>
  );
};

export default ProfileWindows;
