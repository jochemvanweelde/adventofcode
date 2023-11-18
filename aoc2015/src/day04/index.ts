import run from "aocrunner";
import { Md5 } from "ts-md5";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let number = 0;

  while (true){
    const result = Md5.hashStr(`${input}${number}`)
    if (result.startsWith('00000')){
      return number;
    }
    number += 1;
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let number = 0;

  while (true){
    const result = Md5.hashStr(`${input}${number}`)
    if (result.startsWith('000000')){
      return number;
    }
    number += 1;
  }
};

run({
  part1: {
    tests: [
      // {
      //   input: `abcdef`,
      //   expected: 609043,
      // },
      // {
      //   input: `pqrstuv`,
      //   expected: 1048970,
      // },
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
