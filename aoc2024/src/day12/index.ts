import run from 'aocrunner';
import { randomUUID } from 'crypto';

type GardenPlotNode = {
  x: number;
  y: number;
  plant: string;
  cornerAmount?: number;
  regionId?: string;
};

const parseInput = (rawInput: string): GardenPlotNode[][] =>
  rawInput
    .split('\n')
    .map((line, y) => line.split('').map((plant, x) => ({ x, y, plant })));

const getAdjacentNodes = (
  garden: GardenPlotNode[][],
  node: GardenPlotNode,
): GardenPlotNode[] =>
  [
    garden[node.y - 1]?.[node.x],
    garden[node.y + 1]?.[node.x],
    garden[node.y]?.[node.x - 1],
    garden[node.y]?.[node.x + 1],
  ].filter(Boolean);

const getCornerAmount = (garden: GardenPlotNode[][], node: GardenPlotNode) => {
  const expectedCornerAmount = 4;

  const otherAdjacentPlots = getAdjacentNodes(garden, node).filter(
    (adjacentNode) => adjacentNode.plant === node.plant,
  );

  return expectedCornerAmount - otherAdjacentPlots.length;
};

const exploreRegion = (
  garden: GardenPlotNode[][],
  node: GardenPlotNode,
  regionId?: string,
) => {
  if (node.regionId) return;

  regionId = regionId || randomUUID();
  node.regionId = regionId;
  node.cornerAmount = getCornerAmount(garden, node);

  getAdjacentNodes(garden, node)
    .filter((adjecentNode) => adjecentNode.plant === node.plant)
    .forEach((adjacentNode) => exploreRegion(garden, adjacentNode, regionId));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.forEach((row) => row.forEach((node) => exploreRegion(input, node)));

  const regionMap = new Map<
    string,
    {
      plotAmount: number;
      cornerAmount: number;
    }
  >();

  input.flat().forEach((node) => {
    const region = regionMap.get(node.regionId!);
    if (!region) {
      regionMap.set(node.regionId!, {
        plotAmount: 1,
        cornerAmount: node.cornerAmount!,
      });
    } else {
      region.plotAmount++;
      region.cornerAmount += node.cornerAmount!;
    }
  });

  return Array.from(regionMap.values()).reduce(
    (acc, region) => acc + region.plotAmount * region.cornerAmount,
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
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 140,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 772,
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
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
  // onlyTests: true, // Comment out to run on the actual input
});
