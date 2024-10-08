import { createMap, TILE_SIZE } from "../assets/tile";
import { Direction } from "../hooks/useNPCsState";

export const randomDirection = () => {
  const directions: Direction["x"][] = [-1, 0, 1];
  return directions[Math.floor(Math.random() * directions.length)];
};

const WIDTH = 25;
const HEIGHT = 35;

type rectProps = { x: number; y: number; size: number };

export const isColliding = (rect1: rectProps, rect2: rectProps) => {
  return (
    rect1.x < rect2.x + rect1.size &&
    rect1.x + rect1.size > rect2.x &&
    rect1.y < rect2.y + rect2.size &&
    rect1.y + rect1.size > rect2.y
  );
};

export const isEggColliding = (rect1: rectProps, rect2: rectProps) => {
  return (
    rect1.x < rect2.x + 5 * 3 &&
    rect1.x + rect1.size > rect2.x &&
    rect1.y < rect2.y + 7 * 3 &&
    rect1.y + rect1.size > rect2.y
  );
};

type OnInitType = (context: {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}) => void;

export const onInit: OnInitType = (context: {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}) => {
  const { ctx, canvas } = context;
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const map = createMap(400, 400);

    for (let i = 0; i < map.length; i += TILE_SIZE) {
      for (let j = 0; j < map[i].length; j += TILE_SIZE) {
        const tile = map[i][j];
        ctx.fillStyle = tile.color;
        ctx.fillRect(i, j, TILE_SIZE, TILE_SIZE);
      }
    }
  }
};

type OnUpdateType = (
  delta: number,
  context: {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
  }
) => void;

export const onUpdate: OnUpdateType = (
  delta: number,
  context: {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
  }
) => {
  const { ctx, canvas } = context;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const map = createMap(400, 400);

  for (let i = 0; i < map.length; i += TILE_SIZE) {
    for (let j = 0; j < map[i].length; j += TILE_SIZE) {
      const tile = map[i][j];
      ctx.fillStyle = tile.color;
      ctx.fillRect(i, j, TILE_SIZE, TILE_SIZE);
    }
  }
};

export const rgbColors = (alpha: number) => [
  `rgba(255, 99, 71, ${alpha})`,
  `rgba(255, 255, 124, ${alpha})`,
  `rgba(255, 25, 255, ${alpha})`,
];
