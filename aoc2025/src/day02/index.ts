import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function getInvalidIds(instruction: string): number[] {
  const [lowerId, higherId] = instruction.split("-").map(Number);

  const result: number[] = [];
  for (let i = lowerId; i <= higherId; i++) {
    const id = i.toString();
    const left = id.slice(0, id.length / 2);
    const right = id.slice(id.length / 2);

    if (left === right) {
      result.push(i);
    }
  }

  return result;
}

function getInvalidIdsPart2(instruction: string): number[] {
  const [lowerId, higherId] = instruction.split("-").map(Number);

  const result = new Set<number>();

  for (let id = lowerId; id <= higherId; id++) {
    const idS = id.toString();
    for (let size = 1; size <= idS.length / 2; size++) {
      const patterns: string[] = [];
      if (idS.length % size !== 0) {
        continue;
      }
      for (let start = 0; start <= idS.length - size; start += size) {
        patterns.push(idS.slice(start, start + size));
      }
      if (patterns.every((item) => item === patterns[0])) {
        result.add(id);
      }
    }
  }

  return Array.from(result);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const ranges = input.split(",");

  const result = ranges.map(getInvalidIds);

  return result.reduce(
    (prev, curr) => curr.reduce((prev, curr) => prev + curr, 0) + prev,
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const ranges = input.split(",");

  const result = ranges.map(getInvalidIdsPart2);

  return result.reduce(
    (prev, curr) => curr.reduce((prev, curr) => prev + curr, 0) + prev,
    0,
  );
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "95-115",
        expected: 210,
      },
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
      1698522-1698528,446443-446449,38593856-38593862,565653-565659,
      824824821-824824827,2121212118-2121212124`,
        expected: 4174379265,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
