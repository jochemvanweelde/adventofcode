import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const presents = input.split('\n')
  let wrappingPaperNeeded = 0;

  for (const present of presents){
    const dimensions = present.split('x')
    const [l, w, h] = dimensions.map((item) => parseInt(item));
    wrappingPaperNeeded += 2*l*w + 2*w*h + 2*h*l
    const sortDimensions = [l, w, h].sort((a, b) => a-b);
    wrappingPaperNeeded += sortDimensions[0] * sortDimensions[1]
  }

  return wrappingPaperNeeded;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const presents = input.split('\n')
  let ribbonNeeded = 0;

  for (const present of presents){
    const dimensions = present.split('x')
    const [l, w, h] = dimensions.map((item) => parseInt(item));
    ribbonNeeded += l*w*h
    const sortDimensions = [l, w, h].sort((a, b) => a-b);
    ribbonNeeded += 2*sortDimensions[0] + 2*sortDimensions[1]
  }

  return ribbonNeeded;
};

run({
  part1: {
    tests: [
      {
        input: `2x3x4`,
        expected: 58,
      },
      {
        input: `1x1x10`,
        expected: 43,
      },
      {
        input: `2x3x4\n1x1x10`,
        expected: 101,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2x3x4`,
        expected: 34,
      },
      {
        input: `1x1x10`,
        expected: 14,
      },
      {
        input: `2x3x4\n1x1x10`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
