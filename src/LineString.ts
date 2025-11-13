import Geometry from "./Geometry";
import Point from "./Point";

export default class LineString implements Geometry {
    private points: Point[];

    constructor(points?: Point[]) {
        this.points = points ?? [];
    }

    getNumPoints(): number {
        return this.points.length;
    }

    getPointN(n: number): Point {
        if (n < 0 || n >= this.points.length) {
            throw new Error(`Index out of bounds: ${n}`);
        }
        return this.points[n];
    }

    getType(): string {
        return this.constructor.name;
    }

    isEmpty(): boolean {
        return this.points.length === 0;
    }

    translate(dx: number, dy: number): void {
        for (const point of this.points) {
            point.translate(dx, dy);
        }
    }

    clone(): LineString {
        const clonedPoints = this.points.map(point => point.clone());
        return new LineString(clonedPoints);
    }

}