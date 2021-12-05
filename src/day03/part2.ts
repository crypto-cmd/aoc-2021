import { readLines } from "../lib/utils";
import { toDecimal } from "./part1";
import { isNonExistent, RootNode, Tree, TreeNode } from "./Tree";

const traverseForMax = async (
  node: TreeNode | RootNode,
  maxes: string[] = []
): Promise<string[]> => {
  if (isNonExistent(node)) {
    return maxes;
  }
  if (node.ones.numChildren >= node.zeroes.numChildren) {
    return traverseForMax(node.ones, [...maxes, "1"]);
  }
  return traverseForMax(node.zeroes, [...maxes, "0"]);
};
const traverseForMin = async (
  node: TreeNode | RootNode,
  mins: string[] = []
): Promise<string[]> => {
  if (isNonExistent(node)) return mins;

  if (
    (node.ones?.numChildren ?? Infinity) >=
    (node.zeroes?.numChildren ?? Infinity)
  ) {
    return traverseForMin(node.zeroes, [...mins, "0"]);
  } else {
    return traverseForMin(node.ones, [...mins, "1"]);
  }
};
const solution = async () => {
  const lines = await readLines("./src/day03/input.txt");
  const tree = new Tree();
  lines.forEach((line) => {
    tree.add(line);
  });
  const oxygenBinary = await traverseForMax(tree.root);
  const oxygen = toDecimal(oxygenBinary.map(Number));
  const co2Binary = await traverseForMin(tree.root);
  const co2 = toDecimal(co2Binary.map(Number));
  return oxygen * co2; // 2990784
};
if (require.main === module) {
  (async () => {
    console.log(await solution());
  })();
}
