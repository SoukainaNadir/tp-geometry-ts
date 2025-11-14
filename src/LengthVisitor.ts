import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";
import GeometryCollection from "./GeometryCollection";

export default class LengthVisitor implements GeometryVisitor<number> {

  visitPoint(point: Point): number {
    return 0.0;
  }

  visitLineString(line: LineString): number {
    if (line.isEmpty()) return 0.0;

    let length = 0.0;
    for (let i = 1; i < line.getNumPoints(); i++) {
      const [x1, y1] = line.getPointN(i - 1).getCoordinate();
      const [x2, y2] = line.getPointN(i).getCoordinate();
      const dx = x2 - x1;
      const dy = y2 - y1;
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
  }

  visitGeometryCollection(gc: GeometryCollection): number {
    let total = 0.0;
    for (let i = 0; i < gc.getNumGeometries(); i++) {
      const g = gc.getGeometryN(i);
      total += g.accept(this);  
    }
    return total;
  }
}
