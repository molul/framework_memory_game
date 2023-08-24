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
	const [endGame, setEndGame] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

		setEndGame(false);
		setChoiceOne(null);
		setChoiceTwo(null);
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
				setTimeout(()=> {
					resetTurn();
				}, 500);
			} else {
				setTimeout(()=> resetTurn(), 1000)
			}
		}

	}, [choiceOne, choiceTwo])

	const checkEndGame = () => {
		let isEnd = true;
		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];
			if (card.matched === false) {
				isEnd = false;
			}
		}
		setEndGame(isEnd)
	}

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prevTurns => prevTurns + 1)
		setDisabled(false)
	}

	useEffect(() => {
		shuffleCards()
	}, [])

	useEffect(() => {
		checkEndGame();
	}, [cards])

  return (
    <>
			<div className="font-montserrat bg-stone-800 h-screen">
				<h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pt-8">FRAMEWORKS MEMORY GAME</h1>
				<button
					onClick={shuffleCards}
					className="
						my-8
						bg-blue-600 
						hover:bg-blue-500 
						transition-colors
						text-base
						sm:text-lg 
						md:text-xl

						px-4
						py-2 
						rounded-lg 
						"
				>
					NEW GAME
				</button>

				<div className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600  w-full py-4 transition-opacity duration-1000 ${endGame ? 'z-50 opacity-100' : 'z-1 opacity-0'}`}>
					YOU WIN!!
				</div>

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
				
				<div className="text-lg mt-4 py-2 ">
					<span className="font-bold">Turns:</span> {turns}
				</div>
			</div>
    </>
  );
}

export default App;
