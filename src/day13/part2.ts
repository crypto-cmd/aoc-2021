import { Grid } from "../lib/Grid";
import { getInputs, fold, GridCell } from "./part1";

const solve = async () => {
  const { points, folds } = await getInputs();
  const grid = new Grid<GridCell>();
  points.forEach((point) => {
    const [x, y] = point.split(",").map(Number);
    // rows are y, columns are x
    grid.set(Grid.parseArrayToCoordinate([y, x]), new GridCell());
  });

  const folded = folds.reduce((foldedGrid, _fold) => {
    const [foldAxis, line] = _fold.split("=");
    return fold(foldedGrid, foldAxis as "x" | "y", Number(line));
  }, grid);

  for (let i = 0; i < folded.getNumRows(); i++) {
    for (let j = 0; j < folded.getNumColumns(); j++) {
      const cell = folded.get(Grid.parseArrayToCoordinate([i, j]));
      if (!cell) {
        folded.set(Grid.parseArrayToCoordinate([i, j]), new GridCell(0));
      }
    }
  }
  folded.print();
};

if (require.main === module) {
  (async () => {
    console.log(await solve());
  })();
}
