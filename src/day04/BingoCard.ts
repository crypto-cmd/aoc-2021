const MARKED = "X";
type BingoCardCoordinate = [row: number, column: number];
/***
 * A data structure which holds the numbers on a bingo card in a matrix or 2d Array form. It has the assumption that a board has uniques numbers.
 * 
 */
export class BingoCard {
  private readonly numbers: (number | typeof MARKED)[][] = [];
  private readonly coords: Map<number, BingoCardCoordinate> = new Map(); // Speed up marking by using a map
  private id: number = 0;
  constructor(numbers: number[], private lengthOfRow: number) {
    for (let i = 0; i < numbers.length; i++) {
      const row = Math.floor(i / lengthOfRow);
      const column = i % lengthOfRow;
      if (!this.numbers[row]) {
        this.numbers[row] = [];
      }
      this.numbers[row][column] = numbers[i];
      this.coords.set(numbers[i], [row, column]);
    }
  }
  setId(id: number) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
  place(number: number) {
    const coord = this.coords.get(number);
    if (coord) {
      this.numbers[coord[0]][coord[1]] = MARKED;
    }
  }
  getUnMarkedNumbers() {
    return this.numbers.reduce((acc, row) => {
      return [...acc, ...row.filter((n) => n !== MARKED)];
    }, [] as number[]) as number[];
  }
  /**
   * Checks if the card has a winning row or column
   */
  won(): boolean {
    return this.checkRows() || this.checkColumns();
  }
  private checkRows(): boolean {
    for (const row of this.numbers) {
      if (row.every((n) => n === "X")) {
        return true;
      }
    }
    return false;
  }
  private checkColumns(): boolean {
    for (let i = 0; i < this.lengthOfRow; i++) {
      const column = this.numbers.map((row) => row[i]);
      if (column.every((n) => n === "X")) {
        return true;
      }
    }
    return false;
  }
}
