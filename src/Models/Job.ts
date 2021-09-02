import { BannerImage } from "./BannerImage";

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

export class Job implements IJob {
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

    jobSummaryHeader = () => {
        return "ASS";
        // build an applicable job summary header from provided data
        let result = this.title;

        if (this.team) {
            result += " on " + this.team;
        }

        result += " at " + this.company;

        if (!this.end) {
            result += " since " + this.start;
        } else {
            result += " from " + this.start + " to " + this.end;
        }

        return result;
    }

}