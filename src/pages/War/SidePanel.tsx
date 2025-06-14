import React from 'react';
import { GameState, Player } from './types';

interface SidePanelProps {
  gameState: GameState;
  currentPlayerRole: Player;
  onEndTurn: () => void;
  onEndPhase: () => void;
  onResetGame: () => void;
  onRefereeIntervention: () => void;
  onClearIntervention: () => void;
  onResetPlayerUnits?: (player: 'red' | 'blue') => void;
  onOpenCombatRules: () => void;
  isPlayerTurn: boolean;
}

export const SidePanel: React.FC<SidePanelProps> = ({ 
  gameState, 
  currentPlayerRole, 
  onEndTurn, 
  onEndPhase, 
  onResetGame,
  onRefereeIntervention,
  onClearIntervention,
  onResetPlayerUnits,
  onOpenCombatRules,
  isPlayerTurn
}) => {
  const canPlayerAct = () => {
    if (currentPlayerRole === 'referee') return true;
    return isPlayerTurn && !gameState.waitingForPlayer;
  };

  const getPlayerActions = () => {
    const actions = [];
    
    if (currentPlayerRole === 'referee') {
      actions.push(
        <div key="referee-status" className="bg-purple-900 border border-purple-400 text-purple-200 px-3 py-2 rounded text-sm">
          <div className="font-bold">⚖️ MODE ARBITRE ACTIF</div>
          <div className="text-xs">Supervision et contrôle total du jeu</div>
        </div>
      );

      // Actions de contrôle de l'arbitre
      actions.push(
        <div key="referee-controls" className="space-y-1">
          <button
            key="forceEndPhase"
            onClick={onEndPhase}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
          >
            🔄 Changer de Phase
          </button>
          <button
            key="forceEndTurn"
            onClick={onEndTurn}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
          >
            ⏭️ Forcer Fin de Tour
          </button>
          {onResetPlayerUnits && (
            <>
              <button
                key="resetRed"
                onClick={() => onResetPlayerUnits('red')}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                🔄 Réinitialiser Rouge
              </button>
              <button
                key="resetBlue"
                onClick={() => onResetPlayerUnits('blue')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                🔄 Réinitialiser Bleu
              </button>
            </>
          )}
        </div>
      );
      
      if (gameState.requiresReferee) {
        actions.push(
          <div key="referee-required" className="bg-orange-600 text-white px-3 py-2 rounded text-sm animate-pulse">
            <div className="font-bold">🎲 SUPERVISION REQUISE</div>
            <div className="text-xs">Combat en attente - Votre présence est requise</div>
          </div>
        );
      }
      
      // Actions administratives
      actions.push(
        <div key="admin-controls" className="space-y-1">
          <button
            key="reset"
            onClick={onResetGame}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            🔄 Nouvelle Partie
          </button>
          <button
            key="clearIntervention"
            onClick={onClearIntervention}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
          >
            🚪 Quitter Mode Arbitre
          </button>
        </div>
      );
    }
    
    // Actions pour les joueurs selon la phase
    if (canPlayerAct()) {
      // Phase de mouvement
      if (gameState.phase === 'movement') {
        actions.push(
          <div key="movement-info" className="bg-blue-900 text-blue-200 px-3 py-2 rounded text-sm">
            <div className="font-bold">📍 PHASE DE MOUVEMENT</div>
            <div className="text-xs">Sélectionnez et déplacez vos unités</div>
          </div>
        );
      }
      
      // Phase de combat
      if (gameState.phase === 'combat') {
        actions.push(
          <div key="combat-info" className="bg-red-900 text-red-200 px-3 py-2 rounded text-sm">
            <div className="font-bold">⚔️ PHASE DE COMBAT</div>
            <div className="text-xs">Attaquez les unités ennemies</div>
          </div>
        );
      }
      
      // Phase de fin
      if (gameState.phase === 'end') {
        actions.push(
          <div key="end-info" className="bg-green-900 text-green-200 px-3 py-2 rounded text-sm">
            <div className="font-bold">🏁 PHASE DE FIN</div>
            <div className="text-xs">Finalisez votre tour</div>
          </div>
        );
      }
      
      actions.push(
        <button
          key="endTurn"
          onClick={onEndTurn}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          Fin de Tour
        </button>
      );
      
      actions.push(
        <button
          key="endPhase"
          onClick={onEndPhase}
          className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm"
        >
          Fin de Phase
        </button>
      );
    }

    // Bouton d'intervention arbitre toujours disponible
    if (currentPlayerRole !== 'referee') {
      if (gameState.requiresReferee) {
        actions.push(
          <div key="waiting-referee" className="bg-orange-600 text-white px-3 py-2 rounded text-sm">
            <div className="font-bold">⏳ ARBITRE REQUIS</div>
            <div className="text-xs">Combat en attente de supervision</div>
          </div>
        );
      }
      
      actions.push(
        <button
          key="refereeIntervention"
          onClick={onRefereeIntervention}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
        >
          Appeler l'Arbitre
        </button>
      );
    }
    
    return actions;
  };

  return (
    <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm h-full overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 text-yellow-400">STRATEGOS</h2>
        <div className="text-xs">
          <div>Joueur: {currentPlayerRole === 'red' ? 'Rouge' : currentPlayerRole === 'blue' ? 'Bleu' : 'Arbitre'}</div>
          <div>Tour: {gameState.turn}</div>
          <div>Phase: {gameState.phase}</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-yellow-400">Actions</h3>
        <div className="space-y-2">
          {getPlayerActions()}
        </div>
        
        {/* Bouton pour ouvrir les règles de combat */}
        <div className="mt-3 pt-2 border-t border-gray-700">
          <button
            onClick={onOpenCombatRules}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-bold transition-colors"
          >
            📖 Tables de Résolution
          </button>
        </div>
        
        {gameState.refereeIntervention && currentPlayerRole === 'referee' && (
          <div className="mt-4 p-3 bg-green-900 border border-green-400 rounded">
            <div className="text-green-400 font-bold mb-2">MODE ARBITRE ACTIF</div>
            <div className="text-xs text-green-300 space-y-1">
              <div>• Supervision des combats</div>
              <div>• Résolution des conflits</div>
              <div>• Gestion des règles</div>
              <div>• Contrôle du flux de jeu</div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-yellow-400">Système Original (1880)</h3>
        <div className="text-xs space-y-1">
          <div className="text-cyan-400">COMBAT - TEETOTUM 12 FACES:</div>
          <div>• Arbitre requis pour dés</div>
          <div>• Table T - Résultats par excès</div>
          <div>• Table U - Ratio Rouge/Bleu</div>
          
          <div className="text-cyan-400 mt-2">VALEURS DE COMBAT:</div>
          <div>♔ Général: Force +2</div>
          <div>♜ Artillerie: Force +1</div>
          <div>♞ Cavalerie: Force +1</div>
          <div>♟ Infanterie: Force de base</div>
          <div>⚑ Drapeau: Très vulnérable</div>
          
          <div className="text-cyan-400 mt-2">TABLE T (EXCÈS → RÉSULTAT):</div>
          <div>8+: 3 pertes, 2 captures</div>
          <div>6-7: 2 pertes, 1 capture</div>
          <div>4-5: 2 pertes, 0 capture</div>
          <div>2-3: 1 perte, 0 capture</div>
          <div>0-1: Aucun effet</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-yellow-400">Phases de Jeu</h3>
        <div className="text-xs space-y-1">
          <div className="text-cyan-400">1. MOUVEMENT:</div>
          <div>- Déplacer les unités</div>
          <div>- Une unité par case</div>
          
          <div className="text-cyan-400 mt-2">2. COMBAT:</div>
          <div>- Attaquer les ennemis</div>
          <div>- Résolution par dés</div>
          
          <div className="text-cyan-400 mt-2">3. FIN:</div>
          <div>- Réinitialiser les actions</div>
          <div>- Changer de joueur</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-yellow-400">Rôles Historiques</h3>
        <div className="text-xs space-y-1">
          <div className="text-red-400">ARMÉE ROUGE:</div>
          <div>- Forces symétriques</div>
          <div>- Armes identiques au Bleu</div>
          
          <div className="text-blue-400 mt-2">ARMÉE BLEUE:</div>
          <div>- Forces symétriques</div>
          <div>- Armes identiques au Rouge</div>
          
          <div className="text-yellow-400 mt-2">ARBITRE (REFEREE):</div>
          <div>- Supervise les dés obligatoire</div>
          <div>- Gère informations cachées</div>
          <div>- Applique Table T et Table U</div>
          <div>- Formation officiers militaires</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-yellow-400">Table 1 - Pertes & Captures</h3>
        <div className="text-xs">
          <div className="text-red-400">
            Rouge: {gameState.redUnits.filter(u => u.strength > 0).length} unités
            <div>Pertes: {gameState.redLosses}</div>
            <div>Captures: {gameState.redCaptures}</div>
          </div>
          <div className="text-blue-400 mt-1">
            Bleu: {gameState.blueUnits.filter(u => u.strength > 0).length} unités
            <div>Pertes: {gameState.blueLosses}</div>
            <div>Captures: {gameState.blueCaptures}</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-yellow-400">Journal</h3>
        <div className="text-xs max-h-32 overflow-y-auto bg-black p-2 rounded">
          {gameState.gameLog.slice(-10).map((log, index) => (
            <div key={index} className="mb-1">{log}</div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <div className="text-yellow-400 mb-1">STRATEGOS (1880)</div>
        <div>Lt. Charles A. L. Totten</div>
        <div>West Point (1873)</div>
        <div>Jeu de guerre américain</div>
        <div className="mt-2 text-cyan-400">Objectif historique:</div>
        <div>Formation des officiers</div>
        <div>Prise de décision sous pression</div>
        <div>Informations limitées</div>
      </div>
    </div>
  );
}; 