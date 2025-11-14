import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import WktVisitor from "../src/WktVisitor";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";

describe("test WktVisitor", () => {
    let visitor: WktVisitor;

    beforeEach(() => {
        visitor = new WktVisitor();
    });

    it("test visit empty point", () => {
        const point = new Point();
        point.accept(visitor);
        expect(visitor.getResult()).to.equal("POINT EMPTY");
    });

    it("test visit point with coordinates", () => {
        const point = new Point([2.0, 3.0]);
        point.accept(visitor);
        expect(visitor.getResult()).to.equal("POINT(2 3)");
    });

    it("test visit empty lineString", () => {
        const lineString = new LineString();
        lineString.accept(visitor);
        expect(visitor.getResult()).to.equal("LINESTRING EMPTY");
    });

    it("test visit lineString with coordinates", () => {
        const p1 = new Point([0.0, 0.0]);
        const p2 = new Point([1.0, 1.0]);
        const p3 = new Point([2.0, 2.0]);
        const lineString = new LineString([p1, p2, p3]);
        lineString.accept(visitor);
        expect(visitor.getResult()).to.equal("LINESTRING(0 0,1 1,2 2)");
    });

    it("test visit empty geometryCollection", () => {
        const collection = new GeometryCollection();
        collection.accept(visitor);
        expect(visitor.getResult()).to.equal("GEOMETRYCOLLECTION EMPTY");
    });

    it("test visit geometryCollection with geometries", () => {
        const point = new Point([3.0, 4.0]);
        const lineString = new LineString([
            new Point([0.0, 0.0]),
            new Point([1.0, 1.0])
        ]);
        const collection = new GeometryCollection([point, lineString]);
        collection.accept(visitor);
        expect(visitor.getResult()).to.equal("GEOMETRYCOLLECTION(POINT(3 4),LINESTRING(0 0,1 1))");
    });
});