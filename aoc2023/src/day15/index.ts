import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const runHash = (hash: string) => {
  let newResult = 0;
  hash.split('').forEach((char) => {
    newResult += char.charCodeAt(0);
    newResult *= 17;
    newResult %= 256;
  });
  return newResult;
};

const part1 = (rawInput: string) => {
  const hashes = parseInput(rawInput).split(',');

  return hashes.map(runHash).reduce((acc, curr) => acc + curr, 0);
};

type Box = {
  [key: string]: number; // lens
};
type Boxes = Box[];

function parseInstruction(instruction: string) {
  const [hash, action, focalLength] = instruction.split(/(?=[-|=])/);
  return { hash, action };
}

const part2 = (rawInput: string) => {
  const instructions = parseInput(rawInput).split(',');
  const allBoxes: Boxes = Array.from({ length: 256 }, () => ({}));

  for (const instruction of instructions) {
    const { hash, action } = parseInstruction(instruction);

    const hashValue = runHash(hash);
    if (action === '-') {
      delete allBoxes[hashValue][hash];
    } else {
      allBoxes[hashValue][hash] = parseInt(action.slice(1));
    }
  }

  let total = 0;

  allBoxes.forEach((box, index) => {
    const boxValue = index + 1;
    let totalBox = 0;
    Object.entries(box).forEach(([key, value], index) => {
      totalBox += boxValue * (index + 1) * value;
    });
    total += totalBox;
  });

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `HASH`,
        expected: 52,
      },
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
