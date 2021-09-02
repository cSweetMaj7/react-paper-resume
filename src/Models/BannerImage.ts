import { Image } from "./Image";

interface IBannerImage {
    image: Image;
}

export class BannerImage implements IBannerImage {
    public image!: Image;

    Job(data: IBannerImage) {
        Object.assign(this, data);
    }

}