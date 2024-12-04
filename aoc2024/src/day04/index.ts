import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const rotateMatrixToLeft = (matrix: string) => {
  const rows = matrix.split('\n');
  const rotatedMatrix = rows.map((_, i) => rows.map((row) => row[i]).join(''));
  return rotatedMatrix.join('\n');
};

const rotateForwardSlashDiagonal = (matrix: string) => {
  const matrixArray = matrix.split('\n').map((row) => row.split(''));

  const rotatedMatrix: string[][] = [];
  for (let i = 0; i < matrixArray.length; i++) {
    for (let j = 0; j < matrixArray.length; j++) {
      rotatedMatrix[i + j] = rotatedMatrix[i + j] || [];
      rotatedMatrix[i + j].push(matrixArray[i][j]);
    }
  }

  return rotatedMatrix.map((row) => row.join('')).join('\n');
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const horizontalXmasCount = input.match(/XMAS/g)?.length || 0;
  const horizontalXmasCountReversed = input.match(/SAMX/g)?.length || 0;

  const verticalXmasCount =
    rotateMatrixToLeft(input).match(/XMAS/g)?.length || 0;
  const verticalXmasCountReversed =
    rotateMatrixToLeft(input).match(/SAMX/g)?.length || 0;

  const forwardSlashDiagonalXmasCount =
    rotateForwardSlashDiagonal(input).match(/XMAS/g)?.length || 0;
  const forwardSlashDiagonalXmasCountReversed =
    rotateForwardSlashDiagonal(input).match(/SAMX/g)?.length || 0;

  const backwardSlashDiagonalResult = rotateForwardSlashDiagonal(
    input
      .split('\n')
      .map((row) => row.split('').reverse().join(''))
      .join('\n'),
  );

  const backwardSlashDiagonalXmasCount =
    backwardSlashDiagonalResult.match(/XMAS/g)?.length || 0;
  const backwardSlashDiagonalXmasCountReversed =
    backwardSlashDiagonalResult.match(/SAMX/g)?.length || 0;

  return (
    horizontalXmasCount +
    horizontalXmasCountReversed +
    verticalXmasCount +
    verticalXmasCountReversed +
    forwardSlashDiagonalXmasCount +
    forwardSlashDiagonalXmasCountReversed +
    backwardSlashDiagonalXmasCount +
    backwardSlashDiagonalXmasCountReversed
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
      {
        input: `SAAA
AAAA
AAMA
AAAX`,
        expected: 1,
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
