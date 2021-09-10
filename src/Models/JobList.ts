
interface IJobList {
    name: string;
    delimiter?: string;
    listItems: string[];
}

export class JobList implements IJobList {
    public name!: string;
    public delimiter!: string;
    public listItems!: string[];

    JobList(data: IJobList) {
        Object.assign(this, data);
    }

}