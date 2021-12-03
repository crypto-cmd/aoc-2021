import { Direction, Instruction } from "./Instruction";
import { getInstructions } from "./part1";

const consumeInstructions = (instructions: Instruction[]) => {
  const pos = { horizontal: 0, depth: 0, aim: 0 };
  instructions.forEach(({ direction, steps }) => {
    if (direction === Direction.DOWN) {
      pos.aim += steps;
    }
    if (direction === Direction.UP) {
      pos.aim -= steps;
    }
    if (direction === Direction.Forward) {
      pos.horizontal += steps;
      pos.depth += steps * pos.aim;
    }
  });
  return pos;
};
/**
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const solution = async () => {
  const instructions = await getInstructions();
  const pos = consumeInstructions(instructions);
  return pos.horizontal * pos.depth; // 1971232560
};
if (require.main === module) {
  solution().then(console.log);
}
