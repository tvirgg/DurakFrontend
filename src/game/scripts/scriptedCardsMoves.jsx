import { gsap } from "gsap";
import { animateMoveTo, animateVibrateCard } from "../utils/animationUtils";
import G from "../utils/mathUtils";
import { openCard } from "../utils/cardUtils";

export const scriptedCardsMoves = (
  activeCardData,
  className,
  toCard = null
) => {
  let tempic = document.querySelectorAll("." + className);
  let newTableCards = [];
  for (let i = 0; i < tempic.length; i++) {
    newTableCards.push(tempic[i]);
  }
  const cardStates = new Map(); // Хранит состояние каждой карты
  // Функция для получения полного состояния карты
  function getCardState(card) {
    return {
      scale: gsap.getProperty(card, "scale"),
      x: gsap.getProperty(card, "x"),
      y: gsap.getProperty(card, "y"),
      opacity: gsap.getProperty(card, "opacity"),
      rotate: gsap.getProperty(card, "rotate"),
      rotateY: gsap.getProperty(card, "rotateY"),
    };
  }

  // Функция для применения сохраненного состояния карты
  function applyCardState(card, state) {
    gsap.to(card, {
      scale: state.scale,
      x: state.x,
      y: state.y,
      opacity: state.opacity,
      rotate: state.rotate,
      rotateY: state.rotateY,
      duration: 0.3,
    });
  }

  function defaultSelfCards() {
    document.querySelectorAll(".self_card").forEach((card) => {
      card.classList.remove("b-card");
    });
  }
  function deactiveSelfCards() {
    let aCard = document.querySelector(".game .active-card");
    if (aCard) {
      let aW = aCard.getBoundingClientRect.width;
      gsap.to(aCard, { y: `+=${aW / 2}`, rotate: `-=${8}`, duration: 0.3 });
      cardDeactive(aCard);
    }
    document.querySelectorAll(".self_card").forEach((card) => {
      card.classList.add("b-card");
    });
  }
  function cardActive(card) {
    card.classList.add("active-card");
  }
  function cardDeactive(card) {
    card.classList.remove("active-card");
  }

  let activeCard;
  let cardsScale = 1;
  let cCard;
  if (toCard !== null) {
    let list = document.querySelectorAll(".game_card");
    for (let i = 0; i < list.length; i++) {
      if (list[i].dataset.name === toCard) {
        cCard = list[i];
        break;
      }
    }
  } else {
    cCard = document.querySelector(".enemy_card");
  }
  let list = document.querySelectorAll(".game_card");
  for (let i = 0; i < list.length; i++) {
    if (list[i].dataset.name === activeCardData) {
      activeCard = list[i];
      openCard(activeCard);
      break;
    }
  }
  let firstCard =
    newTableCards.length == 0 || newTableCards == 1 ? true : false;
  // verifying card types
  console.log(activeCard, newTableCards, toCard);

  activeCard.classList.remove("self_card");
  cardDeactive(activeCard);
  activeCard.classList.add("table_card");
  activeCard.classList.add(className);
  newTableCards.push(activeCard);

  let rect = cCard.getBoundingClientRect();

  let commonY = rect.y;
  let newPosCard; // Установите общую Y координату для всех карт.
  if (toCard != null) {
    activeCard.style.zIndex = cCard.style.zIndex + 1;
    newPosCard = {
      x: firstCard ? rect.x : rect.x,
      y: commonY - rect.height / 5,
      z: rect.z + 1,
    };
  } else {
    newPosCard = {
      x: firstCard ? rect.x - rect.width + 5 : rect.x,
      y: commonY,
    };
  }
  let newPosChangeCard = {
    x: firstCard ? rect.x + 10 : rect.x + rect.width + 5,
    y: commonY,
  };
  if (newTableCards.length >= 3 && toCard === null) {
    setTimeout(() => {
      let el2 = null;
      let fullTable = [];
      let tableCards = document.querySelectorAll(".table_card");
      for (let i = 0; i < tableCards.length; i++) {
        fullTable.push(tableCards[i]);
      }
      for (let i = 0; i < fullTable.length; i++) {
        const el = fullTable[i];
        if (i == 2) {
          el2 = el.getBoundingClientRect();
        }
        let elRect = el.getBoundingClientRect();
        let elY = elRect.y - elRect.height - 10;
        animateMoveTo(el, null, elY, 1, 0.5, 0);
      }
      if (el2) {
        animateMoveTo(cCard, el2.x - 5, null, cardsScale, 0.3, 0.1, false);
      }
    }, 500);
  }
  console.log(activeCard, cCard, "scripted");
  animateMoveTo(
    activeCard,
    newPosCard.x,
    newPosCard.y,
    cardsScale,
    0.3,
    0.1
    // false
  );
  if (toCard == null) {
    console.log("toCard", toCard);
    animateMoveTo(
      cCard,
      newPosChangeCard.x,
      newPosChangeCard.y,
      cardsScale,
      0.3,
      0.1,
      false
    );
  }
};
