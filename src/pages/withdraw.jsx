import React from "react";
//
import Preloader from "../includes/preloader";

// css
import "../media/css/page/withdraw.css";
//
import TransactionHistory from "../components/transaction.history";
//
const PageWithDraw = () => {
  return (
    <section className="page dwe withdraw pb-80">
      <Preloader />
      <div className="container">
        {/* form */}
        <form className="wrap">
          <div className="page_title">
            <h1>Withdraw</h1>
            <p>sell DUR tokens and get TON</p>
          </div>
          <div className="choose">
            <h2>Choose amount:</h2>
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
              <label htmlFor="v10">All DUR</label>
            </div>
          </div>
          {/* conversion */}
          <div className="convert">
            <h2>Conversion rate:</h2>
            <div className="list">
              <span>100 DUR = 0.95 TON</span>
            </div>
          </div>
          {/* pay */}
          <div className="pay">
            <h2>You will have you pay:</h2>
            <div className="list">
              <span>5.7 TON</span>
            </div>
          </div>
          <div className="wallet_adress">
            <h2>Enter wallet adress</h2>
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
              Sell
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default PageWithDraw;
