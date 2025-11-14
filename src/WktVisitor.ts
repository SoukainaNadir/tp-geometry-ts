import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";
import Coordinate from "./Coordinate";

export default class WktVisitor implements GeometryVisitor {
    private buffer: string;

    constructor() {
        this.buffer = "";
    }

    private formatCoordinate(coordinate: Coordinate): string {
        return coordinate.join(' ');
    }

    visitPoint(point: Point): void {
        if (point.isEmpty()) {
            this.buffer += "POINT EMPTY";
        } else {
            this.buffer += `POINT(${this.formatCoordinate(point.getCoordinate())})`;
        }
    }

    visitLineString(lineString: LineString): void {
        if (lineString.isEmpty()) {
            this.buffer += "LINESTRING EMPTY";
        } else {
            const coordinates: string[] = [];
            for (let i = 0; i < lineString.getNumPoints(); i++) {
                const point = lineString.getPointN(i);
                coordinates.push(this.formatCoordinate(point.getCoordinate()));
            }
            this.buffer += `LINESTRING(${coordinates.join(",")})`;
        }
    }

    getResult(): string {
        return this.buffer;
    }
}