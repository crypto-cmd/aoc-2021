import { Grid, GridCoordinate } from "../lib/Grid";
import { readLines } from "../lib/utils";
import { Octopus } from "./Octopus";

export const getInputs = async () => {
  const lines = await readLines("./src/day11/input.txt");
  return lines.map((line) => line.trim().split("").map(Number));
};
const solve = async () => {
  const input = await getInputs();
  let grid = new Grid<Octopus>();
  input.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      grid.set(`${rowIndex},${columnIndex}`, new Octopus(value));
    });
  });
  grid.print();
  let numSimulations = 100;
  let numFlashs = 0;
  for (let i = 1; i <= numSimulations; i++) {
    grid = simulate(grid, () => {
      numFlashs++;
    });
  }
  return numFlashs; // 1613
};
export const simulate = (grid: Grid<Octopus>, onFlash: () => void) => {
  const hasFlashedBefore = new Set<GridCoordinate>();
  // First, all octopuses energy increases by 1
  grid.forEach((octopus) => {
    octopus.increaseEnergy();
  });

  // any octopus with an energy level greater than 9 flashes. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than 9, it also flashes. This process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)
  const copy = grid.copy();
  grid.forEach((octopus, coordinate) => {
    if (octopus.energy > 9) {
      flash(copy, coordinate, hasFlashedBefore, onFlash);
    }
  });
  return copy;
};
export const flash = (
  grid: Grid<Octopus>,
  coordinates: GridCoordinate,
  hasFlashedBefore: Set<GridCoordinate>,
  onFlash: () => void
) => {
  const currentOctopus = grid.get(coordinates);
  if (hasFlashedBefore.has(coordinates)) return;
  if (!currentOctopus) return;
  currentOctopus.energy = 0;
  onFlash();
  hasFlashedBefore.add(coordinates);
  grid.getAllNeighbors(coordinates).forEach((neighborCoordinate) => {
    const neighbor = grid.get(neighborCoordinate);
    if (neighbor && !hasFlashedBefore.has(neighborCoordinate)) {
      neighbor.increaseEnergy();
      if (neighbor.energy > 9) {
        flash(grid, neighborCoordinate, hasFlashedBefore, onFlash);
      }
    }
  });
};

if (require.main === module) {
  (async () => {
    console.log(await solve());
  })();
}
