import run from "aocrunner";
import { Game, Grab } from "./types";

const parseInput = (rawInput: string): Game[] => {
  const rawGames = rawInput.split('\n')
  return rawGames.map((rawGame) => {
    const [gameInfo, gameInput] = rawGame.split(':')
    const gameId = gameInfo.split(' ')[1]
    const rawGrabs = gameInput.split(';')
    const grabs = rawGrabs.map((rawGrab): Grab => {
      let red = 0
      let green = 0
      let blue = 0
      rawGrab.split(',').forEach((dice) => {
        const [amount, color] = dice.trim().split(' ')
        switch (color){
          case 'red':
            red = parseInt(amount)
            break
          case 'green':
            green = parseInt(amount)
            break
          case 'blue':
            blue = parseInt(amount)
        }
      })
      return {
        red,
        green,
        blue
      }
    })
    return {
      id: parseInt(gameId),
      grabs
    }
  })
};

function isGrabPossible(grab: Grab){
  return grab.red <= 12 && grab.green <=13 && grab.blue <= 14
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const successfullGames = input.filter((game) => 
    game.grabs.every(isGrabPossible)
  )

  const sumSuccessfullGames = successfullGames.reduce(
    (accumulator, current) => accumulator + current.id, 0)

  return sumSuccessfullGames;
};

function getMinimumGrabAndMultiply(game: Game): number{
  const red = game.grabs.reduce((prev, current) => (prev && prev.red > current.red) ? prev : current).red
  const green = game.grabs.reduce((prev, current) => (prev && prev.green > current.green) ? prev : current).green
  const blue = game.grabs.reduce((prev, current) => (prev && prev.blue > current.blue) ? prev : current).blue
  return red*green*blue
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce((accumulator, current) => accumulator + getMinimumGrabAndMultiply(current), 0);
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
