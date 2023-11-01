/* eslint-disable react/prop-types */
import "./Card.css";

// eslint-disable-next-line react/prop-types
const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="relative card flex ">
      <div
        className={`
				flex
				overflow-hidden 
				text-center
				${flipped ? "flipped" : ""}
				`}
      >
        <img
          className="front mx-auto rounded-lg border-4 border-slate-500 bg-green-400 w-full block"
          src={card.src}
          alt={"front-" + card.src}
        />

        <img
          onClick={handleClick}
          className="transition-transform back mx-auto  rounded-lg border-4 border-slate-500 bg-green-400  w-full block"
          src="/img/back.jpg"
          alt="back"
        />
      </div>
    </div>
  );
};

export default Card;
