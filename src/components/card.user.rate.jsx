import React from "react";
import { useNavigate } from "react-router-dom";
// img
import ImgCup from "../media/img/menu/cup.png";
const CardUserRate = () => {
  const navigate = useNavigate();
  function clickHandler() {
    navigate("/ranking");
  }
  return (
    <button className="card_user_rate anim_sjump" onClick={clickHandler}>
      <h1>TOP</h1>
      <img src={ImgCup} alt="cup" />
      <div className="rate_bar">2345. Paul</div>
    </button>
  );
};
export default CardUserRate;
