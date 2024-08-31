import React from "react";
//
import "../media/css/component/filter.window.css";
import "../media/css/games.css";
// components
import GamesPlayCards from "../components/games.play.cards";
import GamesRooms from "../components/games.rooms";
import Preloader from "../includes/preloader";
// NavBar
import NavBar from "../components/nav.bar";
import { I18nText } from "../components/i18nText";
import axios from "axios";
import config from "../config";
import ShowPopup from "../ShowPopup";

const Games = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    try {
      axios
        .get(config.url + "/game/all-awaiting-games", { withCredentials: true })
        .then((res) => {
          setData(res.data);
          alert(res.data);
          setLoading(false);
        });
    } catch (e) {
      alert(e);
      ShowPopup(e.response.data, "Error");
    }
  }, []);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <section className="page games pb-80">
          <Preloader />
          <div className="container">
            {/* play cards */}
            <GamesPlayCards />
            {/* rooms */}
            <GamesRooms roomsData={data} />
            {/* / */}
            <div className="btn_bar">
              <button className="reset">
                <I18nText path="reset_button" />
              </button>
              <button className="apply">
                <I18nText path="apply_button" />
              </button>
            </div>
            {/* nav */}
            <NavBar />
          </div>
        </section>
      )}
    </>
  );
};
export default Games;
