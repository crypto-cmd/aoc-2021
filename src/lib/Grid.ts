import { ColourCodedGridCell } from "./ColourCodedGridCell";
import { isCopyAble } from "./CopyAble";
export type GridCoordinate = `${number},${number}`;
export class Grid<T> {
  private data: Map<GridCoordinate, T> = new Map();
  private rows: number = 0;
  private columns: number = 0;
  get(coordinates: GridCoordinate): T | undefined {
    return this.data.get(coordinates);
  }
  set(coordinates: GridCoordinate, value: T): void {
    this.data.set(coordinates, value);
    const [row, column] = coordinates.split(",").map(Number);
    this.rows = Math.max(this.rows, row);
    this.columns = Math.max(this.columns, column);
  }
  has(coordinates: GridCoordinate): boolean {
    return this.data.has(coordinates);
  }
  delete(coordinates: GridCoordinate): void {
    this.data.delete(coordinates);
  }
  clear(): void {
    this.data.clear();
  }
  size(): number {
    return this.data.size;
  }
  getCardinalNeighbors(coordinates: GridCoordinate): GridCoordinate[] {
    const neighbours: GridCoordinate[] = [];
    const [x, y] = coordinates.split(",").map(Number);
    neighbours.push(`${x - 1},${y}`);
    neighbours.push(`${x + 1},${y}`);
    neighbours.push(`${x},${y - 1}`);
    neighbours.push(`${x},${y + 1}`);
    return neighbours.filter((coordinate) => this.has(coordinate));
  }
  getIntercardinalNeighbors(coordinates: GridCoordinate): GridCoordinate[] {
    const neighbours: GridCoordinate[] = [];
    const [x, y] = coordinates.split(",").map(Number);
    neighbours.push(`${x - 1},${y - 1}`);
    neighbours.push(`${x + 1},${y - 1}`);
    neighbours.push(`${x - 1},${y + 1}`);
    neighbours.push(`${x + 1},${y + 1}`);
    return neighbours.filter((coordinate) => this.has(coordinate));
  }
  getAllNeighbors(coordinates: GridCoordinate): GridCoordinate[] {
    return [
      ...this.getCardinalNeighbors(coordinates),
      ...this.getIntercardinalNeighbors(coordinates),
    ];
  }
  print() {
    console.log();
    for (let row = 0; row <= this.rows; row++) {
      let rowString = "";
      for (let column = 0; column <= this.columns; column++) {
        const value = this.get(`${row},${column}`);
        if (value instanceof ColourCodedGridCell) {
          rowString += `${value.toString()}`;
        } else {
          rowString += `${value ?? "*"}`;
        }
      }
      console.log(rowString);
    }
    console.log();
  }
  copy(): Grid<T> {
    const grid = new Grid<T>();
    this.data.forEach((value, key) => {
      grid.set(key, isCopyAble<T>(value) ? value.copy() : value);
    });
    return grid;
  }
  static parseCoordinateToArray(coordinate: GridCoordinate): [number, number] {
    return coordinate.split(",").map(Number) as [number, number];
  }
  static parseArrayToCoordinate([x, y]: [number, number]): GridCoordinate {
    return `${x},${y}`;
  }

  forEach(callback: (value: T, key: GridCoordinate) => void) {
    this.data.forEach((value, key) => callback(value, key));
  }
  every(callback: (value: T, key: GridCoordinate) => boolean) {
    return Array.from(this.data).every(([key, value]) => callback(value, key));
  }
  some(callback: (value: T, key: GridCoordinate) => boolean) {
    return Array.from(this.data).some(([key, value]) => callback(value, key));
  }
}
