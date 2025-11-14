import Coordinate from "./Coordinate";

export default class Envelope {
    bottomLeft: Coordinate;
    topRight: Coordinate;
    
    constructor(bottomLeft: Coordinate, topRight: Coordinate) {
        this.bottomLeft = bottomLeft;
        this.topRight = topRight;
    }

    isEmpty(): boolean {
        return this.bottomLeft === undefined || this.topRight === undefined;
    }

    getXmin(): number {
        return this.isEmpty()? Number.NaN : this.bottomLeft[0];
    }

    getYmin(): number {
        return this.isEmpty()? Number.NaN : this.bottomLeft[1];
    }

    getXmax(): number {
        return this.isEmpty()? Number.NaN : this.topRight[0];
    }

    getYmax(): number {
        return this.isEmpty()? Number.NaN : this.topRight[1];
    }

    toString(): string {
        return `Envelope(xmin=${this.getXmin()}, ymin=${this.getYmin()}, xmax=${this.getXmax()}, ymax=${this.getYmax()})`;
    }
}