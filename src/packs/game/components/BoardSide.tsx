import { Player } from "../types";
import { CardPosition } from "./CardPosition";

interface BoardSideProps {
  player: Player | null;
}

export const BoardSide = ({ player }: BoardSideProps) => {
  return (
    <>
      <div className="text-white text-center border-white border h-1/3 flex">
        {Array.from({ length: 4 }).map((_, i) => {
          const position = player?.positions[i] ?? { player, card: null };
          return <CardPosition key={i} position={position} />;
        })}
      </div>
    </>
  );
};
