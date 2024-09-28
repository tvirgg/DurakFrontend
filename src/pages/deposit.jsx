import React, { useEffect } from "react";
//
import Preloader from "../includes/preloader";
// css
import "../media/css/page/dwe.css";
import "../media/css/page/deposit.css";
// components
import TransactionHistory from "../components/transaction.history";
import { I18nText } from "../components/i18nText";
//
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import config from "../config";
import axios from "axios";
import ShowPopup from "../ShowPopup";
import generatedWallet from "../api/generatedWallet";
import paymentChecker from "../api/paymentChecker";
import getPremuimCoinsMarket from "../api/getPremuimCoinsMarket";

const PageDeposit = () => {
  const address = useTonAddress();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [generatedAddress, setGeneratedAddress] = React.useState("");
  const [calculatedValue, setCalculatedValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [coins, setCoins] = React.useState([]);

  const makeTransaction = async () => {
    setIsLoading(true);
    if (address != null && generatedAddress != null && calculatedValue != 0) {
      const transaction = {
        validUntil: Math.floor(new Date() / 1000) + 360,
        messages: [
          {
            address: generatedAddress, // destination address
            amount: calculatedValue * 1000000000, //Toncoin in nanotons
          },
        ],
      };

      let resultTransaction = await tonConnectUI.sendTransaction(transaction);
      console.log(resultTransaction + "resultTransaction");

      setTimeout(async () => {
        let res = await paymentChecker(calculatedValue * 1000000000);
        console.log(res);
        if (res.status === 400) {
          ShowPopup("DUR поступят вам на счёт в ближайшее время", "Транзакция");
        }
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const getGenWallet = async () => {
      let res = await generatedWallet();
      if (res != null) {
        console.log(res);
        setGeneratedAddress(res);
      }
    };
    const getPremuimCoins = async () => {
      let res = await getPremuimCoinsMarket();
      if (res != null) {
        setCoins(res);
      }
    };
    const addWallet = async () => {
      try {
        await axios
          .post(
            config.url + "/users/tgWallet",
            {
              tgWallet: address,
            },
            {
              headers: {
                "Access-Control-Expose-Headers": "X-Session",
                "X-Session": localStorage.getItem("session_key"),
              },
            }
          )
          .then((res) => {
            localStorage.setItem("session_key", res.headers.get("X-Session"));
          })
          .catch((e) => {
            localStorage.setItem(
              "session_key",
              e.response.headers.get("X-Session")
            );
          });
      } catch (e) {
        ShowPopup(e.response.data, "Error");
      }
    };

    getGenWallet();
    getPremuimCoins();
    if (address) {
      addWallet();
    }
  }, [address]);

  return (
    <section className="page dwe deposit pb-80">
      <Preloader />
      <div className="container">
        {/* form */}
        <div className="wrap">
          <div className="page_title">
            <h1>
              <I18nText path="deposit_title" />
            </h1>
            <p>
              <I18nText path="deposit_desc" />
            </p>
          </div>
          {/* ton_adress */}
          <div
            className="ton_wallet"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* <button className="ton_copy_btn">
              <p>Eqz...wzcx</p>
              <small>TON Adress</small>
            </button> */}
            {/* <button type="button" className="connect_btn">
              <I18nText path="connect_wallet" />
            </button> */}
            <TonConnectButton />
          </div>
          {/* choose */}
          <div className="choose">
            <h2>
              <I18nText path="choose_amount" />:
            </h2>
            <div className="list">
              {coins.map((coin, index) => (
                <>
                  {" "}
                  <input type="radio" id={"v" + index} name="choose" />
                  <label
                    htmlFor={"v" + index}
                    onClick={() => setCalculatedValue(coin.priceInTON)}
                  >
                    {coin.premiumAmount}DUR
                  </label>
                </>
              ))}
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
              <span>{calculatedValue} TON</span>
            </div>
          </div>
          <TransactionHistory />
          {/* submit */}
          <div className="bar_btn">
            <button
              className="btn_submit"
              type="submit"
              disabled={isLoading}
              onClick={makeTransaction}
            >
              <I18nText path={isLoading ? "await_btn" : "purchase_btn"} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PageDeposit;
