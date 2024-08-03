import { GameBoard } from "./components/GameBoard";
import { GamingProvider } from "./contexts/GameContext";

export const GamePage = () => {
  return (
    <GamingProvider>
      <div className="bg-black h-screen w-screen flex flex-col">
        <h1 className="text-white text-center w-full p-2">Game</h1>
        <GameBoard />
      </div>
    </GamingProvider>
  );
};
