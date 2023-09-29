const Header = () => {
  return (
    <div className="bg-slate-500 flex items-center justify-left gap-4 p-4 rounded-lg  shadow-lg">
      <div className="w-12 sm:w-16 ">
        <img src="/react.png" alt="react_icon" />
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-2 text-lg text-left sm:text-2xl md:text-3xl lg:text-3xl font-bold">
        <div className="">FRAMEWORKS</div>
        <div className="">MEMORY GAME</div>
      </div>
    </div>
  );
};

export default Header;
