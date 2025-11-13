import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default class EnvelopeBuilder {
    private coordinates: Coordinate[];

    constructor() {
        this.coordinates = [];
    }

    insert(coordinate: Coordinate): void {
        this.coordinates.push(coordinate);
    }

    build(): Envelope {
        if (this.coordinates.length === 0) {
            throw new Error("Cannot build envelope with no coordinates");
        }

        let xMin = this.coordinates[0][0];
        let yMin = this.coordinates[0][1];
        let xMax = this.coordinates[0][0];
        let yMax = this.coordinates[0][1];

        for (const coord of this.coordinates) {
            if (coord[0] < xMin) xMin = coord[0];
            if (coord[0] > xMax) xMax = coord[0];
            if (coord[1] < yMin) yMin = coord[1];
            if (coord[1] > yMax) yMax = coord[1];
        }

        return new Envelope([xMin, yMin], [xMax, yMax]);
    }
}
