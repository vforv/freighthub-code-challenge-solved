import { injectable, inject } from 'inversify';
import { CronCommand } from '@app/schedule/commands/cron.command';
import { CronApplicationService } from '@app/schedule/cron.service';
import { Task } from '../../../application/task/task.service';

@injectable()
export class CreateCronExecuter {
    constructor (
        @inject('CronApplicationService') private _cronService: CronApplicationService
    ) { }

    public execute (time: string, tasks: Task[]) {
        const cron = new CronCommand();
        cron.time = time;
        cron.tasks = tasks;

        return this._cronService.createCron(cron);
    }
}
