import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

export default class WktVisitor implements GeometryVisitor {
    private buffer : string;

    constructor() {
        this.buffer = "";
    }

    visitPoint(point: Point): void {
        if (point.isEmpty()) {
            this.buffer += "POINT EMPTY";
        }
        else {
            this.buffer += `POINT(${point.x()} ${point.y()})`;
        }
    }

    visitLineString(lineString: LineString): void {
        if (lineString.isEmpty()) {
            this.buffer += "LINESTRING EMPTY";
        }
        else {
            const coordinates: string[] = [];
            for (let i = 0; i < lineString.getNumPoints(); i++) {
                const point = lineString.getPointN(i);
                coordinates.push(`${point.x()} ${point.y()}`);
            }
            this.buffer += `LINESTRING(${coordinates.join(",")})`;
        }
    }

    getResult(): string {
        return this.buffer;
    }

}
