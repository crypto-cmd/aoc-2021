import { Grid } from "../lib/Grid";
import { Octopus } from "./Octopus";
import { getInputs, simulate } from "./part1";

const solve = async () => {
  const input = await getInputs();
  let grid = new Grid<Octopus>();
  input.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      grid.set(`${rowIndex},${columnIndex}`, new Octopus(value));
    });
  });
  let numSimulations = 0;
  while (!grid.every((octopus) => octopus.value == 0)) {
    grid = simulate(grid, () => null);
    numSimulations++;
  }
  grid.print();
  return numSimulations; // 510
};
if(require.main === module) {
  (async () => {
    console.log(await solve());
  })();
}