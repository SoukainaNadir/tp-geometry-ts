import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";
import GeometryCollection from "./GeometryCollection";

export default class LogGeometryVisitor implements GeometryVisitor {
    constructor(private log = console.log) { }

    visitPoint(point: Point): void {
        if (point.isEmpty()) {
            this.log("Je suis un point vide.");
        } else {
            this.log(`Je suis un point avec x=${point.x()} et y=${point.y()}.`);
        }
    }

    visitLineString(lineString: LineString): void {
        if (lineString.isEmpty()) {
            this.log("Je suis une polyligne vide.");
        } else {
            this.log(`Je suis une polyligne définie par ${lineString.getNumPoints()} point(s).`);
        }
    }

    visitGeometryCollection(geometryCollection: GeometryCollection): void {
        this.log(`Je suis une GeometryCollection avec ${geometryCollection.getNumGeometries()} géométries.`);
    }
}