import { OceanFloor } from "./OceanFloor";
import { getInput } from "./part1";

const solve = async () => {
  const floor: OceanFloor = new OceanFloor();
  const points = await getInput();
  points.forEach(([p1, p2]) => {
    floor.addVentsLinearly(p1, p2);
    floor.addVentsDiagonally(p1, p2);
  });
  return floor.getOverlappingVentCount(); //22083
};
if (require.main === module) {
  solve().then((result) => {
    console.log("Result:", result);
  });
}
