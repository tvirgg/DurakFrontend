import React, { useState } from "react";
// css
import "../media/css/market.css";
// components
import Preloader from "../includes/preloader";
import NavBar from "../components/nav.bar";
import ImageLoader from "../includes/imageLoader";
import PModal from "../components/ui/pModal";
// Продукты
import products from "../db/products"; // массив продуктов
// img
import catFrame from "../media/img/catFrame.png";
import catTable from "../media/img/catTable.png";
import catCard from "../media/img/catCard.png";
import catEmoji from "../media/img/catEmoji.png";

const Market = () => {
  const user = {
    balance: 2.0,
  };

  // Состояние для активного типа
  const [activeType, setActiveType] = useState("frame");
  const [activeCategories, setActiveCategories] = useState([]);

  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  const handleCategoryClick = (category) => {
    setActiveCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  // Фильтрация продуктов по активному типу и категориям
  const filteredProducts = products.filter(
    (product) =>
      product.type === activeType &&
      (activeCategories.length === 0 ||
        activeCategories.includes(product.category))
  );

  // modal state
  const [modalState, setModalState] = useState({
    isActive: false,
    type: null, // "success" или "fail"
    succesText: "You bought a new item!", // "success" или "fail"
  });

  const closeModal = () => {
    setModalState({ isActive: false, type: null });
  };

  const handleBuy = (price) => {
    if (user.balance >= price) {
      setModalState({
        isActive: true,
        type: "success",
        succesText: "You bought a new item!",
      });
    } else {
      setModalState({
        isActive: true,
        type: "fail",
      });
    }
  };

  return (
    <section className="page market pb-80">
      <Preloader />
      <div className="container">
        {/* main */}
        <header className="header_menu">
          <div className="type_btns">
            <button
              className={`btn frame ${
                activeType === "frame" ? "active-type" : ""
              }`}
              onClick={() => handleTypeClick("frame")}
            >
              <span>Frames</span>
              <img src={catFrame} alt="category" />
            </button>
            <button
              className={`btn table ${
                activeType === "table" ? "active-type" : ""
              }`}
              onClick={() => handleTypeClick("table")}
            >
              Tables
              <img src={catTable} alt="category" />
            </button>
            <button
              className={`btn card ${
                activeType === "card" ? "active-type" : ""
              }`}
              onClick={() => handleTypeClick("card")}
            >
              Cards
              <img src={catCard} alt="category" />
            </button>
            <button
              className={`btn emoji ${
                activeType === "emoji" ? "active-type" : ""
              }`}
              onClick={() => handleTypeClick("emoji")}
            >
              Emojis
              <img src={catEmoji} alt="category" />
            </button>
          </div>
          <div className="category_btns active_category">
            <button
              className={`btn standart ${
                activeCategories.includes("standart") ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("standart")}
            >
              Standart
            </button>
            <button
              className={`btn special ${
                activeCategories.includes("special") ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("special")}
            >
              Special
            </button>
            <button
              className={`btn rare ${
                activeCategories.includes("rare") ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("rare")}
            >
              Rare
            </button>
            <button
              className={`btn relic ${
                activeCategories.includes("relic") ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("relic")}
            >
              Relic
            </button>
          </div>
        </header>
        {/* products */}
        <div className="products">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product">
              <ImageLoader src={product.picture} alt={product.title} />
              <div className="content">
                <p className="title">{product.title}</p>
                <span className="price">{product.price} $</span>
                <button
                  className="buy_btn"
                  onClick={() => handleBuy(product.price)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* BModal component usage */}
        <PModal
          isActive={modalState.isActive}
          type={modalState.type}
          closeModal={closeModal}
          succesText={modalState.succesText}
        />

        {/* nav */}
        <NavBar />
      </div>
    </section>
  );
};

export default Market;
