import { readLines } from "../lib/utils";
import { Direction, Instruction } from "./Instruction";

export const consumeInstructions = (instructions: Instruction[]) => {
  const pos = { horizontal: 0, depth: 0 };
  for (const instruction of instructions) {
    if (instruction.direction === Direction.UP) {
      pos.depth -= instruction.steps;
    }
    if (instruction.direction === Direction.DOWN) {
      pos.depth += instruction.steps;
    }
    if (instruction.direction === Direction.Forward) {
      pos.horizontal += instruction.steps;
    }
  }
  return pos;
};
export const getInstructions = async () => {
  const lines = await readLines("./src/day02/input.txt");
  const instructions: Instruction[] = lines.map((line) => {
    const [direction, steps] = line.split(" ");
    return { direction: direction as Direction, steps: Number(steps) };
  });
  return instructions;
}
/**
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const solution = async () => {
  const instructions = await getInstructions();
  const pos = consumeInstructions(instructions);
  return pos.horizontal * pos.depth; // 1882980
};
if (require.main === module) {
  (async () => {
    console.log(`The solution is: ${await solution()}`);
  })();
}
