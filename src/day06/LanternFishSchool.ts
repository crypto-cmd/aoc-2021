export type Timer = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export class LanternFishSchool {
  private fishes:number[] = new Array(9).fill(0);
  add(timer: Timer) {
    this.fishes[timer]++;
  }
  tick() {
    const newFishes = new Array(9).fill(0);
    this.fishes.forEach((numFishes, timer) => {
      if (timer === 0) {
        newFishes[8] += numFishes;
        newFishes[6] += numFishes;
      }
      else {
        newFishes[timer - 1] += numFishes;
      }
    });
    this.fishes = newFishes;
  }
  log() {
    console.log(this.fishes.join(' '));
    // Print the sum of fishes
    console.log(this.fishes.reduce((a, b) => a + b, 0));
  }
}
