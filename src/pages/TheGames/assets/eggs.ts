const eggPattern = [
  ["b", "b", "", "b", "b"],
  ["b", "", "x", "", "b"],
  ["", "b", "x", "b", ""],
  ["", "x", "x", "x", ""],
  ["", "x", "x", "x", ""],
  ["", "b", "x", "b", ""],
  ["b", "", "b", "", "b"],
];

export const createEggPixel = (color: string, frame: string[][]) => {
  const pixel = [];
  for (let i = 0; i < frame.length; i++) {
    for (let j = 0; j < frame[i].length; j++) {
      if (frame[i][j] === "x") {
        pixel.push({ x: j, y: i, color });
      }
      if (frame[i][j] === "b") {
        pixel.push({ x: j, y: i, color: "black" });
      }
      if (frame[i][j] === "w") {
        pixel.push({ x: j, y: i, color: "white" });
      }
      pixel.push({ x: j, y: i, color: "transparent" });
    }
  }
  return pixel;
};

export const drawEggOnCanvas = (
  ctx: CanvasRenderingContext2D,
  color: string,
  position: { x: number; y: number }
) => {
  const heartPixel = createEggPixel(color, eggPattern);
  heartPixel.forEach(({ x, y, color }, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(position.x + x * 3, position.y + y * 3, 3, 3);
  });
};
