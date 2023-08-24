
const Card = ({card, handleChoice}) => {

	const handleClick = () => {
		handleChoice(card)
	}

  return (
    <div>
      <div className="rounded-lg overflow-hidden text-center">
				<img className="mx-auto rounded-lg border-2 border-white bg-green-400" src={card.src} alt={"front-" + card.src} />
        
				<img onClick={handleClick} className="mx-auto  rounded-lg border-2 border-white bg-green-400" src="/img/back.jpg" alt="back" />
      </div>
    </div>
  );
};


export default Card;
