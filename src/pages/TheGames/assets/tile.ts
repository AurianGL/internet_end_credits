export const TILE_SIZE = 10;

interface Tile {
  color: string;
  crossable: boolean;
}

export const rock: Tile = {
  color: "midnightblue",
  crossable: true,
};

export const grass: Tile = {
  color: "navy",
  crossable: true,
};

export const water: Tile = {
  color: "aqua",
  crossable: true,
};

export const sand: Tile = {
  color: "royalblue",
  crossable: true,
};

export const road: Tile = {
  color: "teal",
  crossable: true,
};

export const tree: Tile = {
  color: "turquoise",
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
        if (Math.random() < 0.98) {
          newTile = Math.random() < 0.7 ? topTile : leftTile;
        } else {
          newTile = randomBiome();
        }
      } else if (i > 0) {
        const topTile = map[i - 1][j];
        newTile = Math.random() < 0.98 ? topTile : randomBiome();
      } else if (j > 0) {
        const leftTile = map[i][j - 1];
        newTile = Math.random() < 0.98 ? leftTile : randomBiome();
      } else {
        newTile = randomBiome();
      }
      map[i].push(newTile);
    }
  }
  return map;
};
