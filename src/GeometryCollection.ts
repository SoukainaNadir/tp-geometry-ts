import Coordinate from "./Coordinate";
import Geometry from "./Geometry";
import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";
import EnvelopeBuilder from "./EnvelopeBuilder";

export default class GeometryCollection implements Geometry {
    private geometries: Array<Geometry>;

    constructor(geometries: Array<Geometry> = []) {
        this.geometries = geometries;
    }

    getType(): string {
        return "GeometryCollection";
    }

    isEmpty(): boolean {
        if (this.geometries.length === 0) {
            return true;
        }
        return this.geometries.every(geometry => geometry.isEmpty());
    }

    translate(dx: number, dy: number): void {
        for (const geometry of this.geometries) {
            geometry.translate(dx, dy);
        }
    }

    clone(): Geometry {
        const clonedGeometries = this.geometries.map(geometry => geometry.clone());
        return new GeometryCollection(clonedGeometries);
    }

    getEnvelope(): Envelope {
        const builder = new EnvelopeBuilder();
        for (const geometry of this.geometries) {
            geometry.accept(builder);
        }
        return builder.build();
    }

    accept(visitor: GeometryVisitor): void {
        visitor.visitGeometryCollection(this);
    }

    asText(): string {
        if (this.isEmpty()) {
            return "GEOMETRYCOLLECTION EMPTY";
        }
        const wkts = this.geometries.map(geometry => geometry.asText());
        return `GEOMETRYCOLLECTION(${wkts.join(",")})`;
    }

    getNumGeometries(): number {
        return this.geometries.length;
    }

    getGeometryN(n: number): Geometry {
        return this.geometries[n];
    }
}