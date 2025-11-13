import "mocha";
import { expect } from "chai";
import WktWriter from "../src/WktWriter";
import Point from "../src/Point";
import LineString from "../src/LineString";
import Geometry from "../src/Geometry";

describe("test WktWriter", () => {
    let writer: WktWriter;

    beforeEach(() => {
        writer = new WktWriter();
    })

    it("test write empty point", () => {
        const point = new Point();
        expect(writer.write(point)).to.equal("Point empty");
    });

    it("test write point with coordinates", () => {
        const point = new Point([3.0, 4.0]);
        expect(writer.write(point)).to.equal("Point(3 4)");
    });

    it("test write empty linestring", () => {
        const lineString = new LineString();
        expect(writer.write(lineString)).to.equal("LineString empty");
    });

    it("test write linestring with points", () => {
        const p1 = new Point([0.0, 0.0]);
        const p2 = new Point([1.0, 1.0]);
        const p3 = new Point([5.0, 5.0]);
        const lineString = new LineString([p1, p2, p3]);

        expect(writer.write(lineString)).to.equal("LineString(0 0,1 1,5 5)");
    });

    it("test write unsupported geometry type", () => {
        class UnsupportedGeometry implements Geometry {
            getType(): string { return "Unsupported"; }
            isEmpty(): boolean { return false; }
            translate(dx: number, dy: number): void { }
            clone(): Geometry { return this; }
            getEnvelope(): any { return null; }
        }

        const unsupported = new UnsupportedGeometry();
        expect(() => writer.write(unsupported)).to.throw(TypeError, "Geometry type not supported");
    });
});