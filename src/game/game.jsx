import React, { useRef, useEffect, useState, useCallback } from "react";
// css
import "../game/css/game.css";
// img
import imgAvatar from "../media/img/avatar.png";
// components
import GameCard from "./res/components/gameCard";
import Timer from "./res/components/timer";
// functions
import { generateDeck } from "./utils/deckUtils";
import { scriptedCardsMoves } from "./scripts/scriptedCardsMoves";
import connectToSocket from "../connectToSocket";
// card Utils
import {
  shuffleDeck,
  getRandomCards,
  findCardById,
  findCardsById,
  cardToSelf,
} from "./utils/cardUtils";
// animate Utils
import {
  animateMoveTo,
  animateGetCardsPlayerSelf,
  animateShowTrumpCard,
} from "./utils/animationUtils";
// localStorageUtils
import localStorageUtils from "./utils/localStorageUtils";
// events
import { touchEvents } from "./scripts/touchEvents";
import EmojiPopup from "../components/emoji.popup";
import { I18nText } from "../components/i18nText";
import { useIntl } from "react-intl";
import axios, { all } from "axios";
import config from "../config";
import ShowPopup from "../ShowPopup";
import { ConeStriped } from "react-bootstrap-icons";

// game
const Game = () => {
  const intl = useIntl();
  const playerTitle = intl.formatMessage({ id: "player_title" });

  const [game, setGame] = useState({
    status: "load", // loading, await, start, distribution,trump_card, play, end ...
    cardsCount: 36,
    playersCount: 6,
    trumpCard: null,
  });
  // Сам игрок
  let player_selfk = {
    id: 4,
    index: 4,
    status: "online",
    name: `${playerTitle} 1`,
    avatar: imgAvatar,
    cards: [],
    cardsCount: 0,
    self: true,
  };
  // Массив других игроков
  let otherPlayerk = [
    {
      id: 1,
      index: 1,
      status: "online",
      name: `${playerTitle} 1`,
      avatar: imgAvatar,
      cards: [],
      cardsCount: 0,
      self: false,
    },
    {
      id: 2,
      index: 2,
      status: "online",
      name: `${playerTitle} 2`,
      avatar: imgAvatar,
      cards: [],
      cardsCount: 0,
      self: false,
    },
    {
      id: 3,
      index: 3,
      status: "online",
      name: `${playerTitle} 3`,
      avatar: imgAvatar,
      cards: [],
      cardsCount: 0,
      self: false,
    },
  ];
  // functions
  // timer
  const [timerActive, setTimerActive] = useState(false);
  const [madeMove, setMadeMove] = useState(false);
  const [enemyCardPos, setEnemyCardPos] = useState({});
  const [changeCardPos, setChangeCardPos] = useState({});
  const [duration, setDuration] = useState(15);
  //
  const handleTimerFinish = (finished) => {
    if (finished) {
      handleTimerStop();
      console.log("Таймер завершился");
      if (duration != 3) {
        // Ваш код для обработки завершения таймера
        let gameStatus = JSON.parse(localStorage.getItem("game_status"));
        let index = calculateIndex();
        if (gameStatus.attackerCards.length == 0) {
          setTimeout(() => {
            setDuration(15);
            setTimerActive(true);
            enablePlayerControls();
          }, 3000);
        } else {
          if (index == gameStatus.attackerIndex) {
            axios
              .post(
                `${config.url}/game/finish-turn`,
                {
                  gameId: gameStatus.gameId,
                },
                {
                  headers: {
                    "Access-Control-Expose-Headers": "X-Session",
                    "X-Session": localStorage.getItem("session_key"),
                  },
                }
              )
              .then((res) => {
                localStorage.setItem("game_status", JSON.stringify(res.data));
                localStorage.setItem(
                  "session_key",
                  res.headers.get("X-Session")
                );

                finisher();
              })
              .catch((err) => {
                localStorage.setItem(
                  "session_key",
                  err.response.headers.get("X-Session")
                );
              });
          }
        }
      }
    }
  };

  const finisher = async () => {
    let gameStatus = JSON.parse(localStorage.getItem("game_status"));
    let tableCards = document.querySelectorAll(".table_card");
    let id = JSON.parse(localStorage.getItem("user")).id;
    let temp = document.querySelectorAll(".self_card");
    const cardsToPlayers = [];
    const cardsToSelf = [];
    const trashCards = [];
    let foundOwner = false;
    const animDur = 0.6;

    for (let i = 0; i < temp.length; i++) {
      temp[i].setAttribute("style", "");
      cardsToSelf.push(temp[i]);
    }
    temp = document.querySelectorAll(".game_card");
    for (let i = 0; i < temp.length; i++) {
      if (
        temp[i].classList.length === 2 ||
        (temp[i].classList.contains("trump_card") &&
          temp[i].classList.length === 4)
      ) {
        for (let j = 0; j < gameStatus.players.length; j++) {
          if (gameStatus.players[j].id == id) {
            for (let k = 0; k < gameStatus.players[j].cards.length; k++) {
              let name = cardConverter(gameStatus.players[j].cards[k]);
              if (temp[i].dataset.name == name) {
                temp[i].setAttribute("style", "");
                cardsToSelf.push(temp[i]);
              }
            }
          } else {
            let xT = document
              .getElementById(gameStatus.players[j].id)
              .getBoundingClientRect().left;
            let yT = document
              .getElementById(gameStatus.players[j].id)
              .getBoundingClientRect().top;
            for (let k = 0; k < gameStatus.players[j].cards.length; k++) {
              let name = cardConverter(gameStatus.players[j].cards[k]);
              if (temp[i].dataset.name == name) {
                cardsToPlayers.push({
                  card: temp[i],
                  x: xT,
                  y: yT,
                  animDur: animDur,
                  toScale: 0,
                  rotation: true,
                });
              }
            }
          }
        }
      }
    }

    let playerPos = null;

    for (let i = 0; i < tableCards.length; i++) {
      foundOwner = false;
      tableCards[i].classList.remove("table_card");
      tableCards[i].classList.remove("enemy_attacked_card");
      tableCards[i].classList.remove("enemy_defend_card");
      for (let j = 0; j < gameStatus.players.length; j++) {
        const isSelf = id === gameStatus.players[j].id;
        const playerRef =
          id === gameStatus.players[j].id
            ? playerSelfRef.current.getBoundingClientRect()
            : document
                .getElementById(gameStatus.players[j].id)
                .getBoundingClientRect();
        const pX = playerRef.left;
        const pY = playerRef.top;
        if (isSelf) {
          playerPos = { x: pX, y: pY };
        }
        for (let k = 0; k < gameStatus.players[j].cards.length; k++) {
          let name = cardConverter(gameStatus.players[j].cards[k]);
          if (tableCards[i].dataset.name == name) {
            foundOwner = true;

            if (isSelf) {
              cardsToSelf.push(tableCards[i]);
            } else {
              cardsToPlayers.push({
                card: tableCards[i],
                x: pX,
                y: pY,
                animDur: animDur,
                toScale: 0,
                rotation: true,
              });
            }
          }
        }
      }
      if (!foundOwner) {
        tableCards[i].classList.remove("game_card");
        tableCards[i].remove();
      }
    }
    console.log(cardsToPlayers);
    console.log(cardsToSelf, enemyCardPos, changeCardPos);

    const cardElements = cardsToPlayers.map(
      ({ card, x, y, animDur, toScale, rotation, index }) => {
        const cardElement = card;
        if (cardElement) {
          return new Promise((resolve) => {
            setTimeout(() => {
              animateMoveTo(cardElement, x, y, toScale, animDur, 0, rotation);
              resolve();
            }, index * 100); // Задержка в миллисекундах для каждой карты
          });
        } else {
          return Promise.resolve();
        }
      }
    );
    const trashCardElements = trashCards.map(
      ({ card, x, y, animDur, toScale, rotation, index }) => {
        const cardElement = card;
        if (cardElement) {
          return new Promise((resolve) => {
            setTimeout(() => {
              animateMoveTo(cardElement, x, y, toScale, animDur, 0, rotation);
              resolve();
            }, index * 100); // Задержка в миллисекундах для каждой карты
          });
        } else {
          return Promise.resolve();
        }
      }
    );

    await Promise.all(cardElements);
    await Promise.all(trashCardElements);
    if (playerPos != null && playerPos.x != null && playerPos.y != null) {
      await animateGetCardsPlayerSelf(
        cardsToSelf,
        playerPos.x,
        playerPos.y,
        1.5,
        animDur,
        0
      );
    }

    await animateMoveTo(
      document.querySelector(".enemy_card"),
      document.documentElement.clientWidth / 2 -
        Math.min(20, document.documentElement.clientWidth * 0.05, 40),
      document.documentElement.clientHeight / 3 - 60,
      1,
      animDur,
      0,
      false
    );
    await animateMoveTo(
      document.querySelector(".change_card"),
      document.documentElement.clientWidth / 2 -
        Math.min(20, document.documentElement.clientWidth * 0.05, 40),
      document.documentElement.clientHeight / 2 - 60,
      1,
      animDur,
      0,
      false
    );

    setTimeout(() => {
      setDuration(15);
      setTimerActive(true);
      enablePlayerControls();
    }, 3000);
  };

  const handleTimerStop = useCallback(() => {
    setTimerActive(false);
    disablePlayerControls();
    console.log("Таймер остановлен");
  }, []);

  const toggleTimer = () => {
    setTimerActive((prev) => !prev);
  };

  const calculateIndex = () => {
    let gameStatus = JSON.parse(localStorage.getItem("game_status"));
    let playerMas = gameStatus.players;
    let des = 0;
    for (let i = 0; i < playerMas.length; i++) {
      if (playerMas[i].id == JSON.parse(localStorage.getItem("user")).id) {
        des = i;
        break;
      }
    }
    return des;
  };

  const disablePlayerControls = () => {
    setCardsDisabled(true);
    controlBtns(false, false, false, true);
    setCardsDisabled(true);
  };

  const enablePlayerControls = () => {
    setCardsDisabled(false);
    controlBtns(true, true, true, true);
    setCardsDisabled(false);
  };
  const controlBtns = (cheat, take, pass, react) => {
    setButtonStates({
      cheat: cheat,
      take: take,
      pass: pass,
      react: react,
    });
  };
  //
  //
  //
  const [otherPlayers, setOtherPlayers] = useState(otherPlayerk);
  const [player_self, setPlayer_self] = useState(player_selfk);
  const [allPlayers, setAllPlayers] = useState([...otherPlayers, player_self]);
  const [deck, setDeck] = useState([]);
  const [fullGameDeck, setFullGameDeck] = useState({});
  const [remainingDeck, setRemainingDeck] = useState([]);
  const [cardsShuffled, setCardsShuffled] = useState(false);
  const [playerSelfCards, setPlayerSelfCards] = useState([]);
  const [showEmojiPopup, setShowEmojiPopup] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedEmojiClass, setSelectedEmojiClass] = useState("");
  const [buttonStates, setButtonStates] = useState({
    cheat: false,
    take: false,
    pass: false,
    react: false,
  });
  // Refs
  const playerRefs = useRef([]);
  const cardRefs = useRef([]);
  // play
  const [gamePlaying, setGamePlaying] = useState(false);
  // UI bools
  const [cardsDisabled, setCardsDisabled] = useState(false);

  const listener = (res) => {
    console.log(res, fullGameDeck);
    let gameStatus = res;
    if (
      gameStatus["gameState"] != null &&
      gameStatus["gameState"] == "game_over"
    ) {
      window.location.href = "/games";
    }
    if (
      gameStatus["deck"] != null &&
      JSON.parse(localStorage.getItem("game_status"))["deck"] == null
    ) {
      console.log("wait");
      localStorage.setItem("game_status", JSON.stringify(gameStatus));
      setTimeout(() => {
        setGame(
          (prevGame) => ({
            ...prevGame,
            status: "start",
          }),
          1000
        );
      });
    } else if (
      gameStatus["attackerCards"] != null &&
      gameStatus["attackerCards"].length === 0
    ) {
      localStorage.setItem("game_status", JSON.stringify(gameStatus));
      finisher();
    } else if (gameStatus.players.length < gameStatus.fieldSize / 6 - 1) {
      setGame((prevGame) => ({
        ...prevGame,
        status: "await",
      }));
    } else if (checkAllPlayersNull(gameStatus)) {
      setMadeMove(false);
      if (
        gameStatus.players[0].id == JSON.parse(localStorage.getItem("user")).id
      ) {
        setTimeout(() => {
          axios
            .post(
              `${config.url}/game/start-game`,
              {
                gameId: gameStatus.gameId,
              },
              {
                headers: {
                  "Access-Control-Expose-Headers": "X-Session",
                  "X-Session": localStorage.getItem("session_key"),
                },
              }
            )
            .then((res) => {
              setGame((prevGame) => ({
                ...prevGame,
                status: "start",
              }));
              localStorage.setItem("game_status", JSON.stringify(res.data));
              localStorage.setItem("session_key", res.headers.get("X-Session"));
              setFullGameDeck(res.data);
            })
            .catch((err) => {
              localStorage.setItem(
                "session_key",
                err.response.headers.get("X-Session")
              );
            });
        }, 10000);
      }
    } else {
      console.log(playerRefs, playerSelfRef);
      setDuration((prev) => prev + 1);

      new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {});
      // timer.classList.add("timer_active");

      let playerMas = gameStatus.players;
      let des = 0;
      for (let i = 0; i < playerMas.length; i++) {
        if (playerMas[i].id == JSON.parse(localStorage.getItem("user")).id) {
          des = i;
          break;
        }
      }
      console.log(des);
      if (
        des === (gameStatus.attackerIndex + 1) % gameStatus.players.length &&
        calculateNewCard(gameStatus, ".enemy_attacked_card") != null
      ) {
        let card = cardConverter(
          calculateNewCard(gameStatus, ".enemy_attacked_card")
        );
        scriptedCardsMoves(card, "enemy_attacked_card");
      } else if (des === gameStatus.attackerIndex) {
        let card = calculateNewCard(gameStatus, ".enemy_defend_card");
        let defendAganist = null;
        for (let i = 0; i < gameStatus.defenderCards.length; i++) {
          if (card === gameStatus.defenderCards[i]) {
            defendAganist = gameStatus.attackerCards[i];
            break;
          }
        }
        // if (card !== null) {
        //   setTimerActive(true);
        //   enablePlayerControls();
        // }
        console.log(card, defendAganist);
        scriptedCardsMoves(
          cardConverter(card),
          "enemy_defend_card",
          cardConverter(defendAganist)
        );
      }
      localStorage.setItem("game_status", JSON.stringify(gameStatus));
    }

    setFullGameDeck(gameStatus);
  };

  const checkAllPlayersNull = (gameStatus) => {
    for (let i = 0; i < gameStatus.players.length; i++) {
      if (gameStatus.players[i].cards.length > 0) {
        return false;
      }
    }

    return true;
  };
  // eff
  const statusChanger = () => {
    if (game.status === "load") {
      let gameStatus = JSON.parse(localStorage.getItem("game_status"));

      setFullGameDeck(gameStatus);

      console.log("gameStatus", fullGameDeck);

      if (gameStatus?.players.length <= gameStatus?.fieldSize / 6 - 1) {
        setGame((prevGame) => ({
          ...prevGame,
          status: "await",
        }));
        connectToSocket(gameStatus.gameId, listener);
      } else {
        setGame((prevGame) => ({
          ...prevGame,
          status: "start",
        }));
      }
    }
  };

  // game-load
  useEffect(() => {
    statusChanger();
  }, [game.status, fullGameDeck]);

  const calculateNewCard = (gameStatus, classNaming) => {
    let prevgameStatus = JSON.parse(localStorage.getItem("game_status"));
    let lst = null;
    let newlst = null;
    if (classNaming === ".enemy_attacked_card") {
      lst = prevgameStatus.attackerCards;
      newlst = gameStatus.attackerCards;
    } else if (classNaming === ".enemy_defend_card") {
      lst = prevgameStatus.defenderCards;
      newlst = gameStatus.defenderCards;
    }
    let find = false;

    for (let i = 0; i < newlst.length; i++) {
      find = false;
      for (let j = 0; j < lst.length; j++) {
        if (
          newlst[i].nominal === lst[j].nominal &&
          newlst[i].name === lst[j].name
        ) {
          find = true;
          break;
        }
      }
      if (!find) {
        return newlst[i];
      }
    }

    return null;
  };
  function cardConverter(card) {
    let seconpart = "";
    if (card.nominal <= 10) {
      seconpart = card.nominal.toString();
    } else if (card.nominal == 11) {
      seconpart = "J";
    } else if (card.nominal == 12) {
      seconpart = "Q";
    } else if (card.nominal == 13) {
      seconpart = "K";
    } else if (card.nominal == 14) {
      seconpart = "A";
    }
    let car = card.name[0].toLowerCase() + seconpart;
    return car;
  }

  // game-start
  useEffect(() => {
    if (game.status === "start" && !cardsShuffled) {
      setEnemyCardPos({
        x: document.querySelector(".enemy_card").getBoundingClientRect().left,
        y: document.querySelector(".enemy_card").getBoundingClientRect().left,
      });
      setChangeCardPos((prevChangeCardPos) => ({
        ...prevChangeCardPos,
        x: document.querySelector(".change_card").getBoundingClientRect().left,
        y: document.querySelector(".change_card").getBoundingClientRect().top,
      }));
      console.log("starting Game");
      let id = 1;
      // Перемешивание и раздача карт
      const generatedDeck = generateDeck(game.cardsCount);
      setDeck(generatedDeck);

      // Обновляем состояние игроков с уникальными картами
      // const updatedPlayers = [...allPlayers];
      let updatedPlayers = [];
      var ownPlayer = {};
      let backPlayers = JSON.parse(localStorage.getItem("game_status"))[
        "players"
      ];

      backPlayers.forEach((player, index) => {
        if (player.id != JSON.parse(localStorage.getItem("user")).id) {
          let tempCards = [];
          player.cards.forEach((card, index) => {
            let seconpart = "";
            if (card.nominal <= 10) {
              seconpart = card.nominal.toString();
            } else if (card.nominal == 11) {
              seconpart = "J";
            } else if (card.nominal == 12) {
              seconpart = "Q";
            } else if (card.nominal == 13) {
              seconpart = "K";
            } else if (card.nominal == 14) {
              seconpart = "A";
            }
            let car = card.name[0].toLowerCase() + seconpart;
            tempCards.push({
              id: id++,
              type: card.name[0].toLowerCase(),
              name: car,
              value: card.nominal,
              nominal: card.nominal,
              nameBack: card.name,
              playerOwner: card.playerOwner,
            });
          });
          updatedPlayers.push({
            avatar: `https://t.me/i/userpic/160/${player.user.tgNickname}.jpg`,
            cardsCount: player.cards.length,
            id: player.id,
            name: player.user.username,
            cards: tempCards,
            index: index,
            status: player.user.status,
            self: false,
          });
        } else {
          let tempCards = [];
          player.cards.forEach((card, index) => {
            let seconpart = "";
            if (card.nominal <= 10) {
              seconpart = card.nominal.toString();
            } else if (card.nominal == 11) {
              seconpart = "J";
            } else if (card.nominal == 12) {
              seconpart = "Q";
            } else if (card.nominal == 13) {
              seconpart = "K";
            } else if (card.nominal == 14) {
              seconpart = "A";
            }
            let car = card.name[0].toLowerCase() + seconpart;
            tempCards.push({
              id: id++,
              type: card.name[0].toLowerCase(),
              name: car,
              value: card.nominal,
              nominal: card.nominal,
              nameBack: card.name,
              playerOwner: card.playerOwner,
            });
          });
          ownPlayer = {
            avatar: `https://t.me/i/userpic/160/${player.user.tgNickname}.jpg`,
            cardsCount: player.cards.length,
            id: player.id,
            name: player.user.username,
            cards: tempCards,
            index: index,
            status: player.user.status,
            self: true,
          };
        }
      });
      for (let i = 0; i < updatedPlayers.length; i++) {
        if (
          updatedPlayers[i].id == JSON.parse(localStorage.getItem("user")).id
        ) {
          console.log("ownPlayer");
          updatedPlayers.splice(i, 1);
          break;
        }
      }
      console.log("update players", updatedPlayers);

      setOtherPlayers(updatedPlayers);
      setPlayer_self(ownPlayer);

      // updatedPlayers.forEach((player) => {
      //   const playerCards = getRandomCards(deckCopy, 6); // Получаем уникальные карты
      //   player.cards = playerCards;
      //   player.cardsCount = playerCards.length;

      //   // Удаляем выданные карты из колоды
      //   playerCards.forEach((card) => {
      //     const cardIndex = deckCopy.findIndex(
      //       (deckCard) => deckCard.id === card.id
      //     );
      //     if (cardIndex !== -1) {
      //       deckCopy.splice(cardIndex, 1);
      //     }
      //   });
      // });
      let temp = [];
      for (let i = 0; i < updatedPlayers.length; i++) {
        temp.push(updatedPlayers[i]);
      }

      temp.push(ownPlayer);

      setAllPlayers(temp);
      setCardsShuffled(true);
      setGame((prevGame) => ({
        ...prevGame,
        status: "distribution",
      }));
    }
  }, [game.status, cardsShuffled]);

  // game-distribution
  useEffect(() => {
    if (game.status === "distribution") {
      const animDur = 0.6;

      async function distributeCardsToPlayer(player, playerIndex) {
        const playerRef = playerRefs.current[playerIndex]
          ? playerRefs.current[playerIndex].getBoundingClientRect()
          : playerSelfRef.current.getBoundingClientRect();
        const pX = playerRef.left;
        const pY = playerRef.top;

        let playerCards = player.cards;
        console.log("playerCards", playerCards);
        const boolPlayerSelf = player.self;
        console.log(player);

        if (!boolPlayerSelf) {
          const cardPromises = playerCards.map((card, index) => {
            const cardElement = findCardById(card.id);
            if (cardElement) {
              return new Promise((resolve) => {
                setTimeout(() => {
                  animateMoveTo(cardElement, pX, pY, 0, animDur, 0);
                  resolve();
                }, index * 100); // Задержка в миллисекундах для каждой карты
              });
            } else {
              return Promise.resolve();
            }
          });

          await Promise.all(cardPromises);
        } else {
          playerCards = findCardsById(playerCards);
          setPlayerSelfCards(playerCards);
          await animateGetCardsPlayerSelf(playerCards, pX, pY, 1.5, animDur, 0);
        }
      }

      async function distributeAllCards() {
        // Сначала раздаем карты всем игрокам
        const playerPromises = allPlayers.map((player, i) => {
          return new Promise((resolve) => {
            setTimeout(async () => {
              await distributeCardsToPlayer(player, i);
              resolve();
            }, i * allPlayers[i].cards.length * 100); // Задержка для каждого игрока
          });
        });

        await Promise.all(playerPromises);

        // Обновляем колоду, удаляя разданные карты
        const dealtCards = allPlayers.flatMap((player) => player.cards);
        const rDeck = deck.filter(
          (card) => !dealtCards.some((dealtCard) => dealtCard.id === card.id)
        );
        setRemainingDeck(rDeck);

        // После завершения анимаций, выбираем козырную карту из оставшейся колоды

        setGame((prevGame) => ({
          ...prevGame,
          status: "trump_card", // Меняем статус на следующую фазу
        }));
      }

      distributeAllCards();
    }
  }, [game.status, allPlayers, cardRefs, playerRefs, deck]);

  const playerSelfRef = useRef(null); // Создаем ref для player_self

  // Обновляем useEffect
  useEffect(() => {
    if (playerSelfRef.current) {
      playerRefs.current.push(playerSelfRef.current); // Добавляем ref в конец массива playerRefs
    }
  }, [playerSelfRef]);

  // game-selecting trump Card
  useEffect(() => {
    if (game.status === "trump_card") {
      // Проверяем, что колода не пуста
      if (remainingDeck.length > 0) {
        // Выбираем последнюю карту из оставшейся колоды как козырную карту
        let trumpCard = fullGameDeck.trumpCard;
        let trumpCardEl;
        for (let i = 0; i < remainingDeck.length; i++) {
          if (
            remainingDeck[i].nominal === trumpCard.nominal &&
            remainingDeck[i].nameBack === trumpCard.name
          ) {
            trumpCard = remainingDeck[i];
            trumpCardEl = findCardById(remainingDeck[i].id);
            break;
          }
        }
        if (trumpCardEl) {
          trumpCardEl.classList.add("trump_card");
          animateShowTrumpCard(trumpCardEl);
        }
        // Можно сохранить козырную карту в состояние игры или выполнить другие действия
        // Пример: обновляем состояние игры с козырной картой
        setGame((prevGame) => ({
          ...prevGame,
          trumpCard: trumpCard, // Сохраняем козырную карту
          status: "play", // Меняем статус на следующую фазу (например)
        }));
      }
    }
  }, [game.status, deck]);

  // play
  useEffect(() => {
    if (game.status === "play") {
      // Получаем функцию очистки
      const cleanUp = touchEvents(playerSelfCards, cardsDisabled, setMadeMove);

      // Очистка при размонтировании или изменении зависимостей
      const timer = document.querySelector(".game .timer");
      if (!gamePlaying) {
        controlBtns(true, true, true, true); // Активируем все кнопки
        setGamePlaying(true);

        setTimerActive(true);

        timer.classList.add("timer_active");
      }

      setGame((prevGame) => ({
        ...prevGame,
        status: "play", // Меняем статус на следующую фазу (например)
      }));
      return () => cleanUp();
    }
  }, [game.status, playerSelfCards, cardsDisabled]);
  // ~

  // Новые функции для эмодзи
  const toggleEmojiPopup = useCallback(() => {
    setShowEmojiPopup((prev) => !prev);
  }, []);

  const selectEmoji = useCallback(async (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiPopup(false);
    setSelectedEmojiClass("show");
    const gameStatus = JSON.parse(localStorage.getItem("game_status"));

    console.log(emoji);

    try {
      await axios
        .post(
          config.url + "/game/emoji",
          {
            gameId: gameStatus.gameId,
            path: emoji,
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
        });
    } catch (e) {
      ShowPopup(e.response.data, "Error");
    }

    const hideTimeout = setTimeout(() => setSelectedEmojiClass("hide"), 1750);
    const clearTimeout = setTimeout(() => {
      setSelectedEmoji(null);
      setSelectedEmojiClass("");
    }, 2250);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(clearTimeout);
    };
  }, []);

  const finishTurn = () => {
    let gameStatus = JSON.parse(localStorage.getItem("game_status"));
    let playerMas = gameStatus.players;
    let des = 0;
    for (let i = 0; i < playerMas.length; i++) {
      if (playerMas[i].id == JSON.parse(localStorage.getItem("user")).id) {
        des = i;
        break;
      }
    }

    if (des === (gameStatus.attackerIndex + 1) % gameStatus.players.length) {
      axios
        .post(
          config.url + "/game/finish-turn",
          {
            gameId: gameStatus.gameId,
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
          localStorage.setItem("game_status", JSON.stringify(res.data));
          setGame((prevGame) => ({
            ...prevGame,
            status: "start",
          }));
        })
        .catch((err) => {
          localStorage.setItem(
            "session_key",
            err.response.headers.get("X-Session")
          );
        });
    }
  };

  const playerCenterIndex = Math.floor(otherPlayers.length / 2);
  // render
  return (
    <section className="game">
      {/* players */}
      <div className="players">
        {otherPlayers.map((player, index) => {
          let topPosition = "0px";

          if (otherPlayers.length > 2) {
            if (index <= playerCenterIndex) {
              // Подъем до центрального элемента
              topPosition = `${(playerCenterIndex - index) * 50}px`;
            } else {
              // Спуск после центрального элемента
              topPosition = `${(index - playerCenterIndex) * 50}px`;
            }
          }

          return (
            <div
              className="player"
              id={player.id}
              key={player.id}
              ref={(el) => (playerRefs.current[index] = el)}
              style={{ position: "relative", marginTop: topPosition }}
            >
              <div className="picture">
                <img
                  className="profile"
                  src={player.avatar}
                  alt="player_picture"
                />
                {/* <img className="frame" src={imgFrame} alt="frame" /> */}
              </div>
              <span className="player_name">{player.name}</span>
            </div>
          );
        })}
      </div>
      {game.status === "await" && fullGameDeck.fieldSize !== null && (
        <div
          className="await"
          style={{
            zIndex: 1000,
            position: "absolute",
            left: "50%",
            top: "20%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(30px, 4vw, 40px)",
          }}
        >
          {fullGameDeck.players.length}/{fullGameDeck.fieldSize / 6 - 1}
        </div>
      )}
      {/* timer */}

      <Timer
        duration={duration}
        onFinish={handleTimerFinish}
        isActive={timerActive}
      />

      {/* change_card */}
      <span className="change_card"></span>
      <span className="enemy_card"></span>

      {deck.map((card, index) => (
        <GameCard
          style={{ zIndex: deck.length - index }} // Передаем объект стиля
          ref={(el) => (cardRefs.current[index] = el)}
          key={card.id}
          id={card.id}
          type={card.type}
          name={card.name}
          value={card.value}
        ></GameCard>
      ))}

      {/* player_self */}
      <div className="player_self" ref={playerSelfRef}>
        {/* <div className="cards"></div> */}
      </div>
      {/* game control buttons */}
      <div className="control_btns">
        <button
          className="cheat"
          onClick={toggleTimer}
          disabled={!buttonStates.cheat}
        >
          <I18nText path="cheat_button" />
        </button>
        <button className="take" disabled={!buttonStates.take}>
          <I18nText path="take_button" />
        </button>
        <button
          className="pass"
          disabled={!buttonStates.pass}
          onClick={finishTurn}
        >
          <I18nText path="pass_button" />
        </button>
        <button
          className="react"
          onClick={toggleEmojiPopup}
          disabled={!buttonStates.react}
        >
          <I18nText path="react_button" />
        </button>
      </div>

      {/* Popup с эмодзи */}
      <EmojiPopup onSelectEmoji={selectEmoji} show={showEmojiPopup} />

      {selectedEmoji && (
        <div className={`selected_emoji ${selectedEmojiClass}`}>
          <img src={selectedEmoji} alt="Selected Emoji" />
        </div>
      )}
    </section>
  );
};

export default Game;
