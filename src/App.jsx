import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Game from "./components/Game";

function App() {
  return (
    <>
      <div className="font-montserrat bg-stone-700 flex flex-col grow shrink justify-between min-h-screen">
        <div className="max-w-[860px] px-2 sm:px-6 lg:px-8 mx-auto py-4 h-full flex flex-col grow ">
          <Header />

          <Game />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
