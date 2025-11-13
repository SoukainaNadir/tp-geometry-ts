import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import LogGeometryVisitor from "../src/LogGeometryVisitor";

describe("test LogGeometryVisitor", () => {
  let output: string[];
  let visitor: LogGeometryVisitor;

  beforeEach(() => {
    output = [];
    const captureLog = (message: string) => {
      output.push(message);
    };
    visitor = new LogGeometryVisitor(captureLog);
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

  it("test multiple visits", () => {
    const point = new Point([5.0, 6.0]);
    point.accept(visitor);
    
    const lineString = new LineString([new Point([1.0, 1.0])]);
    lineString.accept(visitor);
    
    expect(output[0]).to.equal("Je suis un point avec x=5 et y=6.");
    expect(output[1]).to.equal("Je suis une polyligne définie par 1 point(s).");
  });
});