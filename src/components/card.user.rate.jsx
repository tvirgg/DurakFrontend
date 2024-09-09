import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// img
import ImgCup from "../media/img/menu/cup.png";
import { I18nText } from "./i18nText";
import getRank from "../api/useRank";
const CardUserRate = () => {
  const [rank, setRank] = useState();

  useEffect(() => {
    async function fetchRank() {
      const data = await getRank();
      setRank(data);
    }

    fetchRank();
  }, []);

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  function clickHandler() {
    navigate("/ranking");
  }
  return (
    <button className="card_user_rate anim_sjump" onClick={clickHandler}>
      <h1>
        <I18nText path="user_rate_title" />
      </h1>
      <img src={ImgCup} alt="cup" />
      <div className="rate_bar">
        {rank}. {userInfo.username}
      </div>
    </button>
  );
};
export default CardUserRate;
