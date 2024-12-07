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
  const rowLength = input.split('\n', 1)[0].length;

  const regex1 = new RegExp(
    `(?=(M.{1}M[.\\s\\S]{${rowLength - 1}}A[.\\s\\S]{${rowLength - 1}}S.{1}S))`,
    'g',
  );
  const regex2 = new RegExp(
    `(?=(M.{1}S[.\\s\\S]{${rowLength - 1}}A[.\\s\\S]{${rowLength - 1}}M.{1}S))`,
    'g',
  );
  const regex3 = new RegExp(
    `(?=(S.{1}M[.\\s\\S]{${rowLength - 1}}A[.\\s\\S]{${rowLength - 1}}S.{1}M))`,
    'g',
  );
  const regex4 = new RegExp(
    `(?=(S.{1}S[.\\s\\S]{${rowLength - 1}}A[.\\s\\S]{${rowLength - 1}}M.{1}M))`,
    'g',
  );

  const result = input.match(regex1)?.length;
  const result2 = input.match(regex2)?.length;
  const result3 = input.match(regex3)?.length;
  const result4 = input.match(regex4)?.length;

  return (result || 0) + (result2 || 0) + (result3 || 0) + (result4 || 0);
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
        expected: 9,
      },
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
