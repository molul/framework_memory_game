import { useEffect, useState } from "react";
import "../App.css";
import Card from "./Card";
import Interface from "./Interface";

const cardImages = [
  { src: "/img/angular.jpg", matched: false },
  { src: "/img/django.jpg", matched: false },
  { src: "/img/nextjs.jpg", matched: false },
  { src: "/img/nuxt.jpg", matched: false },
  { src: "/img/react.jpg", matched: false },
  { src: "/img/vue.jpg", matched: false },
];

const Game = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setEndGame(false);
    setChoiceOne(null);
    setChoiceTwo(null);

    // Small timeout to not show the new cards on reset
    setTimeout(() => {
      setCards(shuffledCards);
      setTurns(0);
    }, 500);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne
      ? choiceOne.id !== card.id && setChoiceTwo(card)
      : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => {
          resetTurn();
        }, 500);
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const checkEndGame = () => {
    let isEnd = true;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (card.matched === false) {
        isEnd = false;
      }
    }
    setEndGame(isEnd);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      checkEndGame();
    }
  }, [cards]);

  return (
    <div className=" text-center flex flex-col h-full grow">
      {/* Interface */}
      <Interface turns={turns} endGame={endGame} shuffleCards={shuffleCards} />

      {/* CARDS GRID */}
      <div className="flex grow h-full relative bg-slate-300 rounded-lg">
        <div className="flex flex-wrap items-center justify-center mx-auto rounded-lg shadow-lg w-full overflow-hidden p-2 ">
          {cards.map((card, index) => (
            <div key={index} className="w-1/3 md:w-1/4 p-2">
              <Card
                handleChoice={handleChoice}
                key={index}
                card={card}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
