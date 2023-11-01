import NewGameButton from "./NewGameButton";

// eslint-disable-next-line react/prop-types
const Interface = ({ turns, endGame, shuffleCards }) => {
  return (
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
  );
};

export default Interface;
