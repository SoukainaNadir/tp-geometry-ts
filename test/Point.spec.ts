import "mocha";
import { expect } from "chai";
import Point from "../src/Point";

describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.equal(undefined);
        expect(Number.isNaN(p.x()));
        expect(Number.isNaN(p.y()));
        expect(p.getType()).to.equal("Point");
    });

    it("test constructor with coordinates", () => {
        const p = new Point([3.0, 4.0]);
        expect(p.getCoordinate()).to.deep.equal([3.0, 4.0]);
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
    });

    it("test isEmpty with empty point", () => {
        const p = new Point();
        expect(p.isEmpty()).to.equal(true);
    });

    it("test isEmpty with point having coordinates", () => {
        const p = new Point([3.0, 4.0]);
        expect(p.isEmpty()).to.equal(false);
    });

    it("test translate", () => {
        const p = new Point([3.0, 4.0]);
        p.translate(1.0, 2.0);
        expect(p.x()).to.equal(4.0);
        expect(p.y()).to.equal(6.0);
    });

    it("test translate on empty point", () => {
        const p = new Point();
        p.translate(1.0, 2.0);
        expect(Number.isNaN(p.x())).to.be.true;
        expect(Number.isNaN(p.y())).to.be.true;

    });

    it("test clone empty point", () => {
        const p = new Point();
        const copy = p.clone();

        expect(copy).to.not.equal(p);
        expect(copy.isEmpty()).to.equal(true);
    });

    it("test clone point with coordinates", () => {
        const p = new Point([3.0, 4.0]);
        const copy = p.clone();

        expect(copy).to.not.equal(p);
        expect(copy.x()).to.equal(3.0);
        expect(copy.y()).to.equal(4.0);

        copy.translate(10.0, 10.0);
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
        expect(copy.x()).to.equal(13.0);
        expect(copy.y()).to.equal(14.0);
    });


});

