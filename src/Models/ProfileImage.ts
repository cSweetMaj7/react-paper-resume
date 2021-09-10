import { Image } from "./Image";

interface IProfileImage {
    image: Image;
    borderWidth?: number;
}

export class ProfileImage implements IProfileImage {
    public image!: Image;
    public borderWidth!: number;

    ProfileImage(data: IProfileImage) {
        Object.assign(this, data);
    }

}