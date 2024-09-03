export type Star = {
  x: number;
  y: number;
  size: number;
  pulse: number;
};

const canvasWidth = 400;
const canvasHeight = 400;

export const nightSky = () => {
  const numStars = 100;
  const stars: Star[] = [];

  // Create stars with random positions and sizes
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      size: Math.random() * 2 + 1,
      pulse: Math.random() * 0.05 + 0.02,
    });
  }
  return stars;
  // Function to draw stars

  // Function to animate stars
  // const animateStars = () => {
  //   stars.forEach((star) => {
  //     star.size += star.pulse;
  //     if (star.size > 2 || star.size < 1) {
  //       star.pulse = -star.pulse;
  //     }
  //   });

  //   drawStars();
  //   requestAnimationFrame(animateStars);
  // };

  // Start the animation
  // animateStars()?\
};

export const drawStars = (ctx: CanvasRenderingContext2D, stars: Star[]) => {
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  });
};
