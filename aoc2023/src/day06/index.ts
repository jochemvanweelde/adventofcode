import run from "aocrunner";

type Race = {
  time: number
  distance: number
}

const parseInput = (rawInput: string): Race[] => {
  const [time, distance] = rawInput.split('\n')
  const [_, ...timeList] = time.split(/ +/g)
  const [__, ...distanceList] = distance.split(/ +/g)

  return timeList.map((time, index) => ({
    time: parseInt(time),
    distance: parseInt(distanceList[index])
  }))
};

const parseInputP2 = (rawInput: string): Race[] => {
  const [time, distance] = rawInput.split('\n')
  const [_, ...timeList] = time.split(/ +/g)
  const [__, ...distanceList] = distance.split(/ +/g)

  const timeActually = timeList.reduce((a, c) => a + c, '')
  const distanceActually = distanceList.reduce((a, c) => a + c, '')

  return [{
    time: parseInt(timeActually),
    distance: parseInt(distanceActually)
  }]
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const winningPossibilitiesList = input.map((race) => {
    let winningCounter = 0;

    for (let i = 0; i <= race.time; i++){
      const distanceTravelled = i * (race.time - i)
      if (distanceTravelled > race.distance){
        winningCounter++;
      }
    }
    return winningCounter;
  })

  return winningPossibilitiesList.reduce((a, c) => a * c, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInputP2(rawInput);

  const winningPossibilitiesList = input.map((race) => {
    let winningCounter = 0;

    for (let i = 0; i <= race.time; i++){
      const distanceTravelled = i * (race.time - i)
      if (distanceTravelled > race.distance){
        winningCounter++;
      }
    }
    return winningCounter;
  })

  return winningPossibilitiesList.reduce((a, c) => a + c, 0);
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
