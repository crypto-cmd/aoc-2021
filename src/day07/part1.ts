import { readLines } from "../lib/utils";

export const calcFuel = async (horizontalPositions: number[], i: number) => {
  return horizontalPositions
    .map((x) => Math.abs(x - i))
    .reduce((a, b) => a + b);
};
export const getInputs = async () => {
  const line = (await readLines("./src/day07/input.txt"))[0];
  const horizontalPositions = line.split(",").map(Number);
  return horizontalPositions;
};
const solve = async () => {
  const horizontalPositions = await getInputs();
  const pos = await searchBinarily(horizontalPositions);
  return calcFuel(horizontalPositions, pos); // 34344
};
export const searchBinarily = async (
  horizontalPositions: number[]
) => {
  let [min, max] = [
    Math.min(...horizontalPositions),
    Math.max(...horizontalPositions),
  ];
  let pos = Math.floor((max - min) / 2);

  while (true) {
    const left = await calcFuel(horizontalPositions, pos - 1);
    const right = await calcFuel(horizontalPositions, pos + 1);
    const current = await calcFuel(horizontalPositions, pos);

    if (current < left && current < right) {
      return pos;
    }
    if (left < current) {
      max = pos;
      pos = pos - Math.floor(Math.abs(pos - min) / 2);
    } else if (right < current) {
      min = pos;
      pos = pos + Math.floor(Math.abs(pos - max) / 2);
    }
  }
};
if (require.main === module) {
  (async () => console.log(await solve()))();
}
