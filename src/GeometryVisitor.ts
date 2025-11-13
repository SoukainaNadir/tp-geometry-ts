import LineString from "./LineString";
import Point from "./Point";

export default interface GeometryVisitor {
    visitPoint(point: Point): void;
    visitLineString(lineString: LineString): void;
}