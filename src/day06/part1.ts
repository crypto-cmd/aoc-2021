import { readLines } from "../lib/utils";
import { LanternFishSchool, Timer } from "./LanternFishSchool";

export const getInput = async () => {
  const line = (await readLines("./src/day06/input.txt"))[0];
  const timers = line.split(",").map(Number);
  return timers as Timer[];
};
export const solve = async (days:number=80) => {
  const timers = await getInput();
  const fishes = new LanternFishSchool();
  timers.forEach((t) => fishes.add(t));
  fishes.log();
  for (let i = 1; i <= days; i++) {
    fishes.tick();
  }
  fishes.log(); // 359999
};
if (require.main === module) {
  solve().then(console.log).catch(console.error);
}
