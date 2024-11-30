import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

/**
 * So yeah... This totally doesnt work and I made it a mess.
 * Maybe I will come back to it later or just redo it from scratch.
 */

type Coords = [number, number];

class LavaTile {
  coords: Coords;
  heatLossValue: number;
  lowestHeatLossPathValue = Infinity;
  amountOfContinousStraightPaths = 0;
  prevLavaTile: LavaTile | null = null;

  constructor(coords: Coords, heatLossValue: number) {
    this.coords = coords;
    this.heatLossValue = heatLossValue;
  }
}

class LavaMap {
  tiles: LavaTile[][];
  tilesToCheck: Set<LavaTile> = new Set();

  xLength: number;
  yLength: number;

  constructor(rawMap: string) {
    const map = rawMap.split('\n').map((row) => row.split(''));

    this.tiles = map.map((row, y) =>
      row.map((cell, x) => {
        return new LavaTile([x, y], parseInt(cell));
      })
    );

    this.xLength = this.tiles[0].length;
    this.yLength = this.tiles.length;
  }

  isTilesStraight(tile: LavaTile, nextTile: LavaTile) {
    if (!tile.prevLavaTile) {
      return false;
    }

    const [x, y] = tile.prevLavaTile.coords;
    const [nextX, nextY] = nextTile.coords;

    if (x === nextX) {
      return true;
    }

    if (y === nextY) {
      return true;
    }

    return false;
  }

  isNextTilePossible(tile: LavaTile, nextTile: LavaTile) {
    if (nextTile === tile.prevLavaTile) {
      return false;
    }

    if (tile.amountOfContinousStraightPaths < 3) {
      return true;
    }

    if (this.isTilesStraight(tile, nextTile)) {
      return false;
    }

    return true;
  }

  getPossibleNextTiles(tile: LavaTile) {
    const [x, y] = tile.coords;
    const adjacentTiles: LavaTile[] = [];

    if (x > 0) {
      adjacentTiles.push(this.tiles[y][x - 1]);
    }
    if (x < this.xLength - 1) {
      adjacentTiles.push(this.tiles[y][x + 1]);
    }
    if (y > 0) {
      adjacentTiles.push(this.tiles[y - 1][x]);
    }
    if (y < this.yLength - 1) {
      adjacentTiles.push(this.tiles[y + 1][x]);
    }

    const result = adjacentTiles.filter((adjacentTile) =>
      this.isNextTilePossible(tile, adjacentTile)
    );

    const deletedTiles = adjacentTiles.filter(
      (adjacentTile) => !result.includes(adjacentTile)
    );

    deletedTiles.forEach((deletedTile) => {
      if (deletedTile.prevLavaTile === tile) {
        deletedTile.prevLavaTile = null;
        this.tilesToCheck.add(deletedTile);
      }
    });

    return result;
  }

  removeTileRefFromAdjacentTilesIfTileIsSelf(tile: LavaTile) {
    const [x, y] = tile.coords;

    function remove(adjecentTile: LavaTile) {
      if (adjecentTile.prevLavaTile === tile) {
        adjecentTile.prevLavaTile = null;
      }
    }

    if (x > 0) {
      remove(this.tiles[y][x - 1]);
      this.tilesToCheck.add(this.tiles[y][x - 1]);
    }
    if (x < this.xLength - 1) {
      remove(this.tiles[y][x + 1]);
      this.tilesToCheck.add(this.tiles[y][x + 1]);
    }
    if (y > 0) {
      remove(this.tiles[y - 1][x]);
      this.tilesToCheck.add(this.tiles[y - 1][x]);
    }
    if (y < this.yLength - 1) {
      remove(this.tiles[y + 1][x]);
      this.tilesToCheck.add(this.tiles[y + 1][x]);
    }
  }

  findLowestHeatLossPath() {
    const startTile = this.tiles[0][0];
    startTile.lowestHeatLossPathValue = startTile.heatLossValue;
    this.tilesToCheck.add(startTile);

    while (this.tilesToCheck.size) {
      const currentTile = Array.from(this.tilesToCheck)[
        this.tilesToCheck.size - 1
      ] as LavaTile;
      this.tilesToCheck.delete(currentTile);

      const adjacentTiles = this.getPossibleNextTiles(currentTile);

      adjacentTiles.forEach((adjacentTile) => {
        const newHeatLossValue =
          currentTile.lowestHeatLossPathValue + adjacentTile.heatLossValue;

        if (newHeatLossValue < adjacentTile.lowestHeatLossPathValue) {
          adjacentTile.lowestHeatLossPathValue = newHeatLossValue;
          adjacentTile.prevLavaTile = currentTile;
          if (this.isTilesStraight(currentTile, adjacentTile)) {
            adjacentTile.amountOfContinousStraightPaths =
              currentTile.amountOfContinousStraightPaths + 1;
          } else {
            adjacentTile.amountOfContinousStraightPaths = 1;
          }
          this.tilesToCheck.add(adjacentTile);
        }
      });
    }

    return this.tiles[this.tiles.length - 1][this.tiles[0].length - 1]
      .lowestHeatLossPathValue;
  }

  printMap() {
    this.tiles.forEach((row) => {
      console.log(row.map((tile) => tile.lowestHeatLossPathValue).join(','));
    });
  }

  printMapStraightPaths() {
    const shortestPathNodes: LavaTile[] = [];
    let currentNode: LavaTile | null =
      this.tiles[this.tiles.length - 1][this.tiles[0].length - 1];

    while (currentNode) {
      shortestPathNodes.unshift(currentNode);
      currentNode = currentNode.prevLavaTile;
    }

    this.tiles.forEach((row) => {
      console.log(
        row
          .map((tile) => {
            if (shortestPathNodes.includes(tile)) {
              return `\x1b[31m${tile.amountOfContinousStraightPaths}\x1b[0m`;
            } else {
              return tile.amountOfContinousStraightPaths.toString();
            }
          })
          .join('')
      );
    });
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lavaMap = new LavaMap(input);
  const result = lavaMap.findLowestHeatLossPath();

  lavaMap.printMapStraightPaths();
  console.log('-----------------');
  // lavaMap.printMap();

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`,
        expected: 102,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
