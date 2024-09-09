import React, { useEffect, useState } from "react";
// img
import IconCoin from "../components/icons/coin";
import { I18nText } from "./i18nText";
import availablePassive from "../api/availablePassive";

const CardUserEarn = () => {
  const [earnData, setEarnData] = useState();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetch() {
      const data = await availablePassive();
      setEarnData(data);
    }

    setTimeout(() => {
      fetch();
    }, 1500);
  }, []);

  return (
    <div className="card_user_earn anim_sjump">
      <h1 style={{ textTransform: "uppercase" }}>
        <I18nText path="earn" />
      </h1>
      <div className="progress_bar">
        <div className="progress"></div>
      </div>
      <div className="earn_info">
        <div className="earn_check">
          {userInfo.storage}/{earnData ? earnData[0]?.value : 0}
          <IconCoin />
        </div>
        <span className="perhour">
          {earnData ? earnData[1]?.value : 0}/
          <I18nText path="per_hour" />
        </span>
      </div>
    </div>
  );
};
export default CardUserEarn;
