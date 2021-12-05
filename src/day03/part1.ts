import { readLines } from "../lib/utils";

const solution = async () => {
  const lines = await readLines("./src/day03/input.txt");
  const bitData: { [index: number]: [numZeroes: number, numOnes: number] } = {};
  lines.forEach((line) => {
    const bits = line.split("");
    bits.forEach((bit, index) => {
      // Initialize the bitData at that index
      bitData[index] = bitData[index] || [0, 0];

      // Increment the bitData at that index
      bitData[index][bit === "0" ? 0 : 1]++;
    });
  });
  const maxBits = Object.values(bitData).reduce((acc, [zeroes, ones]) => {
    return [...acc, zeroes > ones ? 0 : 1];
  }, [] as number[]);
  const minBits = maxBits.map((bit) => (bit === 1 ? 0 : 1));
  return toDecimal(minBits) * toDecimal(maxBits); // 3813416
};
export const toDecimal = (bits: number[]) => {
  return bits.reduce((acc, bit, index) => {
    return acc + bit * Math.pow(2, Math.abs( bits.length-1-index));
  }, 0);
};
if (require.main === module) {
  (async () => {
    console.log(await solution());
  })();
}
