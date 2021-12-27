import tinycolor from "tinycolor2";
import chalk from "chalk";
const baseColour = "#000080";
export class ColourCodedGridCell implements ValueAble<number> {
  constructor(
    public readonly maxValue: number,
    public readonly isMaxDark: boolean,
    public data: number
  ) {}

  get value() {
    return this.data;
  }
  set value(value: number) {
    this.data = value;
  }

  getColor() {
    const percent = (this.value ** 2 / this.maxValue ** 2) * 100;
    if (this.isMaxDark) {
      return tinycolor(baseColour).lighten(percent).toString();
    }

    return tinycolor(baseColour)
      .lighten(100 - percent)
      .toString("hex");
  }
  toString() {
    return chalk.bgHex(this.getColor()).red(` ${this.value} `);
  }
}
