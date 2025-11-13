import Coordinate from "./Coordinate";
import Geometry from "./Geometry";
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


    private writePoint(point: Point): string {
        if (point.isEmpty()) {
            return "Point empty";
        }
        return `Point(${point.x()} ${point.y()})`;
    }

    private writeLineString(lineString: LineString): string {
        if (lineString.isEmpty()) {
            return "LineString empty";
        }

        const coordinates: string[] = [];
        for (let i = 0; i < lineString.getNumPoints(); i++) {
            const point = lineString.getPointN(i);
            coordinates.push(`${point.x()} ${point.y()}`);
        }

        return `LineString(${coordinates.join(",")})`;
    }

}