import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const strings = input.split('\n')
  let amountOfNiceStrings = 0;

  for (const string of strings){
    const r1 = string.match(/(?:[aeiou].*){3,}/) != null // Match at least 3 or more vowels
    const r2 = string.match(/(.)\1/) != null // Match at least one direclty reoccuring character
    const r3 = string.match(/^(?!.*(?:ab|cd|pq|xy)).*$/) != null // Match at least one of these entries
    if (r1 && r2 && r3){
      amountOfNiceStrings += 1
    }
  }
  return amountOfNiceStrings;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const strings = input.split('\n')
  let amountOfNiceStrings = 0;

  for (const string of strings){
    const r1 = string.match(/(.{2}).*?\1/) != null
    const r2 = string.match(/(.).\1/) != null
    if (r1 && r2){
      amountOfNiceStrings += 1
    }
  }
  return amountOfNiceStrings;
};

run({
  part1: {
    tests: [
      {
        input: `ugknbfddgicrmopn`,
        expected: 1,
      },
      {
        input: `aaa`,
        expected: 1,
      },
      {
        input: `jchzalrnumimnmhp`,
        expected: 0,
      },
      {
        input: `haegwjzuvuyypxyu`,
        expected: 0,
      },
      {
        input: `dvszwmarrgswjxmb`,
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `qjhvhtzxzqqjkmpb`,
        expected: 1,
      },
      {
        input: `xxyxx`,
        expected: 1,
      },
      {
        input: `uurcxstgmygtbstg`,
        expected: 0,
      },
      {
        input: `ieodomkazucvgmuy`,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
