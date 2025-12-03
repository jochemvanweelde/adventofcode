import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

// function getInvalidIdsCount(instruction: string) {
//   console.log("Instruction:", instruction);
//   const [lowerId, higherId] = instruction.split("-");

//   if (lowerId.length === higherId.length && lowerId.length % 2 === 1) {
//     return 0;
//   }

//   if (lowerId.length % 2 === 1) {
//     const newLowerId = Math.pow(10, lowerId.length);
//     const newInstruction = `${newLowerId}-${higherId}`;
//     return getInvalidIdsCount(newInstruction);
//   }

//   const leftLowerId = lowerId.slice(0, lowerId.length / 2);
//   const rightLowerId = lowerId.slice(lowerId.length / 2);
//   const leftHigherId = higherId.slice(0, higherId.length - rightLowerId.length);
//   const rightHigherId = higherId.slice(higherId.length - rightLowerId.length);

//   const leftDistance = Number(leftHigherId) - Number(leftLowerId);
//   const rightDistance = Number(rightHigherId) - Number(rightLowerId);

//   if (rightDistance < 0) {
//     return leftDistance - 1;
//   }
//   return leftDistance;
// }

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

  return;
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
