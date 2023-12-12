import run from "aocrunner";

const MULTIPLIER_NUMBER = 999999

const parseInput = (rawInput: string) => {
  const input = rawInput.split('\n').map((line) => line.trim().split(''))
  return input
};

function getIndexesOfEmptyRowsAndAddRows(input: string[][]){
  let indexes: number[] = []
  input.forEach((item, index) => {
    if(item.indexOf('#') === -1){
      indexes.push(index)
    }
  })

  const length = input[0].length

  indexes.forEach((indexValue, index) => {
    input.splice(indexValue + index, 0, Array(length).fill('.'))
    });
}

function getIndexesOfEmtpyColumns(input: string[][]){
  //Rotate 90 Degrees
  const rotatedMapForward = input[0].map((val, index) => input.map(row => row[index]).reverse())
  getIndexesOfEmptyRowsAndAddRows(rotatedMapForward)

  const rotatedMapBackward = rotatedMapForward[0].map((val, index) => rotatedMapForward.map(row => row[row.length-1-index]));

  return rotatedMapBackward
}

function arraysEqual(a: string[][], b: string[][]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    for (var j = 0; j < a[i].length; ++j){
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}

function getCoordinatesOfOccupiedSeats(input: string[][]){
  let coordinates: number[][] = []
  input.forEach((item, index) => {
    item.forEach((seat, seatIndex) => {
      if(seat === '#'){
        coordinates.push([index, seatIndex])
      }
    })
  })
  return coordinates
}

function sumDistanceOfEachCoordinateToAllOthers(coordinates: number[][]){
  let sum = 0
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const coordinateA = coordinates[i];
      const coordinateB = coordinates[j];
      sum += Math.abs(coordinateA[0] - coordinateB[0]) + Math.abs(coordinateA[1] - coordinateB[1]);
    }
  }
  return sum;
}

function sumDistanceOfEachCoordinateToAllOthersTimesOneMillion(coordinatesBefore: number[][], coordinatesAfter: number[][]){
  let sum = 0
  const length = coordinatesBefore.length
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      const coordinateABefore = coordinatesBefore[i];
      const coordinateBBefore = coordinatesBefore[j];
      const coordinateAAfter = coordinatesAfter[i];
      const coordinateBAfter = coordinatesAfter[j];

      const differenceXCoodinateA = [coordinateAAfter[0] - coordinateABefore[0], coordinateAAfter[1] - coordinateABefore[1]]
      const differenceXCoodinateB = [coordinateBAfter[0] - coordinateBBefore[0], coordinateBAfter[1] - coordinateBBefore[1]]

      const actualCoordinateA = [coordinateABefore[0] + differenceXCoodinateA[0] * MULTIPLIER_NUMBER, coordinateABefore[1] + differenceXCoodinateA[1] * MULTIPLIER_NUMBER]
      const actualCoordinateB = [coordinateBBefore[0] + differenceXCoodinateB[0] * MULTIPLIER_NUMBER, coordinateBBefore[1] + differenceXCoodinateB[1] * MULTIPLIER_NUMBER]

      sum += Math.abs(actualCoordinateA[0] - actualCoordinateB[0]) + Math.abs(actualCoordinateA[1] - actualCoordinateB[1]);
    }
  }
  return sum;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  getIndexesOfEmptyRowsAndAddRows(input)
  const newMap = getIndexesOfEmtpyColumns(input)

  const coordinates = getCoordinatesOfOccupiedSeats(newMap)
  const sum = sumDistanceOfEachCoordinateToAllOthers(coordinates)

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const coordinatesBefore = getCoordinatesOfOccupiedSeats(input)

  getIndexesOfEmptyRowsAndAddRows(input)
  const newMap = getIndexesOfEmtpyColumns(input)

  const coordinatesAfter = getCoordinatesOfOccupiedSeats(newMap)

  const sum = sumDistanceOfEachCoordinateToAllOthersTimesOneMillion(coordinatesBefore, coordinatesAfter)

  return sum;
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
        expected: 82000210,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
