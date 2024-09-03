import React from "react";

// components

// img
import imgCard from "../media/img/profile/cCard.png";
import imgBorder from "../media/img/profile/cBorder.png";
import imgTable from "../media/img/profile/cTable.png";
import imgEmoji from "../media/img/profile/cEmoji.png";

//
const ProfileCustomsBar = () => {
  return (
    <div className="profile_customs anim_sjump">
      {/* 4/c */}
      <button className="btn card_skin">
        <img src={imgCard} alt="cCard" />
      </button>
      <button className="btn border_skin">
        <img src={imgBorder} alt="cBorder" />
      </button>
      <button className="btn bg_skin">
        <img src={imgTable} alt="cTable" />
      </button>
      <button className="btn smile">
        <img src={imgEmoji} alt="cEmoji" />
      </button>
      {/* navbar */}
    </div>
  );
};
export default ProfileCustomsBar;
