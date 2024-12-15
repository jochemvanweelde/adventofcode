import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  const [map, path] = rawInput.split('\n\n');

  return {
    map: map.split('\n').map((row) => row.split('')),
    path: path
      .split('\n')
      .map((row) => row.split(''))
      .flat(),
  };
};

const moveIfPossible = (
  map: string[][],
  coords: { x: number; y: number },
  direction: string,
): { x: number; y: number } | false => {
  const { x, y } = coords;
  const nextCoords = { x, y };

  switch (direction) {
    case '^':
      nextCoords.y--;
      break;
    case 'v':
      nextCoords.y++;
      break;
    case '<':
      nextCoords.x--;
      break;
    case '>':
      nextCoords.x++;
      break;
  }

  if (map[nextCoords.y][nextCoords.x] === '#') {
    return false;
  }

  if (map[nextCoords.y][nextCoords.x] === 'O') {
    if (!moveIfPossible(map, nextCoords, direction)) {
      return false;
    }
  }

  map[nextCoords.y][nextCoords.x] = map[y][x];
  map[y][x] = '.';
  return nextCoords;
};

const printMap = (map: string[][]) => {
  map.forEach((row) => {
    console.log(row.join(''));
  });
  console.log('\n');
};

const calulateValueOfObstacles = (map: string[][]) => {
  let value = 0;

  map.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 'O') {
        value += 100 * rowIndex + cellIndex;
      }
    });
  });

  return value;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const robotRow = input.map.findIndex((row) => row.includes('@'));
  const robotCol = input.map[robotRow].indexOf('@');
  let robotCoords = { x: robotCol, y: robotRow };

  // printMap(input.map);

  input.path.forEach((direction) => {
    const result = moveIfPossible(input.map, robotCoords, direction);
    if (result) {
      robotCoords = result;
    }

    // console.log(`move: ${direction}:`);
    // printMap(input.map);
  });

  // printMap(input.map);

  return calulateValueOfObstacles(input.map);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
        expected: 2028,
      },
      {
        input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 10092,
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
