
interface IJobBullet {
    bulletChar?: string;
    text: string;
}

export class JobBullet implements IJobBullet {
    public bulletChar!: string;
    public text!: string;

    JobBullet(data: IJobBullet) {
        Object.assign(this, data);
    }

}