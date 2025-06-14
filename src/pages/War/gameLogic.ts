import { GameState, Unit, TerrainCell, UnitType, TerrainType, CombatResult } from './types';

export const BOARD_WIDTH = 20;
export const BOARD_HEIGHT = 15;

export const createInitialTerrain = (): TerrainCell[][] => {
  const terrain: TerrainCell[][] = [];
  
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    terrain[y] = [];
    for (let x = 0; x < BOARD_WIDTH; x++) {
      let type: TerrainType = 'plain';
      let defensiveBonus = 0;
      let movementCost = 1;
      
      // Rivière au milieu
      if (y === Math.floor(BOARD_HEIGHT / 2)) {
        type = 'river';
        movementCost = 3;
      }
      
      // Ponts sur la rivière
      if (y === Math.floor(BOARD_HEIGHT / 2) && (x === 5 || x === 10 || x === 15)) {
        type = 'bridge';
        movementCost = 1;
      }
      
      // Collines
      if ((x === 3 && y === 3) || (x === 16 && y === 11) || (x === 8 && y === 8)) {
        type = 'hill';
        defensiveBonus = 2;
        movementCost = 2;
      }
      
      // Forêts
      if ((x >= 1 && x <= 3 && y >= 10 && y <= 12) || 
          (x >= 16 && x <= 18 && y >= 2 && y <= 4)) {
        type = 'forest';
        defensiveBonus = 1;
        movementCost = 2;
      }
      
      // Forteresses
      if ((x === 0 && y === 0) || (x === BOARD_WIDTH - 1 && y === BOARD_HEIGHT - 1)) {
        type = 'fortress';
        defensiveBonus = 3;
        movementCost = 1;
      }
      
      terrain[y][x] = {
        type,
        x,
        y,
        defensiveBonus,
        movementCost
      };
    }
  }
  
  return terrain;
};

export const createInitialUnits = (): { red: Unit[], blue: Unit[] } => {
  const redUnits: Unit[] = [
    // Ligne arrière rouge (y = 0)
    { id: 'r1', type: 'flag', player: 'red', strength: 1, maxStrength: 1, x: 1, y: 0, moved: false, attacked: false },
    { id: 'r2', type: 'general', player: 'red', strength: 5, maxStrength: 5, x: 2, y: 0, moved: false, attacked: false },
    { id: 'r3', type: 'artillery', player: 'red', strength: 4, maxStrength: 4, x: 3, y: 0, moved: false, attacked: false },
    { id: 'r4', type: 'artillery', player: 'red', strength: 4, maxStrength: 4, x: 4, y: 0, moved: false, attacked: false },
    
    // Ligne avant rouge (y = 1)
    { id: 'r5', type: 'cavalry', player: 'red', strength: 3, maxStrength: 3, x: 0, y: 1, moved: false, attacked: false },
    { id: 'r6', type: 'infantry', player: 'red', strength: 2, maxStrength: 2, x: 1, y: 1, moved: false, attacked: false },
    { id: 'r7', type: 'infantry', player: 'red', strength: 2, maxStrength: 2, x: 2, y: 1, moved: false, attacked: false },
    { id: 'r8', type: 'infantry', player: 'red', strength: 2, maxStrength: 2, x: 3, y: 1, moved: false, attacked: false },
    { id: 'r9', type: 'cavalry', player: 'red', strength: 3, maxStrength: 3, x: 4, y: 1, moved: false, attacked: false },
  ];
  
  const blueUnits: Unit[] = [
    // Ligne arrière bleue (y = BOARD_HEIGHT - 1)
    { id: 'b1', type: 'flag', player: 'blue', strength: 1, maxStrength: 1, x: BOARD_WIDTH - 2, y: BOARD_HEIGHT - 1, moved: false, attacked: false },
    { id: 'b2', type: 'general', player: 'blue', strength: 5, maxStrength: 5, x: BOARD_WIDTH - 3, y: BOARD_HEIGHT - 1, moved: false, attacked: false },
    { id: 'b3', type: 'artillery', player: 'blue', strength: 4, maxStrength: 4, x: BOARD_WIDTH - 4, y: BOARD_HEIGHT - 1, moved: false, attacked: false },
    { id: 'b4', type: 'artillery', player: 'blue', strength: 4, maxStrength: 4, x: BOARD_WIDTH - 5, y: BOARD_HEIGHT - 1, moved: false, attacked: false },
    
    // Ligne avant bleue (y = BOARD_HEIGHT - 2)
    { id: 'b5', type: 'cavalry', player: 'blue', strength: 3, maxStrength: 3, x: BOARD_WIDTH - 1, y: BOARD_HEIGHT - 2, moved: false, attacked: false },
    { id: 'b6', type: 'infantry', player: 'blue', strength: 2, maxStrength: 2, x: BOARD_WIDTH - 2, y: BOARD_HEIGHT - 2, moved: false, attacked: false },
    { id: 'b7', type: 'infantry', player: 'blue', strength: 2, maxStrength: 2, x: BOARD_WIDTH - 3, y: BOARD_HEIGHT - 2, moved: false, attacked: false },
    { id: 'b8', type: 'infantry', player: 'blue', strength: 2, maxStrength: 2, x: BOARD_WIDTH - 4, y: BOARD_HEIGHT - 2, moved: false, attacked: false },
    { id: 'b9', type: 'cavalry', player: 'blue', strength: 3, maxStrength: 3, x: BOARD_WIDTH - 5, y: BOARD_HEIGHT - 2, moved: false, attacked: false },
  ];
  
  return { red: redUnits, blue: blueUnits };
};

