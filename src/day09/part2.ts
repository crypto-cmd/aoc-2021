import { HeatMapCell } from "./HeatMapCell";
import { getInputs, initHeatMap } from "./part1";

const solve = async () => {
  const input = await getInputs();
  const heatMap = await initHeatMap(input);

  const seen = new Set<string>();
  const sizes: number[] = [];
  heatMap.forEach((row, column, depth, neighbours) => {
    const size = floodfill(row, column, depth, neighbours, seen);
    if (size > 0) sizes.push(size);
  });
  sizes.sort((a, b) => b - a);
  return sizes[0] * sizes[1] * sizes[2]; // 856716
};
const floodfill = (
  row: number,
  column: number,
  depth: number,
  neighbours: HeatMapCell[],
  seen: Set<string>
) => {
  const key = `${row},${column}`;
  if (seen.has(key)) return 0; // already seen
  if (depth == 9) return 0; // Not a basin
  seen.add(key);
  let size = 1; // include this cell
  neighbours.forEach(async (neighbour) => {
    size +=  floodfill(
      neighbour.row,
      neighbour.column,
      neighbour.value,
      neighbour.neighbors,
      seen
    );
  });
  return size;
};

if (require.main === module) {
  (async () => {
    console.log(await solve());
  })();
}
