import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
  { src: "/img/angular.jpg" },
  { src: "/img/django.jpg" },
  { src: "/img/nextjs.jpg" },
  { src: "/img/nuxt.jpg" },
  { src: "/img/react.jpg" },
  { src: "/img/vue.jpg" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

	// Handle a choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

	}

  return (
    <>
      <h1 className="text-4xl font-bold my-4">FRAMEWORKS MEMORY GAME</h1>
      <button
        onClick={shuffleCards}
        className="
					my-4
					bg-blue-600 
					hover:bg-blue-500 
					transition-colors
					text-lg 
					p-2 
					rounded-lg 
					"
      >
        New game
      </button>

      <div className="max-w-[860px] p-8 grid grid-cols-3 md:grid-cols-4 gap-4 mx-auto">
        {cards.map((card, index) => (
          <Card handleChoice={handleChoice} key={index} card={card} />
        ))}
      </div>
    </>
  );
}

export default App;
