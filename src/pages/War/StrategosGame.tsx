import React, { useState, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { SidePanel } from './SidePanel';
import { PlayerSwitcher } from './PlayerSwitcher';
import { CombatResolver } from './CombatResolver';
import { CombatRulesModal } from './CombatRulesModal';
import { GameState, Unit, Player, CombatResult } from './types';
import { 
  createInitialGameState, 
  canMoveUnit, 
  canAttackUnit, 
  resolveCombat,
  resolveCombatOriginal 
} from './gameLogic';

interface StrategosGameProps {
  initialPlayerRole: Player;
}

export const StrategosGame: React.FC<StrategosGameProps> = ({ initialPlayerRole }) => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [currentPlayerRole, setCurrentPlayerRole] = useState<Player>(initialPlayerRole as Player);
  const [pendingCombat, setPendingCombat] = useState<{
    attacker: Unit;
    defender: Unit;
    terrain: any;
  } | null>(null);
  const [showCombatRules, setShowCombatRules] = useState(false);
  
  const isPlayerTurn = () => {
    // L'arbitre peut toujours agir
    if (currentPlayerRole === 'referee') return true;
    
    // Pour les autres cas, vérifier que c'est un joueur normal (pas arbitre)
    const isRegularPlayer = currentPlayerRole === 'red' || currentPlayerRole === 'blue';
    
    // Si une intervention d'arbitre est active, seuls les arbitres peuvent agir
    if (gameState.refereeIntervention) {
      return false; // Seul l'arbitre peut agir (déjà géré ci-dessus)
    }
    
    // Si on attend un changement de joueur, seuls les arbitres peuvent agir
    if (gameState.waitingForPlayer) {
      return false; // Seul l'arbitre peut agir (déjà géré ci-dessus)
    }
    
    // Vérifier si c'est le tour du joueur actuel (red ou blue seulement)
    return isRegularPlayer && currentPlayerRole === gameState.currentPlayer;
  };

  const updateUnit = useCallback((unitId: string, updates: Partial<Unit>) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Mettre à jour dans les listes d'unités
      newState.redUnits = prev.redUnits.map(unit => 
        unit.id === unitId ? { ...unit, ...updates } : unit
      );
      newState.blueUnits = prev.blueUnits.map(unit => 
        unit.id === unitId ? { ...unit, ...updates } : unit
      );
      
      // Mettre à jour sur le plateau
      newState.board = prev.board.map(row =>
        row.map(cell => {
          if (cell.unit?.id === unitId) {
            return { ...cell, unit: { ...cell.unit, ...updates } };
          }
          return cell;
        })
      );
      
      return newState;
    });
  }, []);

  const moveUnit = useCallback((unit: Unit, targetX: number, targetY: number) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Retirer l'unité de sa position actuelle
      newState.board = prev.board.map(row =>
        row.map(cell => {
          if (cell.unit?.id === unit.id) {
            return { ...cell, unit: undefined };
          }
          return cell;
        })
      );
      
      // Placer l'unité à sa nouvelle position
      const updatedUnit = { ...unit, x: targetX, y: targetY, moved: true };
      newState.board[targetY][targetX] = {
        ...newState.board[targetY][targetX],
        unit: updatedUnit
      };
      
      // Mettre à jour les listes d'unités
      if (unit.player === 'red') {
        newState.redUnits = prev.redUnits.map(u => 
          u.id === unit.id ? updatedUnit : u
        );
      } else {
        newState.blueUnits = prev.blueUnits.map(u => 
          u.id === unit.id ? updatedUnit : u
        );
      }
      
      newState.gameLog = [...prev.gameLog, 
        `${unit.type} ${unit.player} se déplace vers (${targetX},${targetY})`
      ];
      
      return newState;
    });
  }, []);

  const handleCellClick = useCallback((x: number, y: number) => {
    // Ne pas permettre d'actions si ce n'est pas le tour du joueur
    if (!isPlayerTurn()) return;
    
    const cell = gameState.board[y][x];
    
    if (gameState.selectedUnit) {
      // PHASE DE COMBAT : Seules les attaques sont autorisées
      if (gameState.phase === 'combat') {
        // Si on clique sur une unité ennemie et qu'on peut l'attaquer
        if (cell.unit && cell.unit.player !== gameState.selectedUnit.player && 
            canAttackUnit(gameState.selectedUnit, cell.unit, gameState)) {
          
          // Initier le combat - requis supervision d'arbitre selon les règles originales
          setPendingCombat({
            attacker: gameState.selectedUnit,
            defender: cell.unit,
            terrain: cell
          });
          
          setGameState(prev => ({ 
            ...prev, 
            selectedUnit: undefined,
            requiresReferee: true,
            gameLog: [...prev.gameLog, 
              `Combat initié: ${gameState.selectedUnit!.type} ${gameState.selectedUnit!.player} vs ${cell.unit!.type} ${cell.unit!.player}`
            ]
          }));
          return;
        } else if (!cell.unit) {
          // En phase de combat, on ne peut pas se déplacer vers une case vide
          setGameState(prev => ({ 
            ...prev, 
            selectedUnit: undefined,
            gameLog: [...prev.gameLog, 'Action impossible : Phase de combat - seules les attaques sont autorisées']
          }));
          return;
        } else if (cell.unit.player === gameState.selectedUnit.player) {
          // On ne peut pas attaquer ses propres unités
          setGameState(prev => ({ 
            ...prev, 
            selectedUnit: undefined,
            gameLog: [...prev.gameLog, 'Action impossible : Vous ne pouvez pas attaquer vos propres unités']
          }));
          return;
        } else {
          // Unité ennemie mais hors de portée d'attaque
          setGameState(prev => ({ 
            ...prev, 
            selectedUnit: undefined,
            gameLog: [...prev.gameLog, 'Attaque impossible : Unité ennemie hors de portée']
          }));
          return;
        }
      }
      
      // PHASE DE MOUVEMENT : Seuls les déplacements sont autorisés
      if (gameState.phase === 'movement') {
        // Vérifier si c'est une tentative de mouvement vers une case ennemie
        if (cell.unit && cell.unit.player !== gameState.selectedUnit.player) {
          setGameState(prev => ({ 
            ...prev, 
            selectedUnit: undefined,
            gameLog: [...prev.gameLog, 
              'Action impossible : Phase de mouvement - vous ne pouvez pas vous déplacer sur une case ennemie',
              'Conseil : Passez en phase de combat pour attaquer cette unité'
            ]
          }));
          return;
        }
        
        // Vérifier si c'est une tentative de mouvement vers une case occupée par une unité alliée
        if (cell.unit && cell.unit.player === gameState.selectedUnit.player) {
          setGameState(prev => ({ 
            ...prev, 
            selectedUnit: undefined,
            gameLog: [...prev.gameLog, 'Action impossible : Case déjà occupée par une unité alliée']
          }));
          return;
        }
        
        // Si on peut déplacer l'unité vers cette case vide
        if (canMoveUnit(gameState.selectedUnit, x, y, gameState)) {
          moveUnit(gameState.selectedUnit, x, y);
          setGameState(prev => ({ ...prev, selectedUnit: undefined }));
          return;
        } else {
          // Mouvement impossible pour d'autres raisons (distance, terrain, etc.)
          setGameState(prev => ({ 
            ...prev, 
            selectedUnit: undefined,
            gameLog: [...prev.gameLog, 'Mouvement impossible : Vérifiez la distance et les restrictions d\'unité']
          }));
          return;
        }
      }
      
      // PHASE DE FIN : Aucune action autorisée
      if (gameState.phase === 'end') {
        setGameState(prev => ({ 
          ...prev, 
          selectedUnit: undefined,
          gameLog: [...prev.gameLog, 'Action impossible : Phase de fin - utilisez "Fin de Tour"']
        }));
        return;
      }
      
      // Désélectionner si on clique ailleurs
      setGameState(prev => ({ ...prev, selectedUnit: undefined }));
    }
    
    // Sélectionner une unité du joueur actuel (ou n'importe quelle unité si arbitre)
    if (cell.unit) {
      if (currentPlayerRole === 'referee' || cell.unit.player === gameState.currentPlayer) {
        setGameState(prev => ({ ...prev, selectedUnit: cell.unit }));
      }
    }
  }, [gameState, moveUnit, isPlayerTurn, currentPlayerRole]);

  const handleEndTurn = useCallback(() => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Réinitialiser les actions des unités du joueur actuel
      const resetUnits = (units: Unit[]) => 
        units.map(unit => ({ ...unit, moved: false, attacked: false }));
      
      if (prev.currentPlayer === 'red') {
        newState.redUnits = resetUnits(prev.redUnits);
      } else {
        newState.blueUnits = resetUnits(prev.blueUnits);
      }
      
      // Changer de joueur
      const nextPlayer = prev.currentPlayer === 'red' ? 'blue' : 'red';
      newState.currentPlayer = nextPlayer;
      
      // Incrémenter le tour si on revient au joueur rouge
      if (nextPlayer === 'red') {
        newState.turn += 1;
      }
      
      newState.selectedUnit = undefined;
      newState.waitingForPlayer = true; // Déclencher le changement de joueur
      newState.refereeIntervention = false;
      newState.gameLog = [...prev.gameLog, 
        `Fin du tour ${prev.currentPlayer} - Au tour de l'armée ${nextPlayer}`
      ];
      
      // Mettre à jour le plateau avec les unités réinitialisées
      newState.board = prev.board.map(row =>
        row.map(cell => {
          if (cell.unit) {
            const updatedUnit = [...newState.redUnits, ...newState.blueUnits]
              .find(unit => unit.id === cell.unit!.id);
            return { ...cell, unit: updatedUnit };
          }
          return cell;
        })
      );
      
      return newState;
    });
  }, []);

  const handleEndPhase = useCallback(() => {
    setGameState(prev => {
      const phases: Array<'movement' | 'combat' | 'end'> = ['movement', 'combat', 'end'];
      const currentIndex = phases.indexOf(prev.phase);
      const nextPhase = phases[(currentIndex + 1) % phases.length];
      
      // Fonction utilitaire pour réinitialiser les unités ET synchroniser le plateau
      const resetUnitsAndBoard = (state: typeof prev, shouldResetActions: boolean = false) => {
        const newState = { ...state };
        
        // Réinitialiser les actions des unités si nécessaire
        const resetUnits = (units: Unit[]) => 
          shouldResetActions 
            ? units.map(unit => ({ ...unit, moved: false, attacked: false }))
            : units;
        
        newState.redUnits = resetUnits(prev.redUnits);
        newState.blueUnits = resetUnits(prev.blueUnits);
        
        // TOUJOURS synchroniser le plateau avec les listes d'unités mises à jour
        newState.board = prev.board.map(row =>
          row.map(cell => {
            if (cell.unit) {
              const updatedUnit = [...newState.redUnits, ...newState.blueUnits]
                .find(unit => unit.id === cell.unit!.id);
              return { ...cell, unit: updatedUnit };
            }
            return cell;
          })
        );
        
        return newState;
      };
      
      // Si on arrive à la fin du cycle des phases, on passe au joueur suivant
      if (nextPhase === 'movement') {
        const nextPlayer = prev.currentPlayer === 'red' ? 'blue' : 'red';
        
        // Réinitialiser les actions des unités du joueur actuel à la fin de son tour
        const newState = resetUnitsAndBoard(prev, true);
        
        // Incrémenter le tour si on revient au joueur rouge
        if (nextPlayer === 'red') {
          newState.turn += 1;
        }
        
        return {
          ...newState,
          currentPlayer: nextPlayer,
          phase: nextPhase,
          selectedUnit: undefined,
          waitingForPlayer: true, // Déclencher le changement de joueur
          gameLog: [...prev.gameLog, 
            `Cycle de phases terminé - Au tour de l'armée ${nextPlayer}`,
            `Réinitialisation des actions pour ${prev.currentPlayer}`,
            `Changement de phase: ${nextPhase}`
          ]
        };
      }
      
      // Simple changement de phase (sans changement de joueur)
      const newState = resetUnitsAndBoard(prev, false);
      
      return {
        ...newState,
        phase: nextPhase,
        selectedUnit: undefined,
        gameLog: [...prev.gameLog, `Changement de phase: ${nextPhase}`]
      };
    });
  }, []);

  const handleResetGame = useCallback(() => {
    setGameState(createInitialGameState());
    setPendingCombat(null);
  }, []);

  const handlePlayerReady = useCallback(() => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Réinitialiser les actions du nouveau joueur au début de son tour
      const resetUnits = (units: Unit[]) => 
        units.map(unit => ({ ...unit, moved: false, attacked: false }));
      
      if (prev.currentPlayer === 'red') {
        newState.redUnits = resetUnits(prev.redUnits);
      } else {
        newState.blueUnits = resetUnits(prev.blueUnits);
      }
      
      // Synchroniser le plateau
      newState.board = prev.board.map(row =>
        row.map(cell => {
          if (cell.unit) {
            const updatedUnit = [...newState.redUnits, ...newState.blueUnits]
              .find(unit => unit.id === cell.unit!.id);
            return { ...cell, unit: updatedUnit };
          }
          return cell;
        })
      );
      
      return {
        ...newState,
        waitingForPlayer: false,
        refereeIntervention: false,
        gameLog: [...prev.gameLog, `${prev.currentPlayer} prêt - Actions réinitialisées`]
      };
    });
    
    // Le joueur actuel prend le contrôle
    setCurrentPlayerRole(gameState.currentPlayer);
  }, [gameState.currentPlayer]);

  const handleRefereeIntervention = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      refereeIntervention: true,
      waitingForPlayer: false,
      gameLog: [...prev.gameLog, 'Intervention de l\'arbitre demandée']
    }));
    
    // Changer le rôle en arbitre
    setCurrentPlayerRole('referee');
  }, []);

  const handleCombatResolved = useCallback((result: CombatResult) => {
    if (!pendingCombat) return;

    const { attacker, defender } = pendingCombat;
    
    setGameState(prev => {
      const newState = { ...prev };
      
      // Appliquer les résultats du combat
      let attackerLoss = 0;
      let defenderLoss = 0;
      
      if (result.winner === attacker.player) {
        defenderLoss = Math.min(result.casualties, defender.strength);
        if (attacker.player === 'red') {
          newState.redCaptures += result.captures;
          newState.blueLosses += defenderLoss;
        } else {
          newState.blueCaptures += result.captures;
          newState.redLosses += defenderLoss;
        }
      } else if (result.winner !== 'draw') {
        attackerLoss = Math.min(result.casualties, attacker.strength);
        if (defender.player === 'red') {
          newState.redCaptures += result.captures;
          newState.blueLosses += attackerLoss;
        } else {
          newState.blueCaptures += result.captures;
          newState.redLosses += attackerLoss;
        }
      }
      
      // Mettre à jour les unités
      const newAttackerStrength = Math.max(0, attacker.strength - attackerLoss);
      const newDefenderStrength = Math.max(0, defender.strength - defenderLoss);
      
      // Mettre à jour le plateau
      newState.board = prev.board.map(row =>
        row.map(cell => {
          if (cell.unit?.id === attacker.id) {
            return { 
              ...cell, 
              unit: newAttackerStrength > 0 ? { ...attacker, strength: newAttackerStrength, attacked: true } : undefined 
            };
          }
          if (cell.unit?.id === defender.id) {
            return { 
              ...cell, 
              unit: newDefenderStrength > 0 ? { ...defender, strength: newDefenderStrength } : undefined 
            };
          }
          return cell;
        })
      );
      
      // Mettre à jour les listes d'unités
      newState.redUnits = prev.redUnits.map(unit => {
        if (unit.id === attacker.id) return { ...unit, strength: newAttackerStrength, attacked: true };
        if (unit.id === defender.id) return { ...unit, strength: newDefenderStrength };
        return unit;
      }).filter(unit => unit.strength > 0);
      
      newState.blueUnits = prev.blueUnits.map(unit => {
        if (unit.id === attacker.id) return { ...unit, strength: newAttackerStrength, attacked: true };
        if (unit.id === defender.id) return { ...unit, strength: newDefenderStrength };
        return unit;
      }).filter(unit => unit.strength > 0);
      
      newState.combatResults = [...prev.combatResults, result];
      newState.requiresReferee = false;
      newState.gameLog = [...prev.gameLog, 
        `Combat résolu: ${result.winner === 'draw' ? 'Égalité' : `Victoire ${result.winner}`}`,
        `Dés: Rouge ${result.redRoll}, Bleu ${result.blueRoll} (Excès: ${result.excess})`,
        `Pertes: ${result.casualties}, Captures: ${result.captures}`
      ];
      
      return newState;
    });
    
    setPendingCombat(null);
  }, [pendingCombat]);

  const handleCombatCancelled = useCallback(() => {
    setPendingCombat(null);
    setGameState(prev => ({
      ...prev,
      requiresReferee: false,
      gameLog: [...prev.gameLog, 'Combat annulé']
    }));
  }, []);

  const handleClearIntervention = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      refereeIntervention: false,
      gameLog: [...prev.gameLog, 'Intervention de l\'arbitre terminée']
    }));
    
    // Revenir au rôle du joueur actuel
    setCurrentPlayerRole(gameState.currentPlayer);
  }, [gameState.currentPlayer]);

  const handleOpenCombatRules = useCallback(() => {
    setShowCombatRules(true);
  }, []);

  // Fonction utilitaire pour réinitialiser les unités d'un joueur
  const resetPlayerUnits = useCallback((player: 'red' | 'blue') => {
    setGameState(prev => {
      const newState = { ...prev };
      
      const resetUnits = (units: Unit[]) => 
        units.map(unit => ({ ...unit, moved: false, attacked: false }));
      
      if (player === 'red') {
        newState.redUnits = resetUnits(prev.redUnits);
      } else {
        newState.blueUnits = resetUnits(prev.blueUnits);
      }
      
      // Synchroniser le plateau
      newState.board = prev.board.map(row =>
        row.map(cell => {
          if (cell.unit) {
            const updatedUnit = [...newState.redUnits, ...newState.blueUnits]
              .find(unit => unit.id === cell.unit!.id);
            return { ...cell, unit: updatedUnit };
          }
          return cell;
        })
      );
      
      newState.gameLog = [...prev.gameLog, `Actions réinitialisées pour l'armée ${player}`];
      
      return newState;
    });
  }, []);

  return (
    <div className="h-screen bg-black flex">
      {gameState.waitingForPlayer && (
        <PlayerSwitcher
          gameState={gameState}
          onPlayerReady={handlePlayerReady}
          onRefereeIntervention={handleRefereeIntervention}
        />
      )}
      
      {pendingCombat && (
        <CombatResolver
          attacker={pendingCombat.attacker}
          defender={pendingCombat.defender}
          terrain={pendingCombat.terrain}
          onCombatResolved={handleCombatResolved}
          onCancel={handleCombatCancelled}
          isRefereePresent={currentPlayerRole === 'referee' || gameState.refereeIntervention}
          gameState={gameState}
        />
      )}
      
      <CombatRulesModal
        isOpen={showCombatRules}
        onClose={() => setShowCombatRules(false)}
      />
      
      {/* Panneau latéral gauche */}
      <div className="w-80 border-r border-gray-600 flex-shrink-0">
        <SidePanel 
          gameState={gameState}
          currentPlayerRole={currentPlayerRole}
          onEndTurn={handleEndTurn}
          onEndPhase={handleEndPhase}
          onResetGame={handleResetGame}
          onRefereeIntervention={handleRefereeIntervention}
          onClearIntervention={handleClearIntervention}
          onResetPlayerUnits={resetPlayerUnits}
          onOpenCombatRules={handleOpenCombatRules}
          isPlayerTurn={isPlayerTurn()}
        />
      </div>
      
      {/* Zone centrale pour le plateau */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4 min-h-0">
        <div className="max-w-fit flex flex-col items-center">
          <GameBoard 
            gameState={gameState}
            onCellClick={handleCellClick}
            currentPlayerRole={currentPlayerRole as "referee" | "player1" | "player2"}
            isPlayerTurn={isPlayerTurn()}
          />
        </div>
      </div>
    </div>
  );
}; 