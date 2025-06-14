import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StrategosGame } from "./War/StrategosGame";
import { Player } from "./War/types";

export const War = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  if (!selectedPlayer) {
    return (
      <div className="bg-black text-green-400 h-screen flex items-center justify-center font-mono">
        <div className="text-center p-8 border border-green-400">
          <h1 className="text-2xl mb-6 text-yellow-400">STRATEGOS</h1>
          <p className="mb-6">Choisissez votre rôle dans la simulation de guerre</p>
          
          <div className="space-y-4">
            <button
              onClick={() => setSelectedPlayer('red')}
              className="block w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded"
            >
              ARMÉE ROUGE
            </button>
            
            <button
              onClick={() => setSelectedPlayer('blue')}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
            >
              ARMÉE BLEUE
            </button>
            
            <button
              onClick={() => setSelectedPlayer('referee')}
              className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded"
            >
              ARBITRE (REFEREE)
            </button>
          </div>
          
          <div className="mt-8 text-xs text-gray-400">
            <p className="text-yellow-400">Strategos - Jeu de Guerre Américain</p>
            <p>Lieutenant Charles A. L. Totten (1880)</p>
            <p>Académie Militaire de West Point</p>
            <p className="mt-2">Système de dés à 12 faces (Teetotum)</p>
            <p>Formation des officiers militaires</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <StrategosGame initialPlayerRole={selectedPlayer} />
    </div>
  );
};

export default War;