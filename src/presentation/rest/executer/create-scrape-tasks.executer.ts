import { injectable, inject } from 'inversify';
import { Task } from '@app/task/task.service';
import { Website } from '@domain/task';
import { Schedule } from '@domain/schedule';

@injectable()
export class CreateScrapeTasksExecuter {
    private _taskFactory: (options: any) => Task;

    constructor (
        @inject('Factory<Task>') private factory: (task: string) => (options: any) => Task
    ) {
        this._taskFactory = this.factory('scrape-full-page');
    }

    public execute (schedule: Schedule) {
        const tasks = schedule.websites.map((website: Website) => {
            return this._taskFactory(website);
        });

        return tasks;
    }
}
