import "mocha";
import { expect } from "chai";
import LengthVisitor from "../src/LengthVisitor";
import Point from "../src/Point";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";

describe("test LengthVisitor", () => {
    it("test visit point returns 0", () => {
        const point = new Point([3.0, 4.0]);
        const visitor = new LengthVisitor();
        
        const result = point.accept(visitor);
        
        expect(result).to.equal(0.0);
    });

    it("test visit empty linestring returns 0", () => {
        const lineString = new LineString();
        const visitor = new LengthVisitor();
        
        const result = lineString.accept(visitor);
        
        expect(result).to.equal(0.0);
    });

    it("test visit linestring with one point returns 0", () => {
        const lineString = new LineString([new Point([0.0, 0.0])]);
        const visitor = new LengthVisitor();
        
        const result = lineString.accept(visitor);
        
        expect(result).to.equal(0.0);
    });

    it("test visit linestring calculates correct length", () => {
        const lineString = new LineString([
            new Point([0.0, 0.0]),
            new Point([3.0, 0.0]),
            new Point([3.0, 4.0])
        ]);
        const visitor = new LengthVisitor();
        
        const result = lineString.accept(visitor);
        
        expect(result).to.equal(7.0); 
    });

    it("test visit linestring with diagonal segment", () => {
        const lineString = new LineString([
            new Point([0.0, 0.0]),
            new Point([3.0, 4.0])
        ]);
        const visitor = new LengthVisitor();
        
        const result = lineString.accept(visitor);
        
        expect(result).to.equal(5.0); 
    });

    it("test visit geometryCollection with multiple linestrings", () => {
        const line1 = new LineString([
            new Point([0.0, 0.0]),
            new Point([3.0, 0.0])
        ]);
        const line2 = new LineString([
            new Point([0.0, 0.0]),
            new Point([0.0, 4.0])
        ]);
        const collection = new GeometryCollection([line1, line2]);
        const visitor = new LengthVisitor();
        
        const result = collection.accept(visitor);
        
        expect(result).to.equal(7.0); 
    });

    it("test visit geometryCollection with point and linestring", () => {
        const point = new Point([5.0, 5.0]);
        const line = new LineString([
            new Point([0.0, 0.0]),
            new Point([3.0, 4.0])
        ]);
        const collection = new GeometryCollection([point, line]);
        const visitor = new LengthVisitor();
        
        const result = collection.accept(visitor);
        
        expect(result).to.equal(5.0); 
    });

    it("test visit empty geometryCollection", () => {
        const collection = new GeometryCollection();
        const visitor = new LengthVisitor();
        
        const result = collection.accept(visitor);
        
        expect(result).to.equal(0.0);
    });
});