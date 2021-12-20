export class HeatMapCell {
  public neighbors: HeatMapCell[]= [];
  constructor(public row: number, public column: number, public value: number) {}
}
