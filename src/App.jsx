import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

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

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

		setChoiceOne(null)
		setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

	// Handle a choice
	const handleChoice = (card) => {
		choiceOne ? ( choiceOne.id !== card.id && setChoiceTwo(card)) : setChoiceOne(card);
	}

	useEffect (() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true}
						} else {
							return card;
						}
					})
				})
				resetTurn();
			} else {
				setTimeout(()=> resetTurn(), 1000)
			}
		}

	}, [choiceOne, choiceTwo])

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prevTurns => prevTurns + 1)
		setDisabled(false)
	}

	useEffect(() => {
		shuffleCards()
	}, [])

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-12">FRAMEWORKS MEMORY GAME</h1>
      <button
        onClick={shuffleCards}
        className="
					my-8
					bg-blue-600 
					hover:bg-blue-500 
					transition-colors
					text-lg 
					px-3
					py-2 
					rounded-lg 
					"
      >
        New game
      </button>

      <div className="max-w-[860px] px-8 grid grid-cols-3 md:grid-cols-4 gap-4 mx-auto">
        {cards.map((card, index) => (
          <Card 
						handleChoice={handleChoice} 
						key={index} 
						card={card}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
        ))}
      </div>
			<p>Turns: {turns}</p>
    </>
  );
}

export default App;
