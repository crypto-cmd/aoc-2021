import { start } from "repl";
import { SinglyLinkedList } from "../lib/SinglyLinkedLIst";
import { readLines } from "../lib/utils";

export const getInputs = async () => {
  const lines = (await readLines("./src/day14/input.txt")).filter(
    (x) => x.length > 0
  );
  const startingPolymer = lines.shift() as string;

  const instructions = new Map<string, Map<string, string>>();
  lines.forEach((line) => {
    const [key, value] = line.split("->").map((part) => part.trim());
    const [a, b] = key.split("");
    if (!instructions.has(a)) {
      instructions.set(a, new Map());
    }
    instructions.get(a)?.set(b, value);
  });
  const list = new SinglyLinkedList<string>();
  startingPolymer.split("").forEach((x) => list.addNode(x));
  return { startingPolymer: list, instructions };
};
export const solve = async (steps: number) => {
  const { startingPolymer, instructions } = await getInputs();
  let polymer = startingPolymer;
  for (let i = 0; i < steps; i++) {
    runPolymerization(polymer, instructions);
  }
  const letterFreq = new Map<string, number>();
  polymer.forEach((_, char) => {
    letterFreq.set(char, (letterFreq.get(char) ?? 0) + 1);
  });
  const max = Math.max(...Array.from(letterFreq.values()));
  const min = Math.min(...Array.from(letterFreq.values()));
  return { max, min, difference: max - min }; // difference = 2602
};
export const runPolymerization = (
  startingPolymer: SinglyLinkedList<string>,
  instructions: Map<string, Map<string, string>>
) => {
  let current = startingPolymer.head;
  while (current?.next) {
    const before = current.value;
    const after = current.next.value;
    const middle = instructions.get(before)?.get(after);
    if (middle) {
      const node = { value: middle, next: current.next };
      current.next = node;
      current = node.next;
    } else {
      current = current.next;
    }
  }
};

if (require.main === module) {
  solve(10).then((result) => {
    console.log(result);
  });
}
