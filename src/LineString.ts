import Geometry from "./Geometry";
import Point from "./Point";

export default class LineString implements Geometry {
  private points: Point[];

  constructor(points?: Point[]) {
    this.points = points ?? [];
  }

  getNumPoints(): number {
    return this.points.length;
  }

  getPointN(n: number): Point {
    if (n < 0 || n >= this.points.length) {
      throw new Error(`Index out of bounds: ${n}`);
    }
    return this.points[n];
  }

  getType(): string {
    return this.constructor.name;
  }
}