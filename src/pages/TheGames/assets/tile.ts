export const TILE_SIZE = 10;

export interface Tile {
  color: string;
  crossable: boolean;
}

export const rock: Tile = {
  color: "#2eb8b8",
  crossable: true,
};

export const grass: Tile = {
  color: "#002db3",
  crossable: true,
};

export const water: Tile = {
  color: "#00b3b3",
  crossable: true,
};

export const sand: Tile = {
  color: "#6695ff",
  crossable: true,
};

export const road: Tile = {
  color: "#00e6e6",
  crossable: true,
};

export const tree: Tile = {
  color: "#00e6b8",
  crossable: true,
};

const biomes = [rock, grass, water, sand, road, tree];

const randomBiome = () => {
  return biomes[Math.floor(Math.random() * biomes.length)];
};

// export const createMap = (width: number, height: number) => {
//   const map: Tile[][] = [];
//   for (let i = 0; i < height; i++) {
//     map.push([]);
//     for (let j = 0; j < width; j++) {
//       map[i].push(randomBiome());
//     }
//   }
//   return map;
// };

export const createMap = (width: number, height: number) => {
  const map: Tile[][] = [];
  for (let i = 0; i < height; i++) {
    map.push([]);
    for (let j = 0; j < width; j++) {
      let newTile: Tile;
      if (i > 0 && j > 0) {
        const topTile = map[i - 1][j];
        const leftTile = map[i][j - 1];
        if (Math.random() < 0.95) {
          newTile = Math.random() < 0.7 ? topTile : leftTile;
        } else {
          newTile = randomBiome();
        }
      } else if (i > 0) {
        const topTile = map[i - 1][j];
        newTile = Math.random() < 0.95 ? topTile : randomBiome();
      } else if (j > 0) {
        const leftTile = map[i][j - 1];
        newTile = Math.random() < 0.95 ? leftTile : randomBiome();
      } else {
        newTile = randomBiome();
      }
      map[i].push(newTile);
    }
  }
  return map;
};

export const drawMap = (ctx: CanvasRenderingContext2D, map: any[][]) => {
  const width = map.length * TILE_SIZE;
  const height = map[0].length * TILE_SIZE;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const color = map[i][j].color;
      const [r, g, b, a] = hexToRgba(color);
      const x = i * TILE_SIZE;
      const y = j * TILE_SIZE;

      for (let dx = 0; dx < TILE_SIZE; dx++) {
        for (let dy = 0; dy < TILE_SIZE; dy++) {
          const index = ((y + dy) * width + (x + dx)) * 4;
          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = a;
        }
      }
    }
  }
  return imageData;
};

const hexToRgba = (hex: string): [number, number, number, number] => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b, 255]; // Assuming full opacity
};
