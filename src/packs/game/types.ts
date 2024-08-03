export type CardName =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export type Card = {
  rarity: "common" | "rare" | "epic" | "legendary";
  name: CardName;
  value: number;
};

export type Deck = Card[];

export type Hand = Card[];

export type Player = {
  name: string;
  hand: Hand;
  positions: Position[];
};

export type Game = {
  players: Player[];
  deck: Deck;
};

export type Position = {
  card: Card | null;
  player: Player | null;
};

export type GameState = {
  game: Game;
  winner: Player | null;
};

export type GameAction =
  | { type: "SET_GAME"; payload: Game }
  | { type: "SET_WINNER"; payload: Player | null }
  | { type: "RESET_GAME" }
  | { type: "DRAW_CARD"; payload: Player }
  | { type: "PLAY_CARD"; payload: { player: Player; card: Card } }
  | { type: "END_GAME" }
  | { type: "RESTART_GAME" }
  | { type: "SHUFFLE_DECK" }
  | { type: "DEAL_CARDS" }
  | { type: "ADD_PLAYER"; payload: Player }
  | { type: "REMOVE_PLAYER"; payload: Player }
  | { type: "SET_PLAYER_NAME"; payload: { player: Player; name: string } }
  | { type: "SET_PLAYER_HAND"; payload: { player: Player; hand: Hand } }
  | { type: "SET_PLAYER_CARD"; payload: { player: Player; card: Card } }
  | { type: "SET_PLAYER_HAND_CARD"; payload: { player: Player; card: Card } }
  | {
      type: "SET_PLAYER_HAND_CARD_VALUE";
      payload: { player: Player; card: Card; value: number };
    }
  | {
      type: "SET_PLAYER_HAND_CARD_NAME";
      payload: { player: Player; card: Card; name: CardName };
    }
  | {
      type: "SET_PLAYER_HAND_CARD_RARITY";
      payload: {
        player: Player;
        card: Card;
        rarity: "common" | "rare" | "epic" | "legendary";
      };
    };
