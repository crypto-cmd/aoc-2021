import { Point } from "./Point";

export class OceanFloor {
  private vents: Map<string, number> = new Map();
  private maxX: number = 0;
  private maxY: number = 0;
  addVentsLinearly(pointA: Point, pointB: Point): void {
    if (!(pointA.getX() === pointB.getX() || pointA.getY() === pointB.getY()))
      return;
    // Make sure pointA is always the leftmost or topmost point
    if (pointA.getX() > pointB.getX() || pointA.getY() > pointB.getY()) {
      [pointA, pointB] = [pointB, pointA];
    }
    for (let i = pointA.getX(); i <= pointB.getX(); i++) {
      for (let j = pointA.getY(); j <= pointB.getY(); j++) {
        this.addVent(new Point(i, j));
      }
    }
  }
  addVent(point: Point): void {
    this.maxX = Math.max(this.maxX, point.getX());
    this.maxY = Math.max(this.maxY, point.getY());
    this.vents.set(
      point.toString(),
      (this.vents.get(point.toString()) ?? 0) + 1
    );
  }
  addVentsDiagonally(pointA: Point, pointB: Point): void {
    if (pointA.getX() === pointB.getX() || pointA.getY() === pointB.getY()) return;
    // pointA(9,7) -> Point(7,9)
    let delta = Math.abs(pointA.getX() - pointB.getX());
    let dx = pointA.getX() < pointB.getX() ? 1 : -1;
    let dy = pointA.getY() < pointB.getY() ? 1 : -1;
    let newPoint = new Point(pointA.getX(), pointA.getY());
    for (let i = 0; i <= Math.abs(delta); i++) {
      this.addVent(newPoint);
      newPoint = new Point(newPoint.getX() + dx, newPoint.getY() + dy);
    }
  }

  getOverlappingVentCount(): number {
    return [...this.vents.values()].filter((v) => v > 1).length;
  }
  print(): void {
    for (let i = 0; i <= this.maxY; i++) {
      for (let j = 0; j <= this.maxX; j++) {
        const point = new Point(j, i);
        process.stdout.write(String(
          Number(this.vents.get(point.toString())) || "."));
      }
      process.stdout.write("\n");
    }
  }
}
