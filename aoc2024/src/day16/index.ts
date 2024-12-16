import run from 'aocrunner';

type MazeTile = {
  x: number;
  y: number;
  type: '#' | '.' | 'S' | 'E';
  value: number;
  direction?: 'N' | 'E' | 'S' | 'W';
  onOneOfBestPaths: boolean;
};

type Maze = {
  tiles: MazeTile[][];
  width: number;
  height: number;
  start: MazeTile;
  end: MazeTile;
};

const parseInput = (rawInput: string): Maze => {
  const lines = rawInput.trim().split('\n');
  const height = lines.length;
  const width = lines[0].length;
  const tiles: MazeTile[][] = [];
  let start: MazeTile | null = null;
  let end: MazeTile | null = null;

  for (let y = 0; y < height; y++) {
    tiles.push([]);
    for (let x = 0; x < width; x++) {
      const char = lines[y][x];
      const tile: MazeTile = {
        x,
        y,
        type: char as '#' | '.' | 'S' | 'E',
        value: char === 'S' ? 0 : Infinity,
        direction: char === 'S' ? 'E' : undefined,
        onOneOfBestPaths: false,
      };

      if (char === 'S') {
        start = tile;
      } else if (char === 'E') {
        end = tile;
      }

      tiles[y].push(tile);
    }
  }

  if (!start || !end) {
    throw new Error('Maze must have a start (S) and end (E) tile.');
  }

  return {
    tiles,
    width,
    height,
    start,
    end,
  };
};

const getRelevantNeighbors = (maze: Maze, tile: MazeTile) => {
  const { x, y, direction, value } = tile;

  const directions = ['N', 'E', 'S', 'W'] as const;
  const deltas = [
    { dx: 0, dy: -1 }, // N
    { dx: 1, dy: 0 }, // E
    { dx: 0, dy: 1 }, // S
    { dx: -1, dy: 0 }, // W
  ];

  const neighbors = directions
    .map((dir, index) => {
      const { dx, dy } = deltas[index];
      const newX = x + dx;
      const newY = y + dy;

      if (newX < 0 || newX >= maze.width || newY < 0 || newY >= maze.height) {
        return null;
      }

      const neighbor = maze.tiles[newY][newX];
      if (neighbor.type === '#') {
        return null;
      }

      let cost = value + 1;
      if (direction && direction !== dir) {
        cost += 1000;
      }

      return {
        x: newX,
        y: newY,
        cost,
        direction: dir,
      };
    })
    .filter((neighbor) => neighbor !== null);

  return neighbors as {
    x: number;
    y: number;
    cost: number;
    direction: 'N' | 'E' | 'S' | 'W';
  }[];
};

const exploreMaze = (maze: Maze) => {
  const { start, end } = maze;
  const queue = [start];

  while (queue.length) {
    const current = queue.shift() as MazeTile;

    const possibleNeighbors = getRelevantNeighbors(maze, current);
    possibleNeighbors.forEach((pN) => {
      const { x, y, cost, direction } = pN;
      const neighborTile = maze.tiles[y][x];

      if (cost < neighborTile.value) {
        neighborTile.value = cost;
        neighborTile.direction = direction;
        queue.push(neighborTile);
      }
    });
  }

  return end.value;
};

const getNeighbors = (maze: Maze, tile: MazeTile) => {
  const { x, y } = tile;

  const tiles = [
    maze.tiles[y - 1]?.[x], // N
    maze.tiles[y]?.[x + 1], // E
    maze.tiles[y + 1]?.[x], // S
    maze.tiles[y]?.[x - 1], // W
  ].filter((tile) => tile && tile.type !== '#');

  return tiles;
};

const getNeighborsBacktracking = (maze: Maze, tile: MazeTile) => {
  const { x, y, value } = tile;

  const tiles = [
    maze.tiles[y - 1]?.[x], // N
    maze.tiles[y]?.[x + 1], // E
    maze.tiles[y + 1]?.[x], // S
    maze.tiles[y]?.[x - 1], // W
  ].filter(
    (ft) =>
      (ft && value - ft.value <= 1001 && value - ft.value >= 1) ||
      getNeighbors(maze, tile).some((n) => n.value - ft.value === 2),
  );

  return tiles;
};

const backTrackAllPossibleBestPaths = (maze: Maze) => {
  const { end } = maze;
  const queue = [end];
  const visited = new Set<string>();

  visited.add(`${end.x},${end.y}`);

  while (queue.length) {
    const current = queue.shift() as MazeTile;

    const possibleNeighbors = getNeighborsBacktracking(maze, current);
    possibleNeighbors.forEach((pN) => {
      const { x, y } = pN;
      const neighborTile = maze.tiles[y][x];

      if (!visited.has(`${x},${y}`)) {
        neighborTile.onOneOfBestPaths = true;
        queue.push(neighborTile);
        visited.add(`${x},${y}`);
      }
    });
  }

  return visited.size;
};

const printBoard = (maze: Maze) => {
  for (let y = 0; y < maze.height; y++) {
    let line = '';
    for (let x = 0; x < maze.width; x++) {
      const tile = maze.tiles[y][x];
      if (tile.onOneOfBestPaths) {
        line += `\x1b[33mO\x1b[0m`;
      } else {
        line += tile.type;
      }
    }
    console.log(line);
  }
};

const printBoardWithValues = (maze: Maze) => {
  for (let y = 0; y < maze.height; y++) {
    let line = '';
    for (let x = 0; x < maze.width; x++) {
      const tile = maze.tiles[y][x];
      if (tile.onOneOfBestPaths) {
        line += `\x1b[33m${tile.value.toString().padEnd(9, ' ')}\x1b[0m`;
      } else {
        const value =
          tile.value === Infinity
            ? 'INF'.padEnd(9, ' ')
            : tile.value.toString().padEnd(9, ' ');
        line += value;
      }
    }
    console.log(line);
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return exploreMaze(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  exploreMaze(input);

  const result = backTrackAllPossibleBestPaths(input);

  // printBoard(input);
  //! NOTE: Gives wrong result on actual input. Use PrintBoard to see the paths and subtract the number of 'O's from the wrong paths.
  // console.log();
  // printBoardWithValues(input);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
        expected: 7036,
      },
      {
        input: `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`,
        expected: 11048,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
        expected: 45,
      },
      {
        input: `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
