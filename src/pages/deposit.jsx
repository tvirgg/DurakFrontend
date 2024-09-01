import React from 'react'
//
import Preloader from '../includes/preloader'
// css
import '../media/css/page/dwe.css'
import '../media/css/page/deposit.css'
// components
import TransactionHistory from '../components/transaction.history'
import { I18nText } from '../components/i18nText'
//
const PageDeposit = () => {
  return (
    <section className="page dwe deposit pb-80">
      <Preloader />
      <div className="container">
        {/* form */}
        <form className="wrap">
          <div className="page_title">
            <h1>
              <I18nText path="deposit_title" />
            </h1>
            <p>
              <I18nText path="deposit_desc" />
            </p>
          </div>
          {/* ton_adress */}
          <div className="ton_wallet">
            {/* <button className="ton_copy_btn">
              <p>Eqz...wzcx</p>
              <small>TON Adress</small>
            </button> */}
            <button
              type="button"
              className="connect_btn"
            >
              <I18nText path="connect_wallet" />
            </button>
          </div>
          {/* choose */}
          <div className="choose">
            <h2>
              <I18nText path="choose_amount" />:
            </h2>
            <div className="list">
              <input
                type="radio"
                id="v1"
                name="choose"
              />
              <label htmlFor="v1">100DUR</label>
              <input
                type="radio"
                id="v2"
                name="choose"
              />
              <label htmlFor="v2">200DUR</label>
              <input
                type="radio"
                id="v3"
                name="choose"
              />
              <label htmlFor="v3">300DUR</label>
              <input
                type="radio"
                id="v4"
                name="choose"
              />
              <label htmlFor="v4">400DUR</label>
              <input
                type="radio"
                id="v5"
                name="choose"
              />
              <label htmlFor="v5">500DUR</label>
              {/* 5 */}
              <input
                type="radio"
                id="v6"
                name="choose"
              />
              <label htmlFor="v6">600DUR</label>
              <input
                type="radio"
                id="v7"
                name="choose"
              />
              <label htmlFor="v7">700DUR</label>
              <input
                type="radio"
                id="v8"
                name="choose"
              />
              <label htmlFor="v8">800DUR</label>
              <input
                type="radio"
                id="v9"
                name="choose"
              />
              <label htmlFor="v9">900DUR</label>
              <input
                type="radio"
                id="v10"
                name="choose"
              />
              <label htmlFor="v10">1000DUR</label>
            </div>
          </div>
          {/* conversion */}
          <div className="convert">
            <h2>
              <I18nText path="conversion_rate" />:
            </h2>
            <div className="list">
              <span>1 TON = 100 DUR</span>
            </div>
          </div>
          {/* pay */}
          <div className="pay">
            <h2>
              <I18nText path="you_will_pay" />:
            </h2>
            <div className="list">
              <span>6 TON</span>
            </div>
          </div>
          <TransactionHistory />
          {/* submit */}
          <div className="bar_btn">
            <button
              className="btn_submit"
              type="submit"
            >
              <I18nText path="purchase_btn" />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
export default PageDeposit
