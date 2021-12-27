import { ColourCodedGridCell } from "../lib/ColourCodedGridCell";
import { CopyAble } from "../lib/CopyAble";

export class Octopus extends ColourCodedGridCell implements CopyAble<Octopus> {
  constructor(public energy: number) {
    super(9, true, energy);
  }
  get value(): number {
    return this.energy;
  }
  set value(value: number) {
    this.energy = value;
  }
  increaseEnergy() {
    this.energy++;
    this.value = this.energy;
  }
  copy(): Octopus {
    return new Octopus(this.energy);
  }
}
