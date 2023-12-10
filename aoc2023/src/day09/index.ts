import run from 'aocrunner';
import { assert } from 'console';

const parseInput = (rawInput: string) => {
  return rawInput
    .split('\n')
    .map((line) => line.split(' ').map((num) => parseInt(num)));
};

function calculateDifferenceArray(input: number[]) {
  const differences = [];
  for (let i = 1; i < input.length; i++) {
    differences.push(input[i] - input[i - 1]);
  }
  return differences;
}

function differentiateToZero(input: number[]): number[][] {
  const differences = calculateDifferenceArray(input);

  const sum = differences.reduce((a, b) => a + b, 0);
  if (sum === 0) {
    assert(differences.length >= 1, `differences.length === 0 on ${input}`);
    return [differences];
  }
  return [differences, ...differentiateToZero(differences)];
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const differentiateLists = input.map((list) => {
    const differences = differentiateToZero(list);
    differences.unshift(list);
    return differences;
  });

  // console.log(differentiateLists);

  return differentiateLists.reduce((acc1, list) => {
    const sum = list.reduce((acc2, diff) => {
      assert(diff.at(-1) !== undefined, `diff.at(-1) is undefined on ${diff}`);
      return acc2 + (diff.at(-1) as number);
    }, 0);

    return sum + acc1;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const reverseInput = input.map((list) => list.reverse());

  const differentiateLists = reverseInput.map((list) => {
    const differences = differentiateToZero(list);
    differences.unshift(list);
    return differences;
  });

  // console.log(differentiateLists);

  return differentiateLists.reduce((acc1, list) => {
    const sum = list.reduce((acc2, diff) => {
      assert(diff.at(-1) !== undefined, `diff.at(-1) is undefined on ${diff}`);
      return acc2 + (diff.at(-1) as number);
    }, 0);

    return sum + acc1;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
      },
      {
        input: `4 0 5 25 76 192 434 915 1864 3762 7604 15392 31092 62596 125907 254105 516044 1053596 2151911 4364551`,
        expected: 8723660,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
