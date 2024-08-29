import React from "react";
// css
import "../media/css/page/subcribe.premium.css";
// components
import Preloader from "../includes/preloader";
//icons
import IconCheck from "../components/icons/check";
import IconBigBlueChek from "../components/icons/bigBlueCheck";
// img
import ImgPremium from "../media/svg/premium.svg";
//

const PagePremium = () => {
  return (
    <section className="page premium pb-80">
      <Preloader />
      <div className="container">
        <header className="banner anim_sjump">
          <img src={ImgPremium} alt="img" />
          <h1 className="page_title">Durak Premium</h1>
        </header>
        {/* offers */}
        <div className="card offers anim_sjump">
          {/* / */}
          <input type="radio" name="offer" id="mounth" />
          <label htmlFor="mounth">
            <div className="crc">
              <IconCheck />
            </div>
            <div className="title">
              <p>Mounthly</p>
            </div>
            <div className="price">5.00 TON/month</div>
          </label>
          {/* / */}
          <input type="radio" name="offer" id="sexmounths" />
          <label htmlFor="sexmounths">
            <div className="crc">
              <IconCheck />
            </div>
            <div className="title">
              <p>6 Mounths</p>
              <div className="subtext">
                <span className="old">30 TON/half a year</span>
                <span className="new">25 TON/half a year</span>
              </div>
              <span className="installment">-15%</span>
            </div>
            <div className="price">4.16 TON/month</div>
          </label>
          {/* / */}
          <input type="radio" name="offer" id="annual" />
          <label htmlFor="annual">
            <div className="crc">
              <IconCheck />
            </div>
            <div className="title">
              <p>Annual</p>
              <div className="subtext">
                <span className="old">60 TON/year</span>
                <span className="new">45 TON/year</span>
              </div>
              <span className="installment">-25%</span>
            </div>
            <div className="price">3.75 TON/month</div>
          </label>
        </div>
        {/* Features */}
        <div className="group anim_sjump">
          <p className="card_title">Features</p>
          <div className="card features">
            {/* rows */}
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>+100% XP</p>
                <span className="subtext">Get +100% Rating for each game</span>
              </div>
            </div>
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>+50% XP for all players</p>
                <span className="subtext">
                  Every player in the room with you gets +50% Rating for each
                  game
                </span>
              </div>
            </div>
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>Priority</p>
                <span className="subtext">
                  Your rooms are always at the top of the list of games
                </span>
              </div>
            </div>
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>Help during games</p>
                <span className="subtext">
                  We help you with the best advice on how to play
                </span>
              </div>
            </div>
            <div className="row">
              <IconBigBlueChek />
              <div className="title">
                <p>Bonuses for friends</p>
                <span className="subtext">
                  Invite friends and get more bonuses for yourself and them
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="subcribe_btn anim_sjump">Subcribe</button>
    </section>
  );
};
export default PagePremium;
