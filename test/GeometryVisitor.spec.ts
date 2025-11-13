import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import LogGeometryVisitor from "../src/LogGeometryVisitor";


describe("test GeometryVisitor", () => {
    let visitor: LogGeometryVisitor;
    let output: string[];


    beforeEach(() => {
        visitor = new LogGeometryVisitor();
        output = [];

        const originalLog = console.log;
        console.log = (message: string) => {
            output.push(message);
            originalLog(message);
        };
    });

    it("test visit empty point", () => {
        const point = new Point();
        point.accept(visitor);

        expect(output[0]).to.equal("Je suis un point vide.");
    });


    it("test visit point with coordinates", () => {
        const point = new Point([2.0, 3.0]);
        point.accept(visitor);

        expect(output[0]).to.equal("Je suis un point avec x=2 et y=3.");
    });

    it("test visit empty linestring", () => {
        const lineString = new LineString();
        lineString.accept(visitor);

        expect(output[0]).to.equal("Je suis une polyligne vide.");
    });

    it("test visit linestring with points", () => {
        const p1 = new Point([0.0, 0.0]);
        const p2 = new Point([1.0, 1.0]);
        const p3 = new Point([2.0, 2.0]);
        const lineString = new LineString([p1, p2, p3]);

        lineString.accept(visitor);

        expect(output[0]).to.equal("Je suis une polyligne définie par 3 point(s).");
    });

});