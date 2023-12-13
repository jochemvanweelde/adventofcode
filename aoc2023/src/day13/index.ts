import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  return rawInput.split('\n\n').map((map) => {
    const rows = map
      .trim()
      .split('\n')
      .map((row) => row.trim());
    // Get columns from map in form of string[]
    const columns = rows[0]
      .split('')
      .map((_, i) => rows.map((row) => row[i]).join(''));
    return { rows, columns };
  });
};

function findMirrorPositionInList<T>(arr: T[]): number {
  const findIndex = findRepeatingValueInListAndReturnIndexes(arr);

  function isMirrored(left: number, right: number): boolean {
    if (left < 0 || right >= arr.length) {
      return true;
    }
    if (arr[left] === arr[right]) {
      return isMirrored(left - 1, right + 1);
    }
    return false;
  }

  for (let index of findIndex) {
    const [left, right] = [index, index + 1];
    if (isMirrored(left, right)) {
      return left;
    }
  }
  return -1;
}

function findRepeatingValueInListAndReturnIndexes<T>(arr: T[]): number[] {
  let indexes: number[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const [first, second] = [arr[i], arr[i + 1]];
    if (first === second) {
      indexes.push(i);
    }
  }
  return indexes;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sum = input.reduce((acc, { rows, columns }) => {
    const findIndexRow = findMirrorPositionInList(rows);
    const findIndexColumn = findMirrorPositionInList(columns);

    if (findIndexRow !== -1 && findIndexColumn !== -1) {
      throw new Error('Found both row and column');
    } else if (findIndexRow === -1 && findIndexColumn === -1) {
      throw new Error('Found neither row nor column');
    } else if (findIndexRow !== -1) {
      // Found row
      return (findIndexRow + 1) * 100 + acc;
    } else if (findIndexColumn !== -1) {
      // Found column
      return findIndexColumn + 1 + acc;
    }

    return 0 + acc;
  }, 0);

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
        expected: 405,
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
