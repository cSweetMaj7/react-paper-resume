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
    jobCardElevation: number;
    jobCardVariant: string;
}

export class Config implements Serializable<IConfig> {
    public name!: string;
    public profileImage!: ProfileImage;
    public title!: string;
    public subtitle!: string;
    public summary!: string;
    public summaryIsQuote!: boolean;
    public sidebarRight!: boolean;
    public phone!: string;
    public email!: string;
    public linkedInUsername!: string;
    public web!: string;
    public githubUsername!: string;
    public qrSrc!: string;
    public jobs!: Job[];
    public themes!: Theme[];
    public jobCardElevation!: number;
    public jobCardVariant!: string;

    get emailLink() {
        return "mailto:" + this.email;
    }

    get githubLink() {
        return "github.com/" + this.githubUsername;
    }

    get linkedInLink() {
        return "linkedin.com/in/" + this.linkedInUsername;
    }

    get phoneLink() {
        return "tel:" + this.phone.replaceAll(".", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll(" ","");
    }

    public getJobDescription = (job: Job) => {
        // override if defined
        if (job.cardTitleOverride) {
            return job.cardTitleOverride;
        }
        let result = job.title;
        const { team, company, end, start } = job;
        if (team) {
            result += " on " + team;
        }

        result += " at " + company;

        if (!end) {
            result += " since " + start;
        } else {
            result += " from " + start + " to " + end;
        }

        return result;
    }

    deserialize(data: any) {
        Object.assign(this, data);
        return this;
    }

}