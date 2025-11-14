import Coordinate from "./Coordinate";
import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";
import Interval from "./Interval";
import LineString from "./LineString";
import Point from "./Point";

export default class EnvelopeBuilder implements GeometryVisitor {
  private _intervals: Interval[] = [];

  insert(coordinate: Coordinate): void {
    if (coordinate === undefined) {
      return;
    }

    for (let i = 0; i < coordinate.length; i++) {
      if (!this._intervals[i]) {
        this._intervals[i] = new Interval();
      }
      this._intervals[i].insert(coordinate[i]);
    }
  }

  build(): Envelope {
    if (this._intervals.length < 2 || this._intervals[0].isEmpty() || this._intervals[1].isEmpty()) {
      throw new Error("Cannot build envelope with no coordinates");
    }

    const bottomLeft = [this._intervals[0].getMin(), this._intervals[1].getMin()];
    const topRight = [this._intervals[0].getMax(), this._intervals[1].getMax()];
    return new Envelope(bottomLeft, topRight);
  }
  
  visitPoint(point: Point): void {
    if (!point.isEmpty()) {
      this.insert(point.getCoordinate());
    }
  }

  visitLineString(lineString: LineString): void {
    for (let i = 0; i < lineString.getNumPoints(); i++) {
      const point = lineString.getPointN(i);
      this.insert(point.getCoordinate());
    }
  }
}