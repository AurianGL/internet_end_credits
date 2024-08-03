import { useContext } from "react";
import { DispatchContext, GamingContext } from "../contexts/GameContext";
import { BoardSide } from "./BoardSide";
import { PlayerHand } from "./PlayerHand";

export const GameBoard = () => {
  const { game } = useContext(GamingContext);
  const dispatch = useContext(DispatchContext);

  const { players } = game;

  return (
    <div className="text-white text-center h-full w-full">
      <button
        onClick={() =>
          dispatch({
            type: "ADD_PLAYER",
            payload: { name: "pouet", hand: [], positions: [] },
          })
        }
      >
        Add Player
      </button>
      <div className="h-full flex flex-col w-full">
        <PlayerHand player={players.at(0) ?? null} />
        <BoardSide player={players.at(1) ?? null} />
        <BoardSide player={players.at(0) ?? null} />
        <PlayerHand player={players.at(1) ?? null} />
      </div>
    </div>
  );
};
