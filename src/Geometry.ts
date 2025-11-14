import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";
import WktVisitor from "./WktVisitor";

export default interface Geometry {
    getType(): string;
    isEmpty(): boolean;
    translate(dx: number, dy: number): void;
    clone(): Geometry;
    getEnvelope(): Envelope;
    accept(visitor: GeometryVisitor): void;

    asText(): string;
}