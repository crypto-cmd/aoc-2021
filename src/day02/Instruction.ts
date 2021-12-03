export enum Direction {
  Forward = "forward",
  UP = "up",
  DOWN = "down",
}
export type Instruction = { direction: Direction, steps: number };