import React from 'react';
import { GameState } from './types';

interface PlayerSwitcherProps {
  gameState: GameState;
  onPlayerReady: () => void;
  onRefereeIntervention: () => void;
}

export const PlayerSwitcher: React.FC<PlayerSwitcherProps> = ({ 
  gameState, 
  onPlayerReady, 
  onRefereeIntervention 
}) => {
  const currentPlayerName = gameState.currentPlayer === 'red' ? 'Rouge' : 'Bleu';
  const currentPlayerColor = gameState.currentPlayer === 'red' ? 'text-red-400' : 'text-blue-400';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 font-mono">
      <div className="bg-gray-900 border-2 border-green-400 p-8 text-center max-w-md">
        <h2 className="text-2xl text-yellow-400 mb-4">CHANGEMENT DE JOUEUR</h2>
        
        <div className="mb-6">
          <div className="text-green-400 mb-2">Tour {gameState.turn}</div>
          <div className="text-lg mb-4">
            C'est au tour de l'armée <span className={`font-bold ${currentPlayerColor}`}>{currentPlayerName}</span>
          </div>
          <div className="text-sm text-gray-400">
            Phase: {gameState.phase}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onPlayerReady}
            className={`w-full px-6 py-3 rounded font-bold ${
              gameState.currentPlayer === 'red' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            ARMÉE {currentPlayerName.toUpperCase()} PRÊTE
          </button>

          <button
            onClick={onRefereeIntervention}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded font-bold"
          >
            INTERVENTION ARBITRE
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <div>Assurez-vous que l'armée précédente</div>
          <div>ne regarde pas l'écran avant de continuer</div>
          <div className="mt-1 text-yellow-400">Informations limitées - Principe Strategos</div>
        </div>

        {gameState.gameLog.length > 0 && (
          <div className="mt-4 text-xs text-left">
            <div className="text-green-400 mb-2">Dernière action:</div>
            <div className="bg-black p-2 rounded text-gray-300">
              {gameState.gameLog[gameState.gameLog.length - 1]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 