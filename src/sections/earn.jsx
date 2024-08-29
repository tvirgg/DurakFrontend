import React from "react";
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

const Earn = () => {
  const tasks = [
    {
      id: 1,
      picture: imgT1,
      title: "Daily Login",
      info: "Login in to the game 7 days in a row",
      prize: "+50",
      prize_type: "DUR",
      category: "basic",
    },
    {
      id: 2,
      picture: imgT2,
      title: "First victory",
      info: "Win one game during the day",
      prize: "+1000",
      prize_type: "Coin",
      category: "basic",
    },
    {
      id: 3,
      picture: imgT3,
      title: "Ready, steady, go!",
      info: "Play one game in Training mode",
      prize: "rare avatar frame",
      prize_type: "IconUnknownFrame",
      category: "basic",
    },
    // ... добавь все остальные задачи аналогично
  ];

  return (
    <section className="page earn pb-80">
      <Preloader />
      <div className="container">
        <h1 className="page_title">Earn</h1>
        {/* header */}
        <div className="header_bar anim_sjump">
          <div className="content">
            <img className="back_img" src={imgCoins} alt="imgCoins" />
            <p className="coins">
              115/200 <IconCoin />
            </p>
            <span className="per">10/per hour</span>
          </div>
          <div className="buffs">
            <span>collect</span>
            <span>+20% speed</span>
            <span>X2 capacity</span>
          </div>
        </div>
        {/* tasks */}

        <div className="tasks">
          {/* Basic tasks */}
          <h2>Basic tasks</h2>
          {/* task */}
          <button className="task anim_sjump">
            <img
              className="picture anim_sjump"
              src={imgT1}
              alt="task_picture"
            />
            <div className="content">
              <p className="title">Daily Login</p>
              <span className="info">Login in to the game 7 days in a row</span>
              <div className="prize">
                +50 <IconDUR />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT2} alt="task_picture" />
            <div className="content">
              <p className="title">First victory</p>
              <span className="info">Win one game during the day</span>
              <div className="prize">
                +1000 <IconCoin />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT3} alt="task_picture" />
            <div className="content">
              <p className="title">Ready, steady, go!</p>
              <span className="info">Play one game in Training mode</span>
              <div className="prize">
                rare avatar frame <IconUnknownFrame />
              </div>
            </div>
            <IconChevronRight />
          </button>
          {/* Special Tasks */}
          <h2>Special tasks</h2>
          <button className="task anim_sjump">
            <img className="picture" src={imgT4} alt="task_picture" />
            <div className="content">
              <p className="title">Series of victories</p>
              <span className="info">Win 5 games in a row</span>
              <div className="prize">
                +50
                <IconDUR />{" "}
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT5} alt="task_picture" />
            <div className="content">
              <p className="title">Game Marathon</p>
              <span className="info">Play 20 games during the day</span>
              <div className="prize">
                special table background <IconUnknownCard />
              </div>
            </div>
            <IconChevronRight />
          </button>
          {/* Rare Tasks */}
          <h2>Special tasks</h2>
          <button className="task anim_sjump">
            <img className="picture" src={imgT6} alt="task_picture" />
            <div className="content">
              <p className="title">Game veteran</p>
              <span className="info">Win 50 games</span>
              <div className="prize">
                rare avatar frame <IconUnknownFrame />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT7} alt="task_picture" />
            <div className="content">
              <p className="title">Rating leader</p>
              <span className="info">
                Take the first place in the weekly rating
              </span>
              <div className="prize">
                +100 <IconDUR />
              </div>
            </div>
            <IconChevronRight />
          </button>
          {/* Relic Tasks */}
          <h2>Relic tasks</h2>
          <button className="task anim_sjump">
            <img className="picture" src={imgT8} alt="task_picture" />
            <div className="content">
              <p className="title">Legend of the table</p>
              <span className="info">Win 100 games</span>
              <div className="prize">
                relic avatar frame <IconUnknownFrame />
              </div>
            </div>
            <IconChevronRight />
          </button>

          <button className="task anim_sjump">
            <img className="picture" src={imgT9} alt="task_picture" />
            <div className="content">
              <p className="title">Mythical player</p>
              <span className="info">Win 10 games in a row</span>
              <div className="prize">
                relic card pattern <IconUnknownCard />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT10} alt="task_picture" />
            <div className="content">
              <p className="title">Get Collection</p>
              <span className="info">Collect all standard and relic items</span>
              <div className="prize">
                +500 <IconDUR />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT11} alt="task_picture" />
            <div className="content">
              <p className="title">TON conquerer</p>
              <span className="info">Earn 2000 DUR</span>
              <div className="prize">relic table pattern</div>
            </div>
            <IconChevronRight />
          </button>
          {/* Specific tasks */}
          <h2>Specific tasks</h2>
          <button className="task anim_sjump">
            <img className="picture" src={imgT12} alt="task_picture" />
            <div className="content">
              <p className="title">Prize for friends</p>
              <span className="info">Invite 5 friends to the game</span>
              <div className="prize">
                relic avatar frame <IconUnknownFrame />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT13} alt="task_picture" />
            <div className="content">
              <p className="title">Constant player</p>
              <span className="info">
                Play one game each day during a month
              </span>
              <div className="prize">
                +500 <IconDUR />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT14} alt="task_picture" />
            <div className="content">
              <p className="title">Make supply</p>
              <span className="info">Buy 500 DUR</span>
              <div className="prize">+500</div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT15} alt="task_picture" />
            <div className="content">
              <p className="title">Follow us</p>
              <span className="info">Subscribe to our Telegram channel </span>
              <div className="prize">
                +500 <IconCoin />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT16} alt="task_picture" />
            <div className="content">
              <p className="title">Be in the business</p>
              <span className="info">Complete 5 tasks </span>
              <div className="prize">
                +10.000 <IconCoin />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT17} alt="task_picture" />
            <div className="content">
              <p className="title">The start</p>
              <span className="info">Win 5 games </span>
              <div className="prize">
                special card pattern <IconUnknownCard />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT18} alt="task_picture" />
            <div className="content">
              <p className="title">Player</p>
              <span className="info">Play 10 games </span>
              <div className="prize">
                +15.000 <IconCoin />
              </div>
            </div>
            <IconChevronRight />
          </button>
          {/* Specific tasks */}
          <h2>Other tasks</h2>
          <button className="task anim_sjump">
            <img className="picture" src={imgT19} alt="task_picture" />
            <div className="content">
              <p className="title">Get the collection</p>
              <span className="info">Collect 10 different items</span>
              <div className="prize">
                +500 <IconDUR />
              </div>
            </div>
            <IconChevronRight />
          </button>
          <button className="task anim_sjump">
            <img className="picture" src={imgT20} alt="task_picture" />
            <div className="content">
              <p className="title">Golden player</p>
              <span className="info">Earn 1.000.000 coins</span>
              <div className="prize">
                +500 <IconDUR />
              </div>
            </div>
            <IconChevronRight />
          </button>

          {/* end */}
        </div>
        {/* nav */}
        <NavBar />
      </div>
    </section>
  );
};
export default Earn;
