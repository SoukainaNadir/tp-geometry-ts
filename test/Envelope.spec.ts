import "mocha";
import { expect } from "chai";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";

describe("test Envelope", () => {
    it("test envelope creation and getters", () => {
        const env = new Envelope([0.0, 1.0], [2.0, 3.0]);

        expect(env.isEmpty()).to.equal(false);
        expect(env.getXmin()).to.equal(0.0);
        expect(env.getYmin()).to.equal(1.0);
        expect(env.getXmax()).to.equal(2.0);
        expect(env.getYmax()).to.equal(3.0);
    });

    it("test toString", () => {
        const env = new Envelope([0.0, 1.0], [2.0, 3.0]);
        expect(env.toString()).to.equal("Envelope(xmin=0, ymin=1, xmax=2, ymax=3)");
    });
});

describe("test EnvelopeBuilder", () => {
    it("test build envelope from coordinates", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([0.0, 1.0]);
        builder.insert([2.0, 0.0]);
        builder.insert([1.0, 3.0]);

        const result = builder.build();

        expect(result.getXmin()).to.equal(0.0);
        expect(result.getYmin()).to.equal(0.0);
        expect(result.getXmax()).to.equal(2.0);
        expect(result.getYmax()).to.equal(3.0);
    });

    it("test build with one point", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([5.0, 5.0]);

        const result = builder.build();

        expect(result.getXmin()).to.equal(5.0);
        expect(result.getYmin()).to.equal(5.0);
        expect(result.getXmax()).to.equal(5.0);
        expect(result.getYmax()).to.equal(5.0);
    });

    it("test build with no coordinates", () => {
        const builder = new EnvelopeBuilder();
        expect(() => builder.build()).to.throw("Cannot build envelope with no coordinates");
    });

    it("test all min/max branches", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([5.0, 5.0]);
        builder.insert([2.0, 8.0]);
        builder.insert([9.0, 1.0]);

        const result = builder.build();


        expect(result.getXmin()).to.equal(2.0);
        expect(result.getXmax()).to.equal(9.0);
        expect(result.getYmin()).to.equal(1.0);
        expect(result.getYmax()).to.equal(8.0);
    });

});