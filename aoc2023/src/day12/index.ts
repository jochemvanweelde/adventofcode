import run from 'aocrunner';
import { parse } from 'path';

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map((line) => {
    const [springs, moves] = line.trim().split(' ');
    return {
      springs: springs.split(''),
      groups: moves.split(',').map((move) => parseInt(move)),
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  console.log(input);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 21,
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
  onlyTests: true,
});