export const createInitialGameState = (): GameState => {
  const terrain = createInitialTerrain();
  const { red, blue } = createInitialUnits();
  const allUnits = [...red, ...blue];
  
  // Placer les unités sur le plateau
  const board = terrain.map(row => 
    row.map(cell => ({
      ...cell,
      unit: allUnits.find(unit => unit.x === cell.x && unit.y === cell.y)
    }))
  );
  
  return {
    board,
    currentPlayer: 'red',
    phase: 'movement',
    turn: 1,
    gameLog: ['Début de la partie - Tour du joueur Rouge'],
    redUnits: red,
    blueUnits: blue,
    waitingForPlayer: false,
    refereeIntervention: false,
    combatResults: [],
    redLosses: 0,
    blueLosses: 0,
    redCaptures: 0,
    blueCaptures: 0,
    requiresReferee: false
  };
};

export const canMoveUnit = (unit: Unit, targetX: number, targetY: number, gameState: GameState): boolean => {
  if (unit.moved) return false;
  if (targetX < 0 || targetX >= BOARD_WIDTH || targetY < 0 || targetY >= BOARD_HEIGHT) return false;
  
  const targetCell = gameState.board[targetY][targetX];
  
  // Ne peut pas se déplacer sur une case occupée par n'importe quelle unité
  if (targetCell.unit) return false;
  
  const distance = Math.abs(targetX - unit.x) + Math.abs(targetY - unit.y);
  const maxMove = getUnitMovement(unit.type);
  
  return distance <= maxMove;
};

// Nouvelle fonction pour vérifier si une case est libre pour le mouvement
export const canMoveToEmptyCell = (unit: Unit, targetX: number, targetY: number, gameState: GameState): boolean => {
  return canMoveUnit(unit, targetX, targetY, gameState);
};

// Fonction pour détecter si un mouvement vers une case ennemie est tenté
export const isMovingToEnemyOccupiedCell = (unit: Unit, targetX: number, targetY: number, gameState: GameState): boolean => {
  if (targetX < 0 || targetX >= BOARD_WIDTH || targetY < 0 || targetY >= BOARD_HEIGHT) return false;
  
  const targetCell = gameState.board[targetY][targetX];
  return Boolean(targetCell.unit && targetCell.unit.player !== unit.player);
};

// Nouvelle fonction pour calculer toutes les cases dans la portée d'attaque d'une unité
export const getCellsInAttackRange = (unit: Unit): Array<{x: number, y: number}> => {
  const range = getUnitRange(unit.type);
  const cellsInRange: Array<{x: number, y: number}> = [];
  
  for (let targetX = Math.max(0, unit.x - range); targetX <= Math.min(BOARD_WIDTH - 1, unit.x + range); targetX++) {
    for (let targetY = Math.max(0, unit.y - range); targetY <= Math.min(BOARD_HEIGHT - 1, unit.y + range); targetY++) {
      const distance = Math.abs(targetX - unit.x) + Math.abs(targetY - unit.y);
      
      // Exclure la case de l'unité elle-même
      if (distance <= range && !(targetX === unit.x && targetY === unit.y)) {
        cellsInRange.push({ x: targetX, y: targetY });
      }
    }
  }
  
  return cellsInRange;
};

// Fonction pour vérifier si une case est dans la portée d'attaque d'une unité
export const isInAttackRange = (unit: Unit, targetX: number, targetY: number): boolean => {
  const range = getUnitRange(unit.type);
  const distance = Math.abs(targetX - unit.x) + Math.abs(targetY - unit.y);
  return distance <= range && distance > 0; // Exclure la case de l'unité elle-même
};

export const getUnitMovement = (unitType: UnitType): number => {
  switch (unitType) {
    case 'infantry': return 2;
    case 'cavalry': return 4;
    case 'artillery': return 1;
    case 'general': return 3;
    case 'flag': return 0;
    default: return 1;
  }
};

export const canAttackUnit = (attacker: Unit, target: Unit, gameState: GameState): boolean => {
  if (attacker.attacked) return false;
  if (attacker.player === target.player) return false;
  
  const distance = Math.abs(target.x - attacker.x) + Math.abs(target.y - attacker.y);
  const range = getUnitRange(attacker.type);
  
  return distance <= range;
};

export const getUnitRange = (unitType: UnitType): number => {
  switch (unitType) {
    case 'infantry': return 1;
    case 'cavalry': return 1;
    case 'artillery': return 3;
    case 'general': return 1;
    case 'flag': return 0;
    default: return 1;
  }
};

// Système de dés à 12 faces (teetotum) comme dans l'original
export const rollTwelveSidedDie = (): number => {
  return Math.floor(Math.random() * 12) + 1;
};

// Table T - Résultats de combat basés sur l'excès (simplifié)
export const getCombatResult = (excess: number): { casualties: number, captures: number } => {
  if (excess >= 8) return { casualties: 3, captures: 2 };
  if (excess >= 6) return { casualties: 2, captures: 1 };
  if (excess >= 4) return { casualties: 2, captures: 0 };
  if (excess >= 2) return { casualties: 1, captures: 0 };
  return { casualties: 0, captures: 0 };
};

// Nouvelle fonction pour compter les unités alliées adjacentes à l'ennemi
export const getAdjacentAlliesBonus = (attacker: Unit, defender: Unit, gameState: GameState): number => {
  const adjacentPositions = [
    { x: defender.x - 1, y: defender.y - 1 }, { x: defender.x, y: defender.y - 1 }, { x: defender.x + 1, y: defender.y - 1 },
    { x: defender.x - 1, y: defender.y },                                        { x: defender.x + 1, y: defender.y },
    { x: defender.x - 1, y: defender.y + 1 }, { x: defender.x, y: defender.y + 1 }, { x: defender.x + 1, y: defender.y + 1 }
  ];
  
  let allyCount = 0;
  
  for (const pos of adjacentPositions) {
    // Vérifier que la position est dans les limites du plateau
    if (pos.x >= 0 && pos.x < BOARD_WIDTH && pos.y >= 0 && pos.y < BOARD_HEIGHT) {
      const cell = gameState.board[pos.y][pos.x];
      // Compter les unités alliées à l'attaquant qui sont adjacentes au défenseur
      if (cell.unit && cell.unit.player === attacker.player && cell.unit.id !== attacker.id) {
        allyCount++;
      }
    }
  }
  
  return allyCount;
};

