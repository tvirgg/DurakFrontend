import React from "react";
// css
import "../media/css/profile.css";
// img
import imgFriend from "../media/img/profile/friend.png";
// icon
import IconPlayArrow from "../components/icons/playArrow";
import IconChat from "../components/icons/chat";
import IconAddFriends from "../components/icons/addFriends";
import IconPresent from "../components/icons/present";
import { I18nText } from "./i18nText";

const ProfileFriends = () => {
  const friends = [
    { name: "PAULINA", status: <I18nText path="user_profile_in_game" /> },
    { name: "PAULINA", status: <I18nText path="user_profile_in_game" /> },
    { name: "PAULINA", status: <I18nText path="user_profile_in_game" /> },
    { name: "PAULINA", status: <I18nText path="user_profile_in_game" /> },
    { name: "PAULINA", status: <I18nText path="user_profile_in_game" /> },
  ];

  const openWindows = () => {
    const w = document.querySelector(".profile_section .windows");
    w.classList.add("windows_active");
    console.log(w);
  };

  return (
    <div className="profile_friends">
      {friends.map((friend, index) => (
        <div className="row anim_sjump" key={index}>
          <div className="user">
            <img className="picture" src={imgFriend} alt="friend" />
            <div className="info">
              <p className="name">{friend.name}</p>
              <div className="status">
                <IconPlayArrow />
                {friend.status}
              </div>
            </div>
          </div>
          <div className="btns">
            <button className="btn chat">
              <IconChat />
            </button>
            <button className="btn add_friends">
              <IconAddFriends />
            </button>
            <button
              className="btn present"
              onClick={() => {
                openWindows();
              }}
            >
              <IconPresent />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileFriends;
