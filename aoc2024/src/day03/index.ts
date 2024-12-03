import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = input.match(regex);

  const tuples = matches.map((match) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, num1, num2] = match.match(/mul\((\d{1,3}),(\d{1,3})\)/);
    return [parseInt(num1), parseInt(num2)];
  });

  return tuples.reduce((acc, [num1, num2]) => acc + num1 * num2, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
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
