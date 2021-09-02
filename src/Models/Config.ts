import { Job } from "./Job";
import { ProfileImage } from "./ProfileImage";
import { Theme } from "./Theme";

interface Serializable<T> {
    deserialize(input: Object): T;
}

interface IConfig {
    name: string;
    profileImage?: ProfileImage;
    title: string;
    subtitle?: string;
    summary: string;
    summaryIsQuote?: boolean;
    phone?: string;
    email?: string;
    linkedIn?: string;
    web?: string;
    github?: string;
    qrSrc?: string;
    jobs?: Job[];
    themes?: Theme[];
}

export class Config implements Serializable<IConfig> {
    public name!: string;
    public profileImage!: ProfileImage;
    public title!: string;
    public subtitle!: string;
    public summary!: string;
    public summaryIsQuote!: boolean;
    public phone!: string;
    public email!: string;
    public linkedInUsername!: string;
    public web!: string;
    public githubUsername!: string;
    public qrSrc!: string;
    public jobs!: Job[];
    public themes!: Theme[];

    get emailLink() {
        return "mailto:" + this.email;
    }

    get githubLink() {
        return "github.com/" + this.githubUsername;
    }

    get linkedInLink() {
        return "linkedin.com/in/" + this.linkedInUsername;
    }

    deserialize(data: any) {
        Object.assign(this, data);
        return this;
    }

}