export type TerrainType = 'plain' | 'hill' | 'forest' | 'river' | 'bridge' | 'fortress';

export type UnitType = 'infantry' | 'cavalry' | 'artillery' | 'general' | 'flag';

export type Player = 'red' | 'blue' | 'referee';

export type CombatResult = {
  redRoll: number;
  blueRoll: number;
  excess: number;
  winner: 'red' | 'blue' | 'draw';
  casualties: number;
  captures: number;
};

export interface Unit {
  id: string;
  type: UnitType;
  player: 'red' | 'blue';
  strength: number;
  maxStrength: number;
  x: number;
  y: number;
  moved: boolean;
  attacked: boolean;
}

export interface TerrainCell {
  type: TerrainType;
  x: number;
  y: number;
  defensiveBonus: number;
  movementCost: number;
}

export interface GameState {
  board: (TerrainCell & { unit?: Unit })[][];
  currentPlayer: 'red' | 'blue';
  phase: 'movement' | 'combat' | 'end';
  turn: number;
  selectedUnit?: Unit;
  gameLog: string[];
  redUnits: Unit[];
  blueUnits: Unit[];
  waitingForPlayer: boolean;
  refereeIntervention: boolean;
  combatResults: CombatResult[];
  redLosses: number;
  blueLosses: number;
  redCaptures: number;
  blueCaptures: number;
  requiresReferee: boolean;
}

export interface GameAction {
  type: 'move' | 'attack' | 'end_turn' | 'select_unit';
  unitId?: string;
  targetX?: number;
  targetY?: number;
  player: Player;
}

export const UNIT_SYMBOLS = {
  infantry: '♟',
  cavalry: '♞',
  artillery: '♜',
  general: '♔',
  flag: '⚑'
} as const;

export const TERRAIN_SYMBOLS = {
  plain: '.',
  hill: '^',
  forest: '♠',
  river: '~',
  bridge: '=',
  fortress: '▣'
} as const; 