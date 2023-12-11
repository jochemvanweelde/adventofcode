import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const input = rawInput.split('\n').map((line) => line.split(''))
  return input
};

function getIndexesOfEmptyRowsAndAddRows(input: string[][]){
  let indexes: number[] = []
  input.forEach((item, index) => {
    if(item.indexOf('#') == -1){
      indexes.push(index)
    }
  })

  const length = input[0].length

  console.log(length)

  for (const index of indexes){
    input.splice(index, 0, Array(length).fill('.'))
  }
}

function getIndexesOfEmtpyColumns(input: string[][]){
  //Rotate 90 Degrees
  const rotatedMapForward = input[0].map((val, index) => input.map(row => row[index]).reverse())
  const rotatedMapBackward = rotatedMapForward[0].map((val, index) => rotatedMapForward.map(row => row[row.length-1-index]));
  input = rotatedMapBackward
}

function arraysEqual(a: string[][], b: string[][]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  console.log(a.length, b.length)
  if (a.length !== b.length) return false;
  console.log('c')

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    console.log('a', a[i], 'b', b[i])
    for (var j = 0; j < a[i].length; ++j){
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  getIndexesOfEmptyRowsAndAddRows(input)
  getIndexesOfEmtpyColumns(input)

  const parsedInput = parseInput(`....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`)

  const equal = arraysEqual(input, parsedInput)

  console.log(equal)

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
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
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
