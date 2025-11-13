import "mocha";
import { expect } from "chai";
import LineString from "../src/LineString";
import Point from "../src/Point";

describe("test LineString", () => {
    it("test default constructor", () => {
        const ls = new LineString();
        expect(ls.getNumPoints()).to.equal(0);
        expect(ls.getType()).to.equal("LineString");
    });
    
    it("test constructor with points", () => {
        const p1 = new Point([0.0, 0.0]);
        const p2 = new Point([1.0, 1.0]);
        const ls = new LineString([p1, p2]);
        
        expect(ls.getNumPoints()).to.equal(2);
        expect(ls.getPointN(0)).to.equal(p1);
        expect(ls.getPointN(1)).to.equal(p2);
    });
    
    it("test getType", () => {
        const ls = new LineString();
        expect(ls.getType()).to.equal("LineString");
    });
    
    it("test getPointN with negative index", () => {
        const ls = new LineString([new Point([0.0, 0.0])]);
        expect(() => ls.getPointN(-1)).to.throw("Index out of bounds");
    });
    
    it("test getPointN with index too large", () => {
        const ls = new LineString([new Point([0.0, 0.0])]);
        expect(() => ls.getPointN(5)).to.throw("Index out of bounds");
    });
    
    it("test getPointN on empty linestring", () => {
        const ls = new LineString();
        expect(() => ls.getPointN(0)).to.throw("Index out of bounds");
    });

    it("test isEmpty with empty linestring", () => {
        const ls = new LineString();
        expect(ls.isEmpty()).to.equal(true);
    });

    it("test isEmpty with linestring having points", () => {
        const p1 = new Point([0.0, 0.0]);
        const ls = new LineString([p1]);
        expect(ls.isEmpty()).to.equal(false);
    });
    
});