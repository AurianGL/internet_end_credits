export const heartPattern = [
  ["", "", "b", "", "", "", "b", "", ""],
  ["", "b", "x", "b", "", "b", "x", "b", ""],
  ["b", "x", "x", "x", "b", "x", "x", "x", "b"],
  ["", "b", "x", "x", "x", "x", "x", "b", ""],
  ["", "", "b", "x", "x", "x", "b", "", ""],
  ["", "", "", "b", "x", "b", "", "", ""],
  ["", "", "", "", "b", "", "", "", ""],
];

export const halfHeartPattern = [
  ["", "", "b", "", "", "", "b", "", ""],
  ["", "b", "x", "b", "", "b", "w", "b", ""],
  ["b", "x", "x", "x", "b", "w", "w", "w", "b"],
  ["", "b", "x", "x", "x", "w", "w", "b", ""],
  ["", "", "b", "x", "w", "w", "b", "", ""],
  ["", "", "", "b", "w", "b", "", "", ""],
  ["", "", "", "", "b", "", "", "", ""],
];

export const createHeartPixel = (color: string, frame: string[][]) => {
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

export const drawHeartsOnCanvas = (
  ctx: CanvasRenderingContext2D,
  heartCount: number
) => {
  const fullHearts = Math.floor(heartCount / 2);
  const halfHearts = heartCount % 2;
  // draw hearts adn half hearts in the top right corner
  for (let i = 0; i < fullHearts; i++) {
    const heartPixel = createHeartPixel("red", heartPattern);
    heartPixel.forEach(({ x, y, color }, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(3 + i * 27 + x * 3, y * 3 + 3, 3, 3);
    });
  }
  for (let i = 0; i < halfHearts; i++) {
    const heartPixel = createHeartPixel("red", halfHeartPattern);
    heartPixel.forEach(({ x, y, color }) => {
      ctx.fillStyle = color;
      ctx.fillRect(3 + heartCount * 9 + x * 3, y * 3 + 3, 3, 3);
    });
  }
};
