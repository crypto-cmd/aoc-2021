import { Module } from "module";
import { Graph } from "../lib/Graph";
import { getInputs, traverse } from "./part1";

export const solve = async () => {
  const inputs = await getInputs();
  const graph = new Graph<string, string>();
  inputs.forEach((input) => {
    const [id1, id2] = input;
    graph.addNode(id1, id1);
    graph.addNode(id2, id2);
    graph.addBiDirectionalConnection(input[0], input[1]);
  });
  const startNodeId = "start";
  const endNodeId = "end";
  const paths: string[][] = [];
  traverse(graph, startNodeId, endNodeId, paths, (id, path) => {
    if (id === startNodeId) return false;
    if (id === endNodeId) return true;
    if (id.toLowerCase() === id) {
      const lowercases = path.filter((point) => point.toLowerCase() === point);
      const lowercaseSet = new Set(lowercases);
      const vistedASmallCaveTwice = lowercaseSet.size !== lowercases.length;
      if (!vistedASmallCaveTwice) return true;
      if (lowercaseSet.has(id)) return false;
    }
    return true;
  });
  return paths.length; // 93686
};

if (require.main === module) {
  solve().then(console.log)
}