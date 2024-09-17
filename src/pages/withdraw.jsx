import React from "react";
//
import Preloader from "../includes/preloader";

// css
import "../media/css/page/withdraw.css";
//
import TransactionHistory from "../components/transaction.history";
import { I18nText } from "../components/i18nText";
import { useNavigate } from "react-router-dom";
import BackBtn from "../BackBtn";

//
const PageWithDraw = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    BackBtn("/", navigate);
  });
  return (
    <section className="page dwe withdraw pb-80">
      <Preloader />
      <div className="container">
        {/* form */}
        <form className="wrap">
          <div className="page_title">
            <h1>
              <I18nText path="user_profile_withdraw" />
            </h1>
            <p>
              <I18nText path="withdraw_desc" />
            </p>
          </div>
          <div className="choose">
            <h2>
              <I18nText path="choose_amount" />:
            </h2>
            <div className="list">
              <input type="radio" id="v1" name="choose" />
              <label htmlFor="v1">100DUR</label>
              <input type="radio" id="v2" name="choose" />
              <label htmlFor="v2">200DUR</label>
              <input type="radio" id="v3" name="choose" />
              <label htmlFor="v3">300DUR</label>
              <input type="radio" id="v4" name="choose" />
              <label htmlFor="v4">400DUR</label>
              <input type="radio" id="v5" name="choose" />
              <label htmlFor="v5">500DUR</label>
              {/* 5 */}
              <input type="radio" id="v6" name="choose" />
              <label htmlFor="v6">600DUR</label>
              <input type="radio" id="v7" name="choose" />
              <label htmlFor="v7">700DUR</label>
              <input type="radio" id="v8" name="choose" />
              <label htmlFor="v8">800DUR</label>
              <input type="radio" id="v9" name="choose" />
              <label htmlFor="v9">900DUR</label>
              <input type="radio" id="v10" name="choose" />
              <label htmlFor="v10">
                <I18nText path="all" /> DUR
              </label>
            </div>
          </div>
          {/* conversion */}
          <div className="convert">
            <h2>
              <I18nText path="conversion_rate" />:
            </h2>
            <div className="list">
              <span>100 DUR = 0.95 TON</span>
            </div>
          </div>
          {/* pay */}
          <div className="pay">
            <h2>
              <I18nText path="you_will_pay" />:
            </h2>
            <div className="list">
              <span>5.7 TON</span>
            </div>
          </div>
          <div className="wallet_adress">
            <h2>
              <I18nText path="wallet_address" />
            </h2>
            <input
              type="text"
              name="wallet_adress"
              placeholder="Eqzdf...wexr"
            />
          </div>
          {/* TransactionHistory */}
          <TransactionHistory />
          {/* submit */}
          <div className="bar_btn">
            <button className="btn_submit" type="submit">
              <I18nText path="sell" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default PageWithDraw;
