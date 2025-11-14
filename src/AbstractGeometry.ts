import Geometry from "./Geometry";
import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";
import WktVisitor from "./WktVisitor";
import EnvelopeBuilder from "./EnvelopeBuilder";

export default abstract class AbstractGeometry implements Geometry {
    abstract getType(): string;
    abstract isEmpty(): boolean;
    abstract translate(dx: number, dy: number): void;
    abstract clone(): Geometry;
    abstract accept<T>(visitor: GeometryVisitor<T>): T;
    
    getEnvelope(): Envelope {
        const builder = new EnvelopeBuilder();
        this.accept(builder);
        return builder.build();
    }

    asText(): string {
        const visitor = new WktVisitor();
        this.accept(visitor);
        return visitor.getResult();
    }
}