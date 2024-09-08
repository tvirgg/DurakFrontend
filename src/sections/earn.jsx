import React, { useEffect, useRef, useState } from "react";
//
// css
import "../media/css/earn.css";
// components
import Preloader from "../includes/preloader";
// img
import imgCoins from "../media/img/earn/coins.png";
import imgT1 from "../media/img/earn/t1.png";
import imgT2 from "../media/img/earn/t2.png";
import imgT3 from "../media/img/earn/t3.png";
import imgT4 from "../media/img/earn/t4.png";
import imgT5 from "../media/img/earn/t5.png";
import imgT6 from "../media/img/earn/t6.png";
import imgT7 from "../media/img/earn/t7.png";
import imgT8 from "../media/img/earn/t8.png";
import imgT9 from "../media/img/earn/t9.png";
import imgT10 from "../media/img/earn/t10.png";
import imgT11 from "../media/img/earn/t11.png";
import imgT12 from "../media/img/earn/t12.png";
import imgT13 from "../media/img/earn/t13.png";
import imgT14 from "../media/img/earn/t14.png";
import imgT15 from "../media/img/earn/t15.png";
import imgT16 from "../media/img/earn/t16.png";
import imgT17 from "../media/img/earn/t17.png";
import imgT18 from "../media/img/earn/t18.png";
import imgT19 from "../media/img/earn/t19.png";
import imgT20 from "../media/img/earn/t20.png";

// icon
import IconCoin from "../components/icons/coin";
import IconDUR from "../components/icons/dur";
import IconChevronRight from "../components/icons/chevronRight";
import IconUnknownFrame from "../components/icons/unknownFrame.jsx";
import IconUnknownCard from "../components/icons/unknownCard.jsx";
// NavBar
import NavBar from "../components/nav.bar";
import { I18nText } from "../components/i18nText.jsx";
import PModal from "../components/ui/pModal.jsx";
import { useIntl } from "react-intl";
import availablePassive from "../api/availablePassive.js";
import getAllQuests from "../api/quests.js";

