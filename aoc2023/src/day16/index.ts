import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum BeamType {
  Continue = '.',
  AngleSlash = '/',
  AngleBackSlash = '\\',
  SplitHorizontal = '-',
  SplitVertical = '|',
}

type Coords = { x: number; y: number };
type Beam = { direction: Direction } & Coords;

class BeamNode {
  coords: Coords;
  directions: Map<Direction, Boolean> = new Map([
    [Direction.Up, false],
    [Direction.Down, false],
    [Direction.Left, false],
    [Direction.Right, false],
  ]);
  type: BeamType;

  constructor(type: BeamType, coords: Coords) {
    this.type = type;
    this.coords = coords;
  }

  isBeamedThrough(): boolean {
    return Array.from(this.directions.values()).some((d) => d);
  }

  doBeamContinue(direction: Direction): Beam[] {
    switch (direction) {
      case Direction.Up:
        return [{ x: this.coords.x, y: this.coords.y - 1, direction }];
      case Direction.Down:
        return [{ x: this.coords.x, y: this.coords.y + 1, direction }];
      case Direction.Left:
        return [{ x: this.coords.x - 1, y: this.coords.y, direction }];
      case Direction.Right:
        return [{ x: this.coords.x + 1, y: this.coords.y, direction }];
    }
  }

  doBeamAngleSlash(direction: Direction): Beam[] {
    switch (direction) {
      case Direction.Up:
        return [
          {
            x: this.coords.x + 1,
            y: this.coords.y,
            direction: Direction.Right,
          },
        ];
      case Direction.Down:
        return [
          { x: this.coords.x - 1, y: this.coords.y, direction: Direction.Left },
        ];
      case Direction.Left:
        return [
          { x: this.coords.x, y: this.coords.y + 1, direction: Direction.Down },
        ];
      case Direction.Right:
        return [
          { x: this.coords.x, y: this.coords.y - 1, direction: Direction.Up },
        ];
    }
  }

  doBeamBackSlash(direction: Direction): Beam[] {
    switch (direction) {
      case Direction.Up:
        return [
          { x: this.coords.x - 1, y: this.coords.y, direction: Direction.Left },
        ];
      case Direction.Down:
        return [
          {
            x: this.coords.x + 1,
            y: this.coords.y,
            direction: Direction.Right,
          },
        ];
      case Direction.Left:
        return [
          { x: this.coords.x, y: this.coords.y - 1, direction: Direction.Up },
        ];
      case Direction.Right:
        return [
          { x: this.coords.x, y: this.coords.y + 1, direction: Direction.Down },
        ];
    }
  }

  doBeamSplitHorizontal(direction: Direction): Beam[] {
    if (direction === Direction.Up || direction === Direction.Down) {
      return [
        { x: this.coords.x - 1, y: this.coords.y, direction: Direction.Left },
        { x: this.coords.x + 1, y: this.coords.y, direction: Direction.Right },
      ];
    }
    return this.doBeamContinue(direction);
  }

  doBeamSplitVertical(direction: Direction): Beam[] {
    if (direction === Direction.Left || direction === Direction.Right) {
      return [
        { x: this.coords.x, y: this.coords.y - 1, direction: Direction.Up },
        { x: this.coords.x, y: this.coords.y + 1, direction: Direction.Down },
      ];
    }
    return this.doBeamContinue(direction);
  }

  doBeamThrough(direction: Direction): Beam[] {
    if (this.directions.get(direction)) {
      return [];
    }

    this.directions.set(direction, true);

    switch (this.type) {
      case BeamType.Continue:
        return this.doBeamContinue(direction);
      case BeamType.AngleSlash:
        return this.doBeamAngleSlash(direction);
      case BeamType.AngleBackSlash:
        return this.doBeamBackSlash(direction);
      case BeamType.SplitHorizontal:
        return this.doBeamSplitHorizontal(direction);
      case BeamType.SplitVertical:
        return this.doBeamSplitVertical(direction);
      default:
        throw new Error(`Unknown beam type: ${this.type}`);
    }
  }
}

class BeamBoard {
  nodes: BeamNode[][];
  beamsToBeam: Beam[] = [];

  constructor(board: string) {
    this.nodes = board.split('\n').map((row, y) =>
      row.split('').map((char, x) => {
        const coords: Coords = { x, y };
        switch (char) {
          case BeamType.Continue:
            return new BeamNode(BeamType.Continue, coords);
          case BeamType.AngleSlash:
            return new BeamNode(BeamType.AngleSlash, coords);
          case BeamType.AngleBackSlash:
            return new BeamNode(BeamType.AngleBackSlash, coords);
          case BeamType.SplitHorizontal:
            return new BeamNode(BeamType.SplitHorizontal, coords);
          case BeamType.SplitVertical:
            return new BeamNode(BeamType.SplitVertical, coords);
          default:
            throw new Error(`Unknown beam type: ${char}`);
        }
      })
    );
  }

  beamNode(beam: Beam) {
    const node = this.get(beam.x, beam.y);
    if (!node) {
      return;
    }

    const newCoords = node.doBeamThrough(beam.direction);
    this.beamsToBeam.push(...newCoords);
  }

  playOutBeam() {
    while (this.beamsToBeam.length) {
      const beam = this.beamsToBeam.shift();
      if (!beam) {
        continue;
      }

      this.beamNode(beam);
    }

    return this.nodes.reduce(
      (acc, row) =>
        acc +
        row.reduce(
          (rowAcc, node) => (node.isBeamedThrough() ? rowAcc + 1 : rowAcc),
          0
        ),
      0
    );
  }

  get(x: number, y: number) {
    return this.nodes[y]?.[x];
  }
}

function playBoardFromBeam(input: string, beam: Beam): number {
  const board = new BeamBoard(input);
  board.beamNode(beam);
  return board.playOutBeam();
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const board = new BeamBoard(input);
  board.beamNode({ x: 0, y: 0, direction: Direction.Right });
  return board.playOutBeam();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const results = [];

  // Top edge
  for (let x = 0; x < input.split('\n')[0].length; x++) {
    results.push(playBoardFromBeam(input, { x, y: 0, direction: Direction.Down }));
  }

  // Bottom edge
  for (let x = 0; x < input.split('\n')[0].length; x++) {
    results.push(playBoardFromBeam(input, { x, y: input.split('\n').length - 1, direction: Direction.Up }));
  }

  // Left edge
  for (let y = 0; y < input.split('\n').length; y++) {
    results.push(playBoardFromBeam(input, { x: 0, y, direction: Direction.Right }));
  }

  // Right edge
  for (let y = 0; y < input.split('\n').length; y++) {
    results.push(playBoardFromBeam(input, { x: input.split('\n')[0].length - 1, y, direction: Direction.Left }));
  }


  return Math.max(...results);
};

run({
  part1: {
    tests: [
      {
        input: `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
