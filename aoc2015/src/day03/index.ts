import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let x = 0, y = 0;
  const houseMap = new Map<String, undefined>();
  houseMap.set('0,0', undefined)

  for (const direction of input){
    switch (direction) {
      case '^':
        y += 1;
        break;
      case '>':
        x += 1;
        break;
      case 'v':
        y -= 1;
        break;
      case '<':
        x -= 1;
        break;
      default:
        console.error('Invalid character recieved');
    }
    houseMap.set(`${x},${y}`, undefined)
  }
  return houseMap.size
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let xS = 0, yS = 0, xR = 0, yR = 0;
  let isSanta = true;
  const houseMap = new Map<String, undefined>();
  houseMap.set('0,0', undefined)

  for (const direction of input){
    switch (direction) {
      case '^':
        isSanta ? yS += 1 : yR += 1;
        break;
      case '>':
        isSanta ? xS += 1 : xR += 1;
        break;
      case 'v':
        isSanta ? yS -= 1 : yR -= 1;
        break;
      case '<':
        isSanta ? xS -= 1 : xR -= 1;
        break;
      default:
        console.error('Invalid character recieved');
    }
    isSanta ? houseMap.set(`${xS},${yS}`, undefined) : houseMap.set(`${xR},${yR}`, undefined)
    isSanta = !isSanta
  }
  return houseMap.size
};

run({
  part1: {
    tests: [
      {
        input: `>`,
        expected: 2,
      },
      {
        input: `^>v<`,
        expected: 4,
      },
      {
        input: `^v^v^v^v^v`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `^v`,
        expected: 3,
      },
      {
        input: `^>v<`,
        expected: 3,
      },
      {
        input: `^v^v^v^v^v`,
        expected: 11,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
