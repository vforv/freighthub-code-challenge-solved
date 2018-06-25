export class Cron {
    public time: string;
    public tasks: any[];

    constructor (time: string, tasks: any[]) {
        this.time = time;
        this.tasks = tasks;
    }
}
