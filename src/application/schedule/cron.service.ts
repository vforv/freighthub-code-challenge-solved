import { injectable, inject } from 'inversify';
import { CronCommand } from './commands/cron.command';
import { CronRepository } from '@domain/schedule';
import { Cron } from '@domain/schedule/cron';

@injectable()
export class CronApplicationService {

    constructor (
        @inject('CronRepository') private _cronRepo: CronRepository
    ) { }

    public createCron (cronCmd: CronCommand) {
        const cron = new Cron(cronCmd.time, cronCmd.tasks);
        return this._cronRepo.create(cron);
    }
}
