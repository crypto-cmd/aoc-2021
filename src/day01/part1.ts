import { readLines } from "../lib/utils";

/**
 * Count how many times there was an increase in depth
 * Time: O(n)
 * Space: O(1) excluding the input array
 */
export const solution = async () => {
  const depths = (await readLines("./src/day01/input.txt")).map(Number);
  return depths.reduce((acc, curr, index) => {
    const previousDepth = depths[index - 1] ?? Infinity;
    if (curr > previousDepth) {
      acc++;
    }
    return acc;
  }, 0); // Solution: 1228
};
if (require.main === module) {
  solution().then(console.log);
}
