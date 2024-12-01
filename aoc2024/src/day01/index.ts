import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const getColumnsAsLists = (input: string) => {
  const lines = input.split('\n');
  const columns: number[][] = [[], []];

  lines.forEach((line) => {
    const [first, second] = line.split('   ');
    columns[0].push(parseInt(first, 10));
    columns[1].push(parseInt(second, 10));
  });

  return columns;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const columns = getColumnsAsLists(input);
  const sortedFirstColumn = columns[0].sort((a, b) => a - b);
  const sortedSecondColumn = columns[1].sort((a, b) => a - b);

  const result = sortedFirstColumn.reduce(
    (acc, current, index) =>
      acc + Math.abs(current - sortedSecondColumn[index]),
    0,
  );

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const columns = getColumnsAsLists(input);
  const firstColumn = columns[0];
  const secondColumn = columns[1];

  const result = firstColumn.reduce((acc, current) => {
    const foundTimes = secondColumn.filter((value) => value === current).length;
    return acc + current * foundTimes;
  }, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
