import "mocha";
import { expect } from "chai";
import GeometryCollection from "../src/GeometryCollection";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test GeometryCollection", () => {
    it("test constructor and methods", () => {
        const point = new Point([1.0, 2.0]);
        const lineString = new LineString([
            new Point([0.0, 0.0]),
            new Point([1.0, 1.0])
        ]);
        const collection = new GeometryCollection([point, lineString]);
        
        expect(collection.getType()).to.equal("GeometryCollection");
        expect(collection.getNumGeometries()).to.equal(2);
        expect(collection.isEmpty()).to.equal(false);
        expect(collection.getGeometryN(0)).to.equal(point);
    });

    it("test isEmpty with empty collection", () => {
        const collection = new GeometryCollection();
        expect(collection.isEmpty()).to.equal(true);
    });

    it("test translate", () => {
        const point = new Point([1.0, 2.0]);
        const collection = new GeometryCollection([point]);
        
        collection.translate(1.0, 1.0);
        
        expect(point.x()).to.equal(2.0);
        expect(point.y()).to.equal(3.0);
    });

    it("test clone", () => {
        const point = new Point([1.0, 2.0]);
        const collection = new GeometryCollection([point]);
        
        const cloned = collection.clone();
        
        collection.translate(1.0, 1.0);
        expect((cloned as GeometryCollection).getGeometryN(0).asText()).to.equal("POINT(1 2)");
    });

    it("test getEnvelope", () => {
        const point = new Point([3.0, 4.0]);
        const lineString = new LineString([
            new Point([0.0, 0.0]),
            new Point([2.0, 1.0])
        ]);
        const collection = new GeometryCollection([point, lineString]);
        
        const envelope = collection.getEnvelope();
        
        expect(envelope.getXmin()).to.equal(0.0);
        expect(envelope.getXmax()).to.equal(3.0);
    });

    it("test asText", () => {
        const point = new Point([3.0, 4.0]);
        const lineString = new LineString([
            new Point([0.0, 0.0]),
            new Point([1.0, 1.0])
        ]);
        const collection = new GeometryCollection([point, lineString]);
        
        expect(collection.asText()).to.equal("GEOMETRYCOLLECTION(POINT(3 4),LINESTRING(0 0,1 1))");
    });
});