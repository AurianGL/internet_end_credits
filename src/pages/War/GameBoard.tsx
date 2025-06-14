import React from 'react';
import { GameState, Unit, UNIT_SYMBOLS, TERRAIN_SYMBOLS } from './types';
import { canMoveUnit, canAttackUnit, isInAttackRange } from './gameLogic';

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (x: number, y: number) => void;
  currentPlayerRole: 'player1' | 'player2' | 'referee';
  isPlayerTurn: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onCellClick, currentPlayerRole, isPlayerTurn }) => {
  const getCellColor = (x: number, y: number) => {
    const cell = gameState.board[y][x];
    
    // Couleur de base selon le terrain
    let bgColor = 'bg-green-100';
    switch (cell.type) {
      case 'hill':
        bgColor = 'bg-yellow-200';
        break;
      case 'forest':
        bgColor = 'bg-green-300';
        break;
      case 'river':
        bgColor = 'bg-blue-200';
        break;
      case 'bridge':
        bgColor = 'bg-gray-300';
        break;
      case 'fortress':
        bgColor = 'bg-stone-400';
        break;
    }
    
    // Surbrillance pour l'unité sélectionnée
    if (gameState.selectedUnit && gameState.selectedUnit.x === x && gameState.selectedUnit.y === y) {
      bgColor = 'bg-yellow-400';
    }
    
    // Surbrillance pour les mouvements possibles (phase mouvement seulement)
    if (gameState.selectedUnit && gameState.phase === 'movement' && canMoveUnit(gameState.selectedUnit, x, y, gameState)) {
      bgColor = 'bg-green-400';
    }
    
    // PHASE COMBAT : Affichage de la portée d'attaque et des cibles
    if (gameState.selectedUnit && gameState.phase === 'combat') {
      // Afficher la portée d'attaque complète (zone de danger)
      if (isInAttackRange(gameState.selectedUnit, x, y)) {
        bgColor = 'bg-yellow-200'; // Zone de portée d'attaque (jaune clair)
      }
      
      // Surbrillance pour les attaques possibles (unités ennemies à portée)
      if (cell.unit && canAttackUnit(gameState.selectedUnit, cell.unit, gameState)) {
        bgColor = 'bg-red-400'; // Cible ennemie attaquable (rouge vif)
      }
      
      // Case vide en phase combat (grisant les cases inutiles)
      if (!cell.unit && !isInAttackRange(gameState.selectedUnit, x, y)) {
        bgColor = 'bg-gray-300'; // Cases hors portée et vides (gris)
      }
      
      // Unité ennemie hors portée en phase combat
      if (cell.unit && cell.unit.player !== gameState.selectedUnit.player && 
          !canAttackUnit(gameState.selectedUnit, cell.unit, gameState)) {
        bgColor = 'bg-orange-300'; // Ennemi hors portée (orange)
      }
    }
    
    // Surbrillance pour les actions impossibles (phase mouvement)
    if (gameState.selectedUnit && gameState.phase === 'movement') {
      // Case ennemie en phase mouvement (impossible)
      if (cell.unit && cell.unit.player !== gameState.selectedUnit.player) {
        bgColor = 'bg-orange-300';
      }
    }
    
    return bgColor;
  };
  
  const getCellContent = (x: number, y: number) => {
    const cell = gameState.board[y][x];
    
    if (cell.unit) {
      const symbol = UNIT_SYMBOLS[cell.unit.type];
      const color = cell.unit.player === 'red' ? 'text-red-600' : 'text-blue-600';
      return (
        <div className={`${color} font-bold text-lg relative`}>
          {symbol}
          <div className="absolute -top-1 -right-1 text-xs bg-white rounded-full w-4 h-4 flex items-center justify-center border">
            {cell.unit.strength}
          </div>
        </div>
      );
    }
    
    return (
      <span className="text-gray-600 text-sm">
        {TERRAIN_SYMBOLS[cell.type]}
      </span>
    );
  };
  
  const canPlayerAct = () => {
    if (currentPlayerRole === 'referee') return true;
    return isPlayerTurn && !gameState.waitingForPlayer;
  };
  
  return (
    <div className="bg-black font-mono w-fit">
      {/* En-tête du plateau - hauteur fixe */}
      <div className="mb-4 text-center border-b border-gray-600 pb-2 h-24 flex flex-col justify-center">
        <div className="text-yellow-400 text-lg font-bold mb-1">STRATEGOS - PLATEAU DE JEU</div>
        <div className="text-green-400 text-sm mb-2">
          <span>Tour {gameState.turn}</span>
          <span className="mx-2">•</span>
          <span>Armée actuelle: {gameState.currentPlayer === 'red' ? 'Rouge' : 'Bleue'}</span>
        </div>
        
        {/* Indicateur de phase visible */}
        <div className={`px-3 py-1 rounded text-sm font-bold ${
          gameState.phase === 'movement' ? 'bg-blue-600 text-white' :
          gameState.phase === 'combat' ? 'bg-red-600 text-white' :
          'bg-green-600 text-white'
        }`}>
          {gameState.phase === 'movement' && '📍 PHASE DE MOUVEMENT'}
          {gameState.phase === 'combat' && '⚔️ PHASE DE COMBAT'}
          {gameState.phase === 'end' && '🏁 PHASE DE FIN'}
        </div>
        
        {!canPlayerAct() && (
          <div className="text-yellow-400 text-sm mt-1">⏳ En attente de votre tour...</div>
        )}
        
        {/* Légende pour la phase de combat */}
        {gameState.selectedUnit && gameState.phase === 'combat' && (
          <div className="text-xs text-gray-300 mt-2 flex justify-center space-x-4">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-200 border mr-1"></span>
              <span>Portée</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-400 border mr-1"></span>
              <span>Cible</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-orange-300 border mr-1"></span>
              <span>Hors portée</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Plateau de jeu avec bordure */}
      <div className="border-2 border-green-400 rounded-lg p-2 bg-gray-900">
        {/* Coordonnées X */}
        <div className="flex mb-1">
          <div className="w-8"></div>
          {Array.from({ length: gameState.board[0].length }, (_, x) => (
            <div key={x} className="w-8 h-6 flex items-center justify-center text-green-400 text-xs font-bold">
              {x.toString(16).toUpperCase()}
            </div>
          ))}
        </div>
      
              {/* Plateau de jeu */}
        {gameState.board.map((row, y) => (
          <div key={y} className="flex">
            {/* Coordonnée Y */}
            <div className="w-8 h-8 flex items-center justify-center text-green-400 text-xs font-bold">
              {y.toString(16).toUpperCase()}
            </div>
          
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-8 h-8 border border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-700 ${getCellColor(x, y)}`}
              onClick={() => canPlayerAct() && onCellClick(x, y)}
              title={`${cell.type} (${x},${y})${cell.unit ? ` - ${cell.unit.type} ${cell.unit.player}` : ''}`}
            >
              {getCellContent(x, y)}
            </div>
          ))}
        </div>
      ))}
      
              </div>
        
        {/* Zone fixe pour l'unité sélectionnée - toujours présente pour éviter les mouvements */}
        <div className="mt-4 text-center h-20 flex items-center justify-center">
          {gameState.selectedUnit ? (
            <div className="bg-gray-800 border border-yellow-400 rounded p-2 inline-block">
              <div className="text-yellow-400 text-sm font-bold">UNITÉ SÉLECTIONNÉE</div>
              <div className="text-green-400 text-sm">
                {gameState.selectedUnit.type} {gameState.selectedUnit.player} 
                ({gameState.selectedUnit.strength}/{gameState.selectedUnit.maxStrength})
                {gameState.selectedUnit.moved && ' [Déplacée]'}
                {gameState.selectedUnit.attacked && ' [A attaqué]'}
              </div>
              {gameState.phase === 'combat' && (
                <div className="text-cyan-400 text-xs mt-1">
                  <span className="inline-block w-3 h-3 bg-yellow-200 border mr-1"></span>
                  Portée d'attaque : {(() => {
                    switch (gameState.selectedUnit.type) {
                      case 'infantry': return '1 case';
                      case 'cavalry': return '1 case';
                      case 'artillery': return '3 cases';
                      case 'general': return '1 case';
                      case 'flag': return '0 case';
                      default: return '1 case';
                    }
                  })()}
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-600 text-sm">Cliquez sur une unité pour la sélectionner</div>
          )}
        </div>
      </div>
    );
  }; 