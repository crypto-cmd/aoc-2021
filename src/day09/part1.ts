import { readLines } from "../lib/utils";
import { HeatMap } from "./HeatMap";
import { HeatMapCell } from "./HeatMapCell";

export const getInputs = async () => {
  const rows = await readLines("./src/day09/input.txt");
  return rows.map((row) => row.split("").map(Number));
};

export const initHeatMap = async (depths:number[][]) => {
  const heatMap = new HeatMap();
  depths.forEach((row, rowIndex) => {
    row.forEach((depth, columnIndex) => {
      heatMap.addCell(new HeatMapCell(rowIndex, columnIndex, depth));
    });
  });
  heatMap.calculateNeighbors();
  return heatMap;
}

const solve = async () => {
  const depths = await getInputs();
  const heatMap = await initHeatMap(depths);
  let riskLevel = 0;
  heatMap.forEach((_row, _column, depth, neighbours) => {
    const minNeighbour = neighbours.reduce(
      (min, cell) => Math.min(min, cell.value),
      Infinity
    );
    if (minNeighbour <= depth) return;
    riskLevel += depth + 1;
  });
  return riskLevel; // 580
};

if (require.main === module) {
  (async () => {
    console.log(await solve());
  })();
}
