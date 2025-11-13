import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default class EnvelopeBuilder {
  private xMin?: number;
  private yMin?: number;
  private xMax?: number;
  private yMax?: number;

  constructor() {
    this.xMin = undefined;
    this.yMin = undefined;
    this.xMax = undefined;
    this.yMax = undefined;
  }

  insert(coordinate: Coordinate): void {
    const x = coordinate[0];
    const y = coordinate[1];

    if (this.xMin === undefined) {
      this.xMin = x;
      this.xMax = x;
      this.yMin = y;
      this.yMax = y;
    } else {
      if (x < this.xMin) this.xMin = x;
      if (x > this.xMax) this.xMax = x;
      if (y < this.yMin) this.yMin = y;
      if (y > this.yMax) this.yMax = y;
    }
  }

  build(): Envelope {
    if (this.xMin === undefined) {
      throw new Error("Cannot build envelope with no coordinates");
    }
    return new Envelope([this.xMin, this.yMin!], [this.xMax!, this.yMax!]);
  }
}