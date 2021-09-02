
interface IPoint {
    x: number;
    y: number;
}

export class Point implements IPoint {
    public x!: number;
    public y!: number;

    Job(data: IPoint) {
        Object.assign(this, data);
    }

}