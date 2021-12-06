import { readLines } from "../lib/utils";
import { OceanFloor } from "./OceanFloor";
import { Point } from "./Point";

export const getInput = async () => {
  const lines = await readLines("./src/day05/input.txt");
  return lines
    .map((line) => line.split("->"))
    .map(([pointA, pointB]) => {
      const [x1, y1] = pointA.split(",").map(Number);
      const [x2, y2] = pointB.split(",").map(Number);
      return [new Point(x1, y1), new Point(x2, y2)];
    });
};
const solve = async () => {
  const floor: OceanFloor = new OceanFloor();
  const points = await getInput();
  points.forEach(([p1, p2]) => {
    floor.addVentsLinearly(p1, p2);
  });
  return floor.getOverlappingVentCount(); // 5169
};
if (require.main === module) {
  solve().then((result) => {
    console.log("Result:", result);
  });
}
