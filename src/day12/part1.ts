import { Graph } from "../lib/Graph";
import { readLines } from "../lib/utils";

export const getInputs = async () => {
  const lines = await readLines("./src/day12/input.txt");
  return lines.map((line) => line.split("-"));
};
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
    if (id.toLowerCase() === id && path.includes(id)) return false;
    return true;
  });
  return paths.length; // 3497
};
export const traverse = (
  graph: Graph<string, string>,
  startNodeId: string,
  endNodeId: string,
  paths: string[][],
  isValidNextNode: (id: string, path: string[]) => boolean,
  path:string[] = []
) => {
  const startNode = graph.data.get(startNodeId);
  if (!startNode) return;
  path.push(startNodeId);
  const nextNodes = graph.connections.get(startNodeId);
  if (!nextNodes) return;
  nextNodes.forEach((nextNodeId) => {
    if (nextNodeId === endNodeId) {
      paths.push(path.concat(nextNodeId));
    } else {
      if (!isValidNextNode(nextNodeId, path)) return;
      traverse(graph, nextNodeId, endNodeId, paths, isValidNextNode, path);
    }
  });
  path.pop();
};

if (require.main === module) {
  solve().then((result) => {
    console.log(result);
  });
}
