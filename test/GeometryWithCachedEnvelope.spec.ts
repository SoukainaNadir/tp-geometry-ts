import "mocha";
import { expect } from "chai";
import GeometryWithCachedEnvelope from "../src/GeometryWithCachedEnvelope";
import Point from "../src/Point";
import LineString from "../src/LineString";
import WktVisitor from "../src/WktVisitor";

describe("test GeometryWithCachedEnvelope", () => {
    it("test getEnvelope is cached", () => {
        const point = new Point([3.0, 4.0]);
        const decorated = new GeometryWithCachedEnvelope(point);

        const envelope1 = decorated.getEnvelope();
        const envelope2 = decorated.getEnvelope();
        expect(envelope1).to.equal(envelope2);
    });

    it("test translate invalidates cache", () => {
        const point = new Point([3.0, 4.0]);
        const decorated = new GeometryWithCachedEnvelope(point);

        const envelope1 = decorated.getEnvelope();

        decorated.translate(1.0, 1.0);

        const envelope2 = decorated.getEnvelope();

        expect(envelope1).to.not.equal(envelope2);

        expect(envelope2.getXmin()).to.equal(4.0);
        expect(envelope2.getYmin()).to.equal(5.0);
    });

    it("test getType delegation", () => {
        const point = new Point([3.0, 4.0]);
        const decorated = new GeometryWithCachedEnvelope(point);

        expect(decorated.getType()).to.equal("Point");
    });

    it("test isEmpty delegation on non-empty geometry", () => {
        const point = new Point([3.0, 4.0]);
        const decorated = new GeometryWithCachedEnvelope(point);

        expect(decorated.isEmpty()).to.equal(false);
    });

    it("test isEmpty delegation on empty geometry", () => {
        const point = new Point();
        const decorated = new GeometryWithCachedEnvelope(point);

        expect(decorated.isEmpty()).to.equal(true);
    });

    it("test asText delegation", () => {
        const point = new Point([3.0, 4.0]);
        const decorated = new GeometryWithCachedEnvelope(point);

        expect(decorated.asText()).to.equal("POINT(3 4)");
    });

    it("test accept delegation", () => {
        const point = new Point([3.0, 4.0]);
        const decorated = new GeometryWithCachedEnvelope(point);

        const visitor = new WktVisitor();
        decorated.accept(visitor);

        expect(visitor.getResult()).to.equal("POINT(3 4)");
    });

    it("test clone", () => {
        const point = new Point([3.0, 4.0]);
        const decorated = new GeometryWithCachedEnvelope(point);

        decorated.getEnvelope();

        const cloned = decorated.clone();

        expect(cloned).to.not.equal(decorated);
        expect(cloned).to.be.instanceOf(GeometryWithCachedEnvelope);
        expect(cloned.asText()).to.equal("POINT(3 4)");
    });

    it("test with LineString", () => {
        const lineString = new LineString([
            new Point([0.0, 0.0]),
            new Point([1.0, 1.0]),
            new Point([2.0, 2.0])
        ]);
        const decorated = new GeometryWithCachedEnvelope(lineString);
        const envelope1 = decorated.getEnvelope();
        const envelope2 = decorated.getEnvelope();

        expect(envelope1).to.equal(envelope2);
        expect(envelope1.getXmin()).to.equal(0.0);
        expect(envelope1.getXmax()).to.equal(2.0);
    });
});