import Coordinate from "./Coordinate";
import AbstractGeometry from "./AbstractGeometry";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";

export default class Point extends AbstractGeometry {
  private coordinate?: Coordinate;

  constructor(coordinate?: Coordinate) {
    super();
    this.coordinate = coordinate;
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  x(): number {
    return this.coordinate ? this.coordinate[0] : Number.NaN;
  }

  y(): number {
    return this.coordinate ? this.coordinate[1] : Number.NaN;
  }

  getType(): string {
    return this.constructor.name;
  }

  isEmpty(): boolean {
    return this.coordinate === undefined;
  }

  translate(dx: number, dy: number): void {
    if (this.coordinate !== undefined) {
      this.coordinate[0] += dx;
      this.coordinate[1] += dy;
    }
  }

  clone(): Point {
    if (this.coordinate === undefined) {
      return new Point();
    }
    return new Point([this.coordinate[0], this.coordinate[1]]);
  }

  accept<T>(visitor: GeometryVisitor<T>): T {
    return visitor.visitPoint(this);
  }
}