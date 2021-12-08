import { getInputs } from "./part1";
const arithmeticSeriesSum = (
  firstTerm: number,
  difference: number,
  n: number
) => {
  return (n / 2) * (2 * firstTerm + (n - 1) * difference);
};

export const calcFuel = async (horizontalPositions: number[], i: number) => {
  return horizontalPositions
    .map((x) => {
      const firstTerm = 1;
      const n=Math.abs( x - i);
      const difference = 1;
      return arithmeticSeriesSum(firstTerm, difference, n);
    })
    .reduce((a, b) => a + b);
};

const solve = async () => {
  const horizontalPositions = await getInputs();
  const pos = await searchBinarily(horizontalPositions);
  return calcFuel(horizontalPositions, pos); // 98925151
};
export const searchBinarily = async (horizontalPositions: number[]) => {
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
