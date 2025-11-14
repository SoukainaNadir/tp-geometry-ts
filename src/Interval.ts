export default class Interval {
    private min: number = Number.POSITIVE_INFINITY;
    private max: number = Number.NEGATIVE_INFINITY;

    insert(value: number): void {
        this.min = Math.min(this.min, value);
        this.max = Math.max(this.max, value);
    }

    getMin(): number {
        return this.min;
    }

    getMax(): number {
        return this.max;
    }

    isEmpty(): boolean {
        return this.min === Number.POSITIVE_INFINITY && this.max === Number.NEGATIVE_INFINITY;
    }
}