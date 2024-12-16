import run from 'aocrunner';

type MazeTile = {
  x: number;
  y: number;
  type: '#' | '.' | 'S' | 'E';
  value: number;
  direction?: 'N' | 'E' | 'S' | 'W';
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

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return exploreMaze(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