// Fonction modifiée pour inclure le bonus des alliés adjacents
export const getUnitCombatValue = (unit: Unit, terrain: TerrainCell, gameState?: GameState, opponent?: Unit): number => {
  let baseValue = unit.strength;
  
  // Bonus défensif du terrain
  baseValue += terrain.defensiveBonus;
  
  // Bonus selon le type d'unité
  switch (unit.type) {
    case 'general': baseValue += 2; break;
    case 'artillery': baseValue += 1; break;
    case 'cavalry': baseValue += 1; break;
    case 'infantry': break; // +0
    case 'flag': return 1; // Très vulnérable, valeur fixe
    default: break;
  }
  
  // Bonus des unités alliées adjacentes à l'ennemi
  if (gameState && opponent) {
    const adjacentAlliesBonus = getAdjacentAlliesBonus(unit, opponent, gameState);
    baseValue += adjacentAlliesBonus;
  }
  
  return baseValue;
};

// Fonction modifiée pour utiliser le nouveau système
export const resolveCombatOriginal = (
  attacker: Unit, 
  defender: Unit, 
  terrain: TerrainCell,
  gameState: GameState,
  requiresReferee: boolean = true
): CombatResult => {
  const redRoll = rollTwelveSidedDie();
  const blueRoll = rollTwelveSidedDie();
  
  // Calculer les valeurs avec les bonus d'unités adjacentes
  const attackerValue = getUnitCombatValue(attacker, terrain, gameState, defender);
  const defenderValue = getUnitCombatValue(defender, terrain, gameState, attacker);
  
  const redTotal = (attacker.player === 'red' ? attackerValue : defenderValue) + 
                   (attacker.player === 'red' ? redRoll : blueRoll);
  const blueTotal = (attacker.player === 'blue' ? attackerValue : defenderValue) + 
                    (attacker.player === 'blue' ? redRoll : blueRoll);
  
  const excess = Math.abs(redTotal - blueTotal);
  const winner = redTotal > blueTotal ? 'red' : blueTotal > redTotal ? 'blue' : 'draw';
  
  const { casualties, captures } = getCombatResult(excess);
  
  return {
    redRoll,
    blueRoll,
    excess,
    winner,
    casualties,
    captures
  };
};

// Fonction simplifiée mise à jour
export const resolveCombat = (attacker: Unit, defender: Unit, terrain: TerrainCell, gameState: GameState): { attackerLoss: number, defenderLoss: number } => {
  try {
    const result = resolveCombatOriginal(attacker, defender, terrain, gameState, false);
    
    let attackerLoss = 0;
    let defenderLoss = 0;
    
    if (result.winner === attacker.player) {
      defenderLoss = Math.min(result.casualties, defender.strength);
    } else if (result.winner !== 'draw') {
      attackerLoss = Math.min(result.casualties, attacker.strength);
    }
    
    return { attackerLoss, defenderLoss };
  } catch {
    // Fallback avec le nouveau système
    const attackerRoll = rollTwelveSidedDie();
    const defenderRoll = rollTwelveSidedDie();
    
    const attackerTotal = getUnitCombatValue(attacker, terrain, gameState, defender) + attackerRoll;
    const defenderTotal = getUnitCombatValue(defender, terrain, gameState, attacker) + defenderRoll;
    
    let attackerLoss = 0;
    let defenderLoss = 0;
    
    if (attackerTotal > defenderTotal) {
      defenderLoss = Math.min(1, defender.strength);
    } else if (defenderTotal > attackerTotal) {
      attackerLoss = Math.min(1, attacker.strength);
    }
    
    return { attackerLoss, defenderLoss };
  }
}; 