import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { GameAction, GameState } from "../types";

interface GamingContextProps {
  children: React.ReactNode;
}

export const GamingContext = createContext<GameState>({
  game: {
    players: [],
    deck: [],
  },
  winner: null,
});

export const DispatchContext = createContext<React.Dispatch<GameAction>>(
  () => null
);

const reducer: Reducer<GameState, GameAction> = (state, action) => {
  switch (action.type) {
    case "SET_GAME":
      return { ...state, game: action.payload };
    case "SET_WINNER":
      return { ...state, winner: action.payload };
    case "RESET_GAME":
      return { ...state, game: { players: [], deck: [] }, winner: null };
    case "DRAW_CARD":
      return state;
    case "PLAY_CARD":
      return state;
    case "END_GAME":
      return state;
    case "RESTART_GAME":
      return state;
    case "SHUFFLE_DECK":
      return state;
    case "DEAL_CARDS":
      return state;
    case "ADD_PLAYER":
      return {
        ...state,
        game: {
          ...state.game,
          players: [...state.game.players, action.payload],
        },
      };
    case "REMOVE_PLAYER":
      return state;
    case "SET_PLAYER_NAME":
      return state;
    case "SET_PLAYER_HAND":
      return state;
    case "SET_PLAYER_CARD":
      return state;
    case "SET_PLAYER_HAND_CARD":
      return state;
    case "SET_PLAYER_HAND_CARD_VALUE":
      return state;
    case "SET_PLAYER_HAND_CARD_NAME":
      return state;
    case "SET_PLAYER_HAND_CARD_RARITY":
      return state;
    // default:
    //   throw new Error();
  }
};

export const GamingProvider: React.FC<GamingContextProps> = ({ children }) => {
  const [gameState, dispatch] = useReducer(reducer, {
    game: {
      players: [],
      deck: [],
    },
    winner: null,
  });

  return (
    <GamingContext.Provider value={gameState}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </GamingContext.Provider>
  );
};
