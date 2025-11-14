import Coordinate from "./Coordinate";
import Geometry from "./Geometry";
import GeometryCollection from "./GeometryCollection";
import LineString from "./LineString";
import Point from "./Point";

export default class WktWriter {
    write(geometry: Geometry): string {
        if (geometry instanceof Point) {
            return this.writePoint(geometry);
        } else if (geometry instanceof LineString) {
            return this.writeLineString(geometry);
        } else {
            throw new TypeError("Geometry type not supported");
        }
    }


    private formatCoordinate(coordinate: Coordinate): string {
        return coordinate.join(' ');
    }

    private writePoint(point: Point): string {
        if (point.isEmpty()) {
            return "Point empty";
        }
        return `Point(${this.formatCoordinate(point.getCoordinate())})`;
    }

    private writeLineString(lineString: LineString): string {
        if (lineString.isEmpty()) {
            return "LineString empty";
        }
        const coordinates: string[] = [];
        for (let i = 0; i < lineString.getNumPoints(); i++) {
            const point = lineString.getPointN(i);
            coordinates.push(this.formatCoordinate(point.getCoordinate()));
        }
        return `LineString(${coordinates.join(",")})`;
    }

}