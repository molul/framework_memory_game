import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import NewGameButton from "./components/NewGameButton";
import Header from "./components/Header";

const cardImages = [
  { src: "/img/angular.jpg", matched: false },
  { src: "/img/django.jpg", matched: false },
  { src: "/img/nextjs.jpg", matched: false },
  { src: "/img/nuxt.jpg", matched: false },
  { src: "/img/react.jpg", matched: false },
  { src: "/img/vue.jpg", matched: false },
];

function App() {
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
    <>
      <div className="font-montserrat bg-slate-700 h-screen flex flex-col justify-between">
        <div className="max-w-[860px] px-2 sm:px-6 lg:px-8 mx-auto py-4">
          <Header />

          <div className="text-center">
            {/* Interface */}
            <div className="flex justify-between items-center my-4 rounded-lg bg-slate-300 py-2 px-4 shadow-lg">
              {/* TURNS COUNT */}
              <div className="text-sm sm:text-lg text-black flex gap-1 items-center">
                <span className="font-bold">Turns</span>
                <div className="bg-slate-500 px-2 py-1 rounded-lg text-white border-2 border-slate-800">
                  {turns}
                </div>
              </div>

              {/* YOU WIN TEXT */}
              <div
                className={`bg-green-600 bg-opacity-95 transform-opacity duration-1000 text-sm sm:text-lg px-4 py-2 rounded-lg font-bold flex justify-center items-center ${
                  endGame ? "animate-pulse opacity-100" : "opacity-0"
                }`}
              >
                YOU WIN!!
              </div>

              {/* RESTART GAME BUTTON */}
              <div className="z-50">
                <NewGameButton func={shuffleCards} text="Restart" />
              </div>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 mx-auto bg-slate-300 p-4 sm:p-8 rounded-lg shadow-lg">
              {cards.map((card, index) => (
                <Card
                  handleChoice={handleChoice}
                  key={index}
                  card={card}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                  disabled={disabled}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-base bg-slate-500 p-4">
          Developed by{" "}
          <span className="font-bold">
            <a href="https://www.luismorcilloluque.com/en" target="_blank">
              Luis Morcillo
            </a>
          </span>{" "}
          with React &copy; 2023
        </div>
      </div>
    </>
  );
}

export default App;
