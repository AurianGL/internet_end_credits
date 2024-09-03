export function generateWitchOnBroom(witchColor: string) {
  const black = "#00bdb4";
  const broom = "#8B4513";
  const empty = "";

  return [
    [
      empty,
      empty,
      empty,
      black,
      black,
      black,
      black,
      black,
      empty,
      empty,
      empty,
      empty,
    ],
    [
      empty,
      empty,
      black,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      black,
      empty,
      empty,
      empty,
    ],
    [
      empty,
      black,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      black,
      empty,
      empty,
    ],
    [
      empty,
      black,
      witchColor,
      black,
      witchColor,
      witchColor,
      witchColor,
      black,
      witchColor,
      black,
      empty,
      empty,
    ],
    [
      black,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      black,
      empty,
    ],
    [
      black,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      black,
      empty,
    ],
    [
      empty,
      black,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      witchColor,
      black,
      empty,
      empty,
    ],
    [
      empty,
      empty,
      black,
      black,
      witchColor,
      witchColor,
      witchColor,
      black,
      black,
      empty,
      empty,
      empty,
    ],
    [
      empty,
      black,
      broom,
      black,
      black,
      black,
      black,
      black,
      broom,
      black,
      empty,
      empty,
    ],
    [
      black,
      broom,
      broom,
      broom,
      broom,
      broom,
      broom,
      broom,
      broom,
      broom,
      black,
      empty,
    ],
    [
      empty,
      black,
      broom,
      broom,
      broom,
      broom,
      broom,
      broom,
      broom,
      black,
      empty,
      empty,
    ],
    [
      empty,
      empty,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      empty,
      empty,
      empty,
    ],
  ];
}

// Example usage:
const witchArt = generateWitchOnBroom("#800080"); // Purple witch
console.log(witchArt);

export const drawWitchOnCanvas = (
  ctx: CanvasRenderingContext2D,
  characterPosition: { x: number; y: number },
  witch: string[][] | undefined = generateWitchOnBroom("#800080")
) => {
  const pixelSize = 3;
  for (let i = 0; i < witch.length; i++) {
    for (let j = 0; j < witch[i].length; j++) {
      if (witch[i][j] !== "") {
        ctx.fillStyle = witch[i][j];
        ctx.fillRect(
          characterPosition.x + j * pixelSize,
          characterPosition.y + i * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    }
  }
};
