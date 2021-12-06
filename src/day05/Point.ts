export class Point {
  constructor(private x: number, private y: number) { }
  getX() { return this.x; }
  getY() { return this.y; }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
