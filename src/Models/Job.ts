import { BannerImage } from "./BannerImage";

interface Serializable<T> {
    deserialize(input: Object): T;
}

interface IJob {
    title: string;
    team?: string;
    company: string;
    start: number;
    end?: number;
    bannerImage: BannerImage;
    jobBullets: JobBullet[];
    jobList?: JobList;
}
import { JobBullet } from "./JobBullet";
import { JobList } from "./JobList";

export class Job implements Serializable<IJob> {
    public title!: string;
    public team!: string;
    public company!: string;
    public start!: number;
    public end!: number;
    public bannerImage!: BannerImage;
    public jobBullets!: JobBullet[];
    public jobList!: JobList;

    Job(data: IJob) {
        Object.assign(this, data);
    }

    deserialize(data: any) {
        Object.assign(this, data);
        return this;
    }

}