import run from "aocrunner";
import { ConvertMap, FertilizerPlan, Seed } from "./types";

const parseInput = (rawInput: string): FertilizerPlan => {
  const [seedString, ...mapList] = rawInput.split('\n')
  const seeds = seedString.trim().split(' ').splice(1).map((seed): Seed => parseInt(seed))
  
  let convertMap: ConvertMap[] = [];
  let mapBuilder: ConvertMap = {
    name: '',
    ranges: []
  }

  mapList.forEach((row) => {
    if (row === '' && mapBuilder && mapBuilder.name ){
      convertMap.push(structuredClone(mapBuilder))
      mapBuilder.name = ''
      mapBuilder.ranges = []
    }
    else if (row.includes(':')){
      mapBuilder.name = row.split(' ')[0]
    }
    else {
      const [destination, source, length] = row.split(' ').map((number) => parseInt(number))
      mapBuilder.ranges.push({
        destination,
        source,
        length
      })
    }
  });

  return {
    seeds,
    maps: convertMap
  };

};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput + '\n');

  const newSeedValues = input.seeds.map((seed) => {
    input.maps.forEach((map) => {
      for (const {source, destination, length} of map.ranges){
        if(seed >= source && seed < source + length){
          seed += destination-source
          return;
        }
      }
    });
    return seed
  })

  return Math.min(...newSeedValues)
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
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
