import fs from 'fs';

export const writeOutputToFile = (
  output: string,
  day: number,
  fileName?: string,
) => {
  const path = `./src/day${day.toString().padStart(2, '0')}/${
    fileName || 'output.txt'
  }`;
  fs.writeFileSync(path, output);
};
