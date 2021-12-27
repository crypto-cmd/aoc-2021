import { ColourCodedGridCell } from "../lib/ColourCodedGridCell";
import { Grid, GridCoordinate } from "../lib/Grid";
import { readLines } from "../lib/utils";

export class GridCell extends ColourCodedGridCell {
  constructor(data: number = 2) {
    super(2, true, data);
  }
  get value(): number {
    return this.data;
  }
  set value(value: number) {
    this.data = value;
  }
}
export const getInputs = async () => {
  const lines = await readLines("./src/day13/input.txt");
  const {
    data: [points, folds],
  } = lines.reduce(
    (acc: { data: [string[], string[]]; index: number }, line) => {
      if (line === "") {
        acc.index++;
        return acc;
      }
      acc.data[acc.index].push(line);
      return acc;
    },
    { data: [[], []], index: 0 }
  );
  return { points, folds: folds.map((f) => f.split(" ").pop()) as string[] };
};
const solve = async () => {
  const { points, folds } = await getInputs();
  const grid = new Grid<GridCell>();
  points.forEach((point) => {
    const [x, y] = point.split(",").map(Number);
    // rows are y, columns are x
    grid.set(Grid.parseArrayToCoordinate([y, x]), new GridCell());
  });

  const [foldAxis, line] = folds[0]?.split("=") || [];
  const folded = fold(grid, foldAxis as "x" | "y", Number(line));
  return folded.size(); // 706
};
export const fold = (
  grid: Grid<GridCell>,
  foldAxis: "x" | "y",
  foldLine: number
) => {
  const onCorrectSideOfFold = (coordinate: GridCoordinate) => {
    const [row, col] = Grid.parseCoordinateToArray(coordinate);
    return foldAxis === "x" ? col < foldLine : row < foldLine;
  };
  const translateCoordinate = (coordinate: GridCoordinate) => {
    const [row, col] = Grid.parseCoordinateToArray(coordinate);
    if (foldAxis === "x") {
      // folding along a column
      return Grid.parseArrayToCoordinate([
        row,
        foldLine - Math.abs(col - foldLine),
      ]);
    }
    return Grid.parseArrayToCoordinate([
      foldLine - Math.abs(row - foldLine),
      col,
    ]);
  };
  const folded = new Grid<GridCell>();
  grid.forEach((value, key) => {
    if (onCorrectSideOfFold(key)) {
      folded.set(key, value);
    } else {
      folded.set(translateCoordinate(key), value);
    }
  });
  return folded;
};
if (require.main === module) {
  solve().then((result) => console.log(result));
}
