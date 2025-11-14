import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";
import GeometryCollection from "./GeometryCollection";
import Coordinate from "./Coordinate";

export default class WktVisitor implements GeometryVisitor<void> {
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

    visitGeometryCollection(geometryCollection: GeometryCollection): void {
        if (geometryCollection.isEmpty()) {
            this.buffer += "GEOMETRYCOLLECTION EMPTY";
        } else {
            const wkts: string[] = [];
            for (let i = 0; i < geometryCollection.getNumGeometries(); i++) {
                const geometry = geometryCollection.getGeometryN(i);
                const visitor = new WktVisitor();
                geometry.accept(visitor);
                wkts.push(visitor.getResult());
            }
            this.buffer += `GEOMETRYCOLLECTION(${wkts.join(",")})`;
        }
    }

    getResult(): string {
        return this.buffer;
    }
}