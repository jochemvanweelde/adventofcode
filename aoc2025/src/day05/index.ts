import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function getRanges(rawRanges: string): [number, number][] {
  const ranges = rawRanges.split("\n");
  const numberRanges: [number, number][] = ranges.map((range) => {
    const [lower, higher] = range.split("-");
    return [Number(lower), Number(higher)];
  });

  return numberRanges;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [rawRanges, rawIds] = input.split("\n\n");

  const ranges = getRanges(rawRanges);

  const result = rawIds.split("\n").reduce((prev, curr) => {
    const id = Number(curr);

    const isValid = ranges.some(
      ([lower, higher]) => id >= lower && id <= higher,
    );

    if (isValid) {
      return prev + 1;
    }
    return prev;
  }, 0);

  return result;
};

function checkOverlapAndReturnDiff(
  rangeToCheck: [number, number],
  ranges: [number, number][],
): [number, number][] {
  /**
   * 4 Possibilities
   * - Range starts with new Ids and ends with already processed ids
   * - Range starts with already processed ids and ends with new ids
   * - Range encapsulated already processed ids (resulting in 2 ranges)
   * - Full range is already processed
   */

  // console.log(
  //   `Checking range overlap for: ${rangeToCheck} with ranges ${ranges.join(
  //     " | ",
  //   )}`,
  // );

  for (let index = 0; index < ranges.length; index++) {
    const range = ranges[index];
    //Range is encapsulated
    if (range[0] > rangeToCheck[0] && range[1] < rangeToCheck[1]) {
      // console.log(`Range: ${rangeToCheck} is encapsulated in ${range}`);
      return [
        ...checkOverlapAndReturnDiff(
          [rangeToCheck[0], range[0] - 1],
          ranges.slice(index + 1),
        ),
        ...checkOverlapAndReturnDiff(
          [range[1] + 1, rangeToCheck[1]],
          ranges.slice(index + 1),
        ),
      ];
    }
    //Range if fully processed
    if (range[0] <= rangeToCheck[0] && range[1] >= rangeToCheck[1]) {
      // console.log(`Range is already processed`);
      return [];
    }
    // Range starts with already processed ids
    if (
      rangeToCheck[0] >= range[0] &&
      rangeToCheck[0] <= range[1] &&
      rangeToCheck[1] > range[1]
    ) {
      // console.log(`Range starts with already processed ids`);
      return checkOverlapAndReturnDiff(
        [range[1] + 1, rangeToCheck[1]],
        ranges.slice(index + 1),
      );
    }
    // Range ends with already processed ids
    if (
      rangeToCheck[0] < range[0] &&
      rangeToCheck[1] >= range[0] &&
      rangeToCheck[1] <= range[1]
    ) {
      // console.log(`Range ends with already processed ids`);
      return checkOverlapAndReturnDiff(
        [rangeToCheck[0], range[0] - 1],
        ranges.slice(index + 1),
      );
    }
  }

  return [rangeToCheck];
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [rawRanges, rawIds] = input.split("\n\n");

  const ranges = getRanges(rawRanges);

  const uniqueRanges: [number, number][] = [];

  for (const range of ranges) {
    uniqueRanges.push(...checkOverlapAndReturnDiff(range, uniqueRanges));
  }

  // console.log(uniqueRanges);

  const result = uniqueRanges.reduce((prev, [lower, higher]) => {
    return prev + higher - lower + 1;
  }, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32
`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
