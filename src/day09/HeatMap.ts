import { HeatMapCell } from "./HeatMapCell";
import chalk from "chalk";
import tinycolor from "tinycolor2";
type Position = `${string},${string}`;

const getColor = (depth: number): string => {
  const baseBlue = "#000080";
  return tinycolor(baseBlue)
    .lighten(depth *8)
    .toString("hex");
};
export class HeatMap {
  private rows: number = 0;
  private columns: number = 0;
  cells = new Map<Position, HeatMapCell>();
  addCell(cell: HeatMapCell) {
    this.rows = Math.max(this.rows, cell.row);
    this.columns = Math.max(this.columns, cell.column);
    this.cells.set(`${cell.row},${cell.column}`, cell);
  }
  getCell(row: number, column: number): HeatMapCell | undefined {
    return this.cells.get(`${row},${column}`);
  }
  print() {
    for (let row = 0; row <= this.rows; row++) {
      let rowString = "";
      for (let column = 0; column <= this.columns; column++) {
        const cell = this.getCell(row, column);
        rowString += chalk.bgHex(getColor(Number(cell?.value))).black(` ${cell?.value} `);
      }
      console.log(rowString);
    }
  }
  calculateNeighbors() {
    this.cells.forEach((cell) => {
      const neighbors = this.getNeighbors(cell.row, cell.column);
      cell.neighbors = neighbors;
    });
  }
  forEach(
    callback: (
      row: number,
      column: number,
      depth: number,
      neighbors: HeatMapCell[]
    ) => void
  ) {
    this.cells.forEach((cell) => {
      callback(cell.row, cell.column, cell.value, cell.neighbors);
    });
  }
  getNeighbors(row: number, column: number): HeatMapCell[] {
    return [
      this.getCell(row + 1, column),
      this.getCell(row - 1, column),
      this.getCell(row, column + 1),
      this.getCell(row, column - 1),
    ].filter((cell) => cell ?? false) as HeatMapCell[];

  }
}
