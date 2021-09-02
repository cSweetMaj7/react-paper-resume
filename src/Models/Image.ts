import { Point } from "./Point";

interface IImage {
    src: string;
    offset: Point;
}

export class Image implements IImage {
    public src!: string;
    public offset!: Point;

    Job(data: IImage) {
        Object.assign(this, data);
    }

}