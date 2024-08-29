import * as React from "react";
// css
import "../media/css/component/card.invite.friends.css";
// icons
import { useNavigate } from "react-router-dom";
// img
import ImgPoster from "../media/posters/inviteFriends.svg";

//
const CardInviteFriends = () => {
  const navigate = useNavigate();
  // Define a function to handle navigation
  const handleClick = () => {
    navigate("/subcribe/invite-friends");
  };
  return (
    <button className="card_invite" onClick={handleClick}>
      <div className="texts">
        <h1 className="title">
          Invite <span>friends</span>
        </h1>
        <h3 className="sub">and get rewards</h3>
        <span className="prize">+40 DUR</span>
      </div>
      <img className="cardImg" src={ImgPoster} alt="card" />
    </button>
  );
};
export default CardInviteFriends;
