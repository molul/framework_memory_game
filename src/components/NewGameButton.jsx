const NewGameButton = ({ func, text }) => {
  return (
    <button
      onClick={func}
      className={`
			bg-slate-600 
			hover:bg-slate-400 
			transition-colors
			text-sm
			sm:text-base
			px-4
			py-2 
			rounded-lg 
			`}
    >
      {text}
    </button>
  );
};

export default NewGameButton;
