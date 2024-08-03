import { Position } from "../types";

interface CardPositionProps {
  position: Position;
}

export const CardPosition = ({ position }: CardPositionProps) => {
  return (
    <div className="h-full w-1/4 border border-white">
      <div>{position.card?.name}</div>
      <div>{position.card?.value}</div>
    </div>
  );
};
