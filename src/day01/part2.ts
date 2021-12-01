import { FileReader } from "../lib/FileReader";
/**
 * Slide a window and sum the numbers in it. Move the window. Count the number of times the new sum is greater than the old sum.
 * Time: O(n)
 * Space: O(1) excluding the input array
 */
export const solution = () => {
  const depths = new FileReader("./src/day01/input.txt")
    .readLines()
    .map(Number);
  let window = [0, 1, 2];
  let count = 0;
  while (window[2] <= depths.length) {
    // Sum this window
    const sumA = depths[window[0]] + depths[window[1]] + depths[window[2]];

    // Move the window
    window[0]++;
    window[1]++;
    window[2]++;

    // Sum new window
    const sumB = depths[window[0]] + depths[window[1]] + depths[window[2]];

    // If the sum of the new window is larger than the sum of the old window icnrease counter
    if (sumB > sumA) {
      count++;
    }
  }
  return count; // Answer: 1257
};
if (require.main === module) {
  console.log(solution());
}