import * as React from "react";
// icons
import { useNavigate } from "react-router-dom";
// img
import ImgPoster from "../media/posters/premiumMask.svg";
//
const CardSubcribePremium = () => {
  const navigate = useNavigate();
  // Define a function to handle navigation
  const handleClick = () => {
    navigate("/subcribe/premium");
  };
  return (
    <button className="card_premium" onClick={handleClick}>
      <div className="texts">
        <h1 className="title">Premium</h1>
        <div className="prices">
          <span className="old">60 TON / year</span>
          <span className="new">45 TON / year</span>
        </div>
        <span className="discount">-25%</span>
      </div>
      <img className="cardImg" src={ImgPoster} alt="card" />
    </button>
  );
};
export default CardSubcribePremium;
