import { injectable } from 'inversify';
import { CronRepository, Cron } from '@domain/schedule';
import { CronJob } from 'cron';
import { Task } from '@app/task/task.service';

@injectable()
export class CronLibReposistory implements CronRepository {

    public create (cron: Cron): CronJob {

        const cronJob = new CronJob(cron.time, function () {
            cron.tasks.forEach((task: Task) => {
                task.doJob();
            });
        }, undefined, true, undefined);

        return cronJob;
    }

    public delete () {
        throw new Error('Method not implemented.');
    }
}
