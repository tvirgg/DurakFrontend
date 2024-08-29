import React, { useState } from "react";
//
import "../media/css/page/tourneys.css";
//
import Preloader from "../includes/preloader";
//
import IconCoin2 from "../components/icons/coin2";
import IconCoinDUR from "../components/icons/coinDur";
import IconChevronRightBlack from "../components/icons/chevronRightBlack";
import IconTelegram from "../components/icons/telegram";

const Tourneys = () => {
  const user = {
    check_gold: 1100,
  };

  const tArr = [
    {
      id: 1,
      title: "Welcome Tournament",
      date: "23 Aug - 16:00",
      prize: "Main prize - 100 DUR",
      requirement: "Requirement - be in game at the start of event",
      price: 1000,
    },
    {
      id: 2,
      title: "Welcome Tournament 2",
      date: "23 Aug - 16:00",
      prize: "Main prize - 100 DUR",
      requirement: "Requirement - be in game at the start of event",
      price: 2000,
    },
    {
      id: 3,
      title: "Welcome Tournament 3",
      date: "23 Aug - 16:00",
      prize: "Main prize - 100 DUR",
      requirement: "Requirement - be in game at the start of event",
      price: 1000,
    },
  ];

  const [activeModal, setActiveModal] = useState(null);
  const [selectedTourney, setSelectedTourney] = useState(null);

  const handleTourneySelect = (tourney) => {
    setSelectedTourney(tourney);
  };

  const handleJoinClick = () => {
    if (selectedTourney) {
      const status =
        selectedTourney.price <= user.check_gold ? "success" : "fail";
      setActiveModal(status);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedTourney(null);
  };

  return (
    <section className="page tourneys">
      <Preloader />
      <div className="container">
        {/* check */}
        <div className="check">
          <div className="vall coin">
            <IconCoin2 />
            <span className="value">{user.check_gold}</span>
          </div>
          <div className="vall dur">
            <IconCoinDUR />
            <span className="value">0.00 DUR</span>
          </div>
        </div>
        {/* content */}
        <div className="page_title">
          <h1 className="title">TORNEYS</h1>
          <span>compete and win BIG prizes</span>
        </div>
        {/* list */}
        <div className="list">
          {tArr.map((tourney) => (
            <button
              key={tourney.id}
              className={`tourney t${tourney.id}`}
              onClick={() => handleTourneySelect(tourney)}
            >
              <p className="title">{tourney.title}</p>
              <div className="content">
                <span className="date">{tourney.date}</span>
                <span className="prize">{tourney.prize}</span>
                <span className="require">{tourney.requirement}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="bar_btn">
          <button className="submit_btn" onClick={handleJoinClick}>
            Join tourney - Bid {selectedTourney?.price}
            <IconCoin2 />
            <IconChevronRightBlack className="chevron" />
          </button>
        </div>
      </div>
      {/* modals */}
      {activeModal && (
        <div className="modal modal_active">
          <div className={`window ${activeModal}`}>
            <IconTelegram />
            <h1>
              {activeModal === "success"
                ? "Congratulations!"
                : "Sorry you can’t join"}
            </h1>
            <span>
              {activeModal === "success"
                ? "You registered for the tourney"
                : "Insufficient balance"}
            </span>
            <button className="close_btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Tourneys;
