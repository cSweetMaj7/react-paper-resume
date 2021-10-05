
interface IJobBullet {
    bulletChar?: string;
    text: string;
    href?: string;
}

export class JobBullet implements IJobBullet {
    public bulletChar!: string;
    public text!: string;
    public href!: string;

    JobBullet(data: IJobBullet) {
        Object.assign(this, data);
    }

}