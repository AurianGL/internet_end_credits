import { Player } from "../types";

interface PlayerHandProps {
  player: Player | null;
}

export const PlayerHand = ({ player }: PlayerHandProps) => {
  return (
    <div className="text-white text-center border-white border h-1/6 flex">
      {player?.name ?? "No player"}
      {player?.hand.map((card, i) => (
        <div key={i} className="h-full w-1/4 border border-white">
          <div>{card.name}</div>
          <div>{card.value}</div>
        </div>
      ))}
    </div>
  );
};
