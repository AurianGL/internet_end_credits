export const frame1 = [
  ["", "x", "x", "x", ""],
  ["x", "w", "x", "w", "x"],
  ["x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x"],
  ["", "x", "", "x", ""],
  ["", "x", "", "", "x"],
  ["", "x", "", "x", ""],
];

export const frame2 = [
  ["", "x", "x", "x", ""],
  ["x", "w", "x", "w", "x"],
  ["x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x"],
  ["x", "", "", "x", ""],
  ["", "x", "", "x", ""],
  ["", "x", "", "x", ""],
];

export const frame3 = [
  ["", "x", "x", "x", ""],
  ["x", "w", "x", "w", "x"],
  ["x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x"],
  ["", "x", "", "x", ""],
  ["x", "", "", "", "x"],
  ["x", "", "", "", "x"],
];

export const frame4 = [
  ["", "x", "x", "x", ""],
  ["x", "w", "x", "w", "x"],
  ["x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x"],
  ["", "x", "", "", "x"],
  ["x", "", "", "", "x"],
  ["", "x", "", "x", ""],
];

export const walkSequence = [frame1, frame2, frame3, frame4];

// const COLORS = {
//   user: "orangered",
//   pnj: "mediumorchid",
// };

export const createCharacterPixel = (color: string, frame: string[][]) => {
  const pixel = [];
  for (let i = 0; i < frame.length; i++) {
    for (let j = 0; j < frame[j].length; j++) {
      if (frame[i][j] === "x") {
        pixel.push({ x: j, y: i, color });
      }
      pixel.push({ x: j, y: i, color: "transparent" });
    }
  }
  return pixel;
};

export const drawCharacterOnCanvas = (
  ctx: CanvasRenderingContext2D,
  characterPosition: { x: number; y: number },
  color: string,
  walkSequenceIndex: number,
  isElectric: boolean
) => {
  const seq = walkSequence[walkSequenceIndex];
  const close = Math.random() > 0.2;
  for (let i = 0; i < seq[0].length; i += 1) {
    for (let j = 0; j < seq.length; j += 1) {
      const pickColor = () => {
        switch (seq[j][i]) {
          case "x":
            return color;
          case "w":
            return close ? "thistle" : color;
          case "b":
            return "black";
          default:
            return "transparent";
        }
      };
      ctx.fillStyle =
        isElectric && Math.random() < 0.1 ? "lightcyan" : pickColor();
      ctx.fillRect(
        characterPosition.x + 5 * i,
        characterPosition.y + 5 * j,
        5,
        5
      );
    }
  }
};
