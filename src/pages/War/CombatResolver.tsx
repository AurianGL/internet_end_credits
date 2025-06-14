import React, { useState } from 'react';
import { Unit, TerrainCell, CombatResult, UNIT_SYMBOLS, GameState } from './types';
import { resolveCombatOriginal, getUnitCombatValue, rollTwelveSidedDie, getAdjacentAlliesBonus } from './gameLogic';

interface CombatResolverProps {
  attacker: Unit;
  defender: Unit;
  terrain: TerrainCell;
  onCombatResolved: (result: CombatResult) => void;
  onCancel: () => void;
  isRefereePresent: boolean;
  gameState: GameState;
}

export const CombatResolver: React.FC<CombatResolverProps> = ({
  attacker,
  defender,
  terrain,  
  onCombatResolved,
  onCancel,
  isRefereePresent,
  gameState
}) => {
  const [diceRolled, setDiceRolled] = useState(false);
  const [combatResult, setCombatResult] = useState<CombatResult | null>(null);
  const [showDiceAnimation, setShowDiceAnimation] = useState(false);

  const handleRollDice = () => {
    setShowDiceAnimation(true);
    
    // Animation des dés
    setTimeout(() => {
      const result = resolveCombatOriginal(attacker, defender, terrain, gameState, false);
      setCombatResult(result);
      setDiceRolled(true);
      setShowDiceAnimation(false);
    }, 2000);
  };

  const handleAutoResolve = () => {
    const result = resolveCombatOriginal(attacker, defender, terrain, gameState, false);
    setCombatResult(result);
    setDiceRolled(true);
  };

  const handleAcceptResult = () => {
    if (combatResult) {
      onCombatResolved(combatResult);
    }
  };

  const attackerBaseValue = attacker.strength;
  const defenderBaseValue = defender.strength;
  const attackerBonus = getUnitTypeBonus(attacker.type);
  const defenderBonus = getUnitTypeBonus(defender.type);
  const terrainBonus = terrain.defensiveBonus;
  
  // Calculer les bonus des unités adjacentes
  const attackerAdjacentBonus = getAdjacentAlliesBonus(attacker, defender, gameState);
  const defenderAdjacentBonus = getAdjacentAlliesBonus(defender, attacker, gameState);
  
  const attackerTotalValue = getUnitCombatValue(attacker, terrain, gameState, defender);
  const defenderTotalValue = getUnitCombatValue(defender, terrain, gameState, attacker);

  // Fonction pour obtenir le bonus de type d'unité
  function getUnitTypeBonus(unitType: string): number {
    switch (unitType) {
      case 'general': return 2;
      case 'artillery': return 1;
      case 'cavalry': return 1;
      case 'infantry': return 0;
      case 'flag': return 0;
      default: return 0;
    }
  }

  // Fonction pour obtenir la description du résultat selon Table T
  function getTableTDescription(excess: number): string {
    if (excess >= 8) return "Excès 8+ → 3 pertes, 2 captures";
    if (excess >= 6) return "Excès 6-7 → 2 pertes, 1 capture";
    if (excess >= 4) return "Excès 4-5 → 2 pertes, 0 capture";
    if (excess >= 2) return "Excès 2-3 → 1 perte, 0 capture";
    return "Excès 0-1 → Aucun effet";
  }

  // Calculer les totaux avec les dés si disponibles
  const redTotal = combatResult ? 
    (attacker.player === 'red' ? attackerTotalValue : defenderTotalValue) + 
    (attacker.player === 'red' ? combatResult.redRoll : combatResult.blueRoll) : 0;
  
  const blueTotal = combatResult ?
    (attacker.player === 'blue' ? attackerTotalValue : defenderTotalValue) + 
    (attacker.player === 'blue' ? combatResult.redRoll : combatResult.blueRoll) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 font-mono p-4">
      <div className="bg-gray-900 border-2 border-yellow-400 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl text-yellow-400 mb-6 text-center">
          ⚔️ RÉSOLUTION DE COMBAT - STRATEGOS 1880
        </h2>
        
        {/* Affichage détaillé des forces en présence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Attaquant */}
          <div className="bg-red-900 border border-red-400 p-4 rounded">
            <div className="text-red-300 text-center mb-3">
              <div className="text-xl font-bold">{UNIT_SYMBOLS[attacker.type as keyof typeof UNIT_SYMBOLS]} ATTAQUANT</div>
              <div className="text-lg">ARMÉE {attacker.player.toUpperCase()}</div>
            </div>
            
            <div className="text-sm space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-red-200">Type d'unité:</div>
                <div className="text-red-100 font-bold">{attacker.type.toUpperCase()}</div>
                
                <div className="text-red-200">Force actuelle:</div>
                <div className="text-red-100">{attacker.strength}/{attacker.maxStrength}</div>
                
                <div className="text-red-200">Position:</div>
                <div className="text-red-100">({attacker.x}, {attacker.y})</div>
              </div>
              
              <div className="border-t border-red-600 pt-2 mt-3">
                <div className="text-red-200 text-xs font-bold mb-1">CALCUL DE COMBAT:</div>
                <div className="text-red-100 text-xs space-y-1">
                  <div>Force de base: {attackerBaseValue}</div>
                  <div>Bonus de type: +{attackerBonus}</div>
                  <div>Alliés adjacents: +{attackerAdjacentBonus}</div>
                  <div className="border-t border-red-600 pt-1">
                    <div className="font-bold">Valeur totale: {attackerTotalValue}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Défenseur */}
          <div className="bg-blue-900 border border-blue-400 p-4 rounded">
            <div className="text-blue-300 text-center mb-3">
              <div className="text-xl font-bold">{UNIT_SYMBOLS[defender.type as keyof typeof UNIT_SYMBOLS]} DÉFENSEUR</div>
              <div className="text-lg">ARMÉE {defender.player.toUpperCase()}</div>
            </div>
            
            <div className="text-sm space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-blue-200">Type d'unité:</div>
                <div className="text-blue-100 font-bold">{defender.type.toUpperCase()}</div>
                
                <div className="text-blue-200">Force actuelle:</div>
                <div className="text-blue-100">{defender.strength}/{defender.maxStrength}</div>
                
                <div className="text-blue-200">Position:</div>
                <div className="text-blue-100">({defender.x}, {defender.y})</div>
              </div>
              
              <div className="border-t border-blue-600 pt-2 mt-3">
                <div className="text-blue-200 text-xs font-bold mb-1">CALCUL DE COMBAT:</div>
                <div className="text-blue-100 text-xs space-y-1">
                  <div>Force de base: {defenderBaseValue}</div>
                  <div>Bonus de type: +{defenderBonus}</div>
                  <div>Bonus terrain: +{terrainBonus} ({terrain.type})</div>
                  <div>Alliés adjacents: +{defenderAdjacentBonus}</div>
                  <div className="border-t border-blue-600 pt-1">
                    <div className="font-bold">Valeur totale: {defenderTotalValue}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations sur le terrain */}
        <div className="bg-gray-800 border border-gray-600 p-3 mb-6 rounded">
          <div className="text-gray-300 text-center">
            <div className="text-sm font-bold mb-1">TERRAIN DE COMBAT</div>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-gray-400">Type:</div>
                <div className="text-gray-200 font-bold">{terrain.type.toUpperCase()}</div>
              </div>
              <div>
                <div className="text-gray-400">Bonus défensif:</div>
                <div className="text-gray-200 font-bold">+{terrain.defensiveBonus}</div>
              </div>
              <div>
                <div className="text-gray-400">Coût de mouvement:</div>
                <div className="text-gray-200 font-bold">{terrain.movementCost}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statut de l'arbitre */}
        {!isRefereePresent && (
          <div className="bg-orange-900 border border-orange-400 p-4 mb-6 rounded">
            <div className="text-orange-200 text-center">
              <div className="font-bold text-lg">⚖️ ARBITRE REQUIS</div>
              <div className="text-sm mt-2">
                Selon les règles originales de Strategos (1880), le Lieutenant Charles A. L. Totten
                exigeait la présence d'un arbitre pour superviser tous les lancers de dés.
              </div>
              <div className="text-xs text-orange-300 mt-2">
                Les dés peuvent être lancés uniquement en présence de l'arbitre officiel.
              </div>
            </div>
          </div>
        )}

        {/* Animation des dés */}
        {showDiceAnimation && (
          <div className="bg-black border border-green-400 p-6 mb-6 rounded text-center">
            <div className="text-green-400 mb-4">
              <div className="text-lg font-bold">LANCER DU TEETOTUM À 12 FACES</div>
              <div className="text-sm">Système de dés original de Strategos...</div>
            </div>
            <div className="text-6xl animate-pulse mb-4">🎲 🎲</div>
            <div className="text-sm text-green-300">
              <div>Calcul en cours...</div>
              <div>Application de la Table T...</div>
            </div>
          </div>
        )}

        {/* Résultats du combat */}
        {combatResult && (
          <div className="bg-black border border-green-400 p-6 mb-6 rounded">
            <div className="text-green-400 text-center mb-4">
              <div className="text-xl font-bold">📊 RÉSULTATS DU COMBAT</div>
            </div>
            
            {/* Détails des dés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-800 border border-red-400 p-3 rounded">
                <div className="text-red-300 text-center">
                  <div className="text-lg font-bold">🎲 DÉ ROUGE</div>
                  <div className="text-3xl font-bold mt-2">{combatResult.redRoll}</div>
                  <div className="text-sm mt-1">+ {attacker.player === 'red' ? attackerTotalValue : defenderTotalValue} (valeur) = {redTotal}</div>
                </div>
              </div>
              
              <div className="bg-blue-800 border border-blue-400 p-3 rounded">
                <div className="text-blue-300 text-center">
                  <div className="text-lg font-bold">🎲 DÉ BLEU</div>
                  <div className="text-3xl font-bold mt-2">{combatResult.blueRoll}</div>
                  <div className="text-sm mt-1">+ {attacker.player === 'blue' ? attackerTotalValue : defenderTotalValue} (valeur) = {blueTotal}</div>
                </div>
              </div>
            </div>

            {/* Calculs et résultats */}
            <div className="bg-gray-800 border border-gray-600 p-4 rounded mb-4">
              <div className="text-gray-300 space-y-2">
                <div className="text-center mb-3">
                  <div className="font-bold text-lg">CALCULS SELON TABLE T</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Total Rouge:</div>
                    <div className="text-red-300 font-bold">{combatResult.redRoll} + {attacker.player === 'red' ? attackerTotalValue : defenderTotalValue} = {redTotal}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Total Bleu:</div>
                    <div className="text-blue-300 font-bold">{combatResult.blueRoll} + {attacker.player === 'blue' ? attackerTotalValue : defenderTotalValue} = {blueTotal}</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-600 pt-2 mt-3">
                  <div className="text-center">
                    <div className="text-gray-400">Excès (différence):</div>
                    <div className="text-yellow-300 font-bold text-lg">{combatResult.excess}</div>
                    <div className="text-xs text-gray-400 mt-1">{getTableTDescription(combatResult.excess)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultat final */}
            <div className="bg-gray-700 border border-gray-500 p-4 rounded">
              <div className="text-center space-y-2">
                <div className="text-lg font-bold">
                  <span className={combatResult.winner === 'red' ? 'text-red-400' : 
                                 combatResult.winner === 'blue' ? 'text-blue-400' : 'text-gray-400'}>
                    {combatResult.winner === 'draw' ? '⚖️ ÉGALITÉ' : 
                     `🏆 VICTOIRE ${combatResult.winner.toUpperCase()}`}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Pertes infligées:</div>
                    <div className="text-red-300 font-bold">{combatResult.casualties}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Captures:</div>
                    <div className="text-yellow-300 font-bold">{combatResult.captures}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Boutons d'action */}
        {!diceRolled && !showDiceAnimation && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-green-400 text-sm mb-4">
                <div className="font-bold">Système de dés à 12 faces (Teetotum historique)</div>
                <div>Application de la Table T pour la résolution des combats</div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleRollDice}
                  className="w-full px-6 py-4 rounded font-bold text-lg bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
                >
                  {isRefereePresent ? '🎲 LANCER LES DÉS (ARBITRE PRÉSENT)' : '🎲 LANCER LES DÉS'}
                </button>
                
                {!isRefereePresent && (
                  <button
                    onClick={handleAutoResolve}
                    className="w-full px-6 py-3 rounded font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    ⚡ RÉSOLUTION AUTOMATIQUE (SANS ARBITRE)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {combatResult && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleAcceptResult}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-bold transition-colors"
            >
              ✅ ACCEPTER RÉSULTAT
            </button>
            <button
              onClick={onCancel}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition-colors"
            >
              ❌ ANNULER COMBAT
            </button>
          </div>
        )}

        {!diceRolled && !showDiceAnimation && (
          <div className="flex justify-center mt-4">
            <button
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
            >
              ↩️ ANNULER COMBAT
            </button>
          </div>
        )}

        {/* Informations historiques */}
        <div className="mt-6 pt-4 border-t border-gray-600 text-center text-xs text-gray-400">
          <div className="font-bold text-yellow-400 mb-1">STRATEGOS - SYSTÈME AUTHENTIQUE 1880</div>
          <div>Lieutenant Charles Adelle Lewis Totten - West Point (1873)</div>
          <div>Jeu de guerre militaire américain pour la formation des officiers</div>
          <div className="mt-2 text-gray-500">
            Table T: Résultats de combat • Table U: Ratio Rouge/Bleu • Teetotum 12 faces
          </div>
        </div>
      </div>
    </div>
  );
}; 