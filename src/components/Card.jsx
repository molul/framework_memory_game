import './Card.css'

const Card = ({ card, handleChoice, flipped, disabled }) => {

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card)
		}
	}

  return (
    <div className='card '>
      <div className={`
				overflow-hidden 
				text-center
				${flipped 
					? 'flipped'
					:	''
				}
				`}
			>
				<img className="front  mx-auto rounded-lg border-4 border-slate-500 bg-green-400" src={card.src} alt={"front-" + card.src} />
        
				<img onClick={handleClick} className="transition-transform back mx-auto  rounded-lg border-4 border-slate-300 bg-green-400" src="/img/back.jpg" alt="back" />
      </div>
    </div>
  );
};


export default Card;