const Earn = () => {
  // const tasks = [
  //   {
  //     id: 1,
  //     picture: imgT1,
  //     title: "Daily Login",
  //     info: "Login in to the game 7 days in a row",
  //     prize: "+50",
  //     prize_type: "DUR",
  //     category: "basic",
  //   },
  //   {
  //     id: 2,
  //     picture: imgT2,
  //     title: "First victory",
  //     info: "Win one game during the day",
  //     prize: "+1000",
  //     prize_type: "Coin",
  //     category: "basic",
  //   },
  //   {
  //     id: 3,
  //     picture: imgT3,
  //     title: "Ready, steady, go!",
  //     info: "Play one game in Training mode",
  //     prize: "rare avatar frame",
  //     prize_type: "IconUnknownFrame",
  //     category: "basic",
  //   },
  //   // ... добавь все остальные задачи аналогично
  // ];

  const [tasks, setTasks] = useState();

  useEffect(() => {
    async function fetchTasks() {
      const data = await getAllQuests();
      setTasks(data);
    }

    fetchTasks();
  }, []);

  const intl = useIntl();
  const speed = intl.formatMessage({ id: "buff_speed" });
  const capacity = intl.formatMessage({ id: "buff_capacity" });

  const [modalState, setModalState] = useState({
    isActive: false,
    type: null,
    succesText: null,
    coinCount: null,
    skillText: null,
    skillPrice: null,
    buttonOnClick: null,
  });
  const [earnData, setEarnData] = useState();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetch() {
      const data = await availablePassive();
      setEarnData(data);
    }

    fetch();
  }, []);

  const closeModal = () => {
    setModalState({ isActive: false, type: null });
  };

  const openModal = type => {
    if (type === "success-speed") {
      setModalState({
        isActive: true,
        type: "success",
        succesText: <I18nText path="speed_increased" />,
      });
    } else if (type === "success-capacity") {
      setModalState({
        isActive: true,
        type: "success",
        succesText: <I18nText path="capacity_increased" />,
      });
    } else if (type === "collect") {
      setModalState({
        isActive: true,
        type: "collect",
        coinCount: 115,
      });
    } else if (type === "skill-speed") {
      setModalState({
        isActive: true,
        type: "skill",
        skillText: `+20% ${speed}`,
        skillPrice: 115,
        buttonOnClick: () => openModal("success-speed"),
      });
    } else if (type === "skill-capacity") {
      setModalState({
        isActive: true,
        type: "skill",
        skillText: `X2 ${capacity}`,
        skillPrice: 115,
        buttonOnClick: () => openModal("success-capacity"),
      });
    } else {
      setModalState({
        isActive: true,
        type: "fail",
      });
    }
  };

  const uniqueTypes = [...new Set(tasks?.map(task => task.quest.type))];

  return (
    <>
      <section className="page earn pb-80">
        <Preloader />
        <div className="container">
          <h1 className="page_title">
            <I18nText path="earn" />
          </h1>
          {/* header */}
          <div className="header_bar anim_sjump">
            <div className="content">
              <img className="back_img" src={imgCoins} alt="imgCoins" />
              <p className="coins">
                {userInfo.storage}/{earnData ? earnData[0]?.value : 0}{" "}
                <IconCoin />
              </p>
              <span className="per">
                {earnData ? earnData[1]?.value : 0}/
                <I18nText path="per_hour" />
              </span>
            </div>
            <div className="buffs">
              <button onClick={() => openModal("collect")}>
                <I18nText path="buff_collect" />
              </button>
              <button onClick={() => openModal("skill-speed")}>
                +20% <I18nText path="buff_speed" />
              </button>
              <button onClick={() => openModal("skill-capacity")}>
                X2 <I18nText path="buff_capacity" />
              </button>
            </div>
          </div>
          {/* tasks */}

          <div className="tasks">
            {tasks &&
              uniqueTypes.map(type => (
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}} key={type}>
                  <h2>
                    {type === "Обычные Квесты" ? (
                      <I18nText path="basic_tasks" />
                    ) : type === "Особые Квесты" ? (
                      <I18nText path="specific_tasks" />
                    ) : type === "Редкие Квесты" ? (
                      <I18nText path="rare_tasks" />
                    ) : type === "Реликтовые Квесты" ? (
                      <I18nText path="relic_tasks" />
                    ) : type === "Специальные Квесты" ? (
                      <I18nText path="special_tasks" />
                    ) : type === "Дополнительные Квесты" ? (
                      <I18nText path="other_tasks" />
                    ) : (
                      <I18nText path="other_tasks" />
                    )}
                  </h2>
                  {tasks
                    .filter(task => task.quest.type === type && !task.completed)
                    .map(task => (
                      <button key={task.id} className="task anim_sjump">
                        <img
                          className="picture anim_sjump"
                          src={imgT1}
                          alt="task_picture"
                        />
                        <div className="content">
                          <p className="title">{task.quest.name}</p>
                          <span className="info">{task.quest.description}</span>
                          <div className="prize">
                            +{task.quest.award}{" "}
                            {task.quest.awardCurrency === "premium" ? (
                              <IconDUR />
                            ) : (
                              <IconCoin />
                            )}
                          </div>
                        </div>
                        <IconChevronRight />
                      </button>
                    ))}
                </div>
              ))}
          </div>
        </div>
        <PModal
          isActive={modalState.isActive}
          type={modalState.type}
          closeModal={closeModal}
          succesText={modalState.succesText}
          coinCount={modalState.coinCount}
          skillText={modalState.skillText}
          skillPrice={modalState.skillPrice}
          buttonOnClick={modalState.buttonOnClick}
        />
      </section>
      <NavBar />
    </>
  );
};
export default Earn;
