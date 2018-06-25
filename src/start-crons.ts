import { injectable, inject } from 'inversify';
import { CreateCronExecuter } from '@rest/executer/create-cron.executer';
import { CreateScrapeTasksExecuter } from '@rest/executer/create-scrape-tasks.executer';
import { LogCronExecuter } from '@rest/executer/log-cron.executer';
import { ReadScheduleExecuter } from '@rest/executer/read-schedule.executer';
import { Schedule } from '@domain/schedule';
import { logger } from '@util/logger';

@injectable()
export class StartCrons {
    constructor (
        @inject('ReadScheduleExecuter') private _scheduleReadExecuter: ReadScheduleExecuter,
        @inject('CreateCronExecuter') private _cronCreateExecuter: CreateCronExecuter,
        @inject('CreateScrapeTasksExecuter') private _scrapeTasksExecuter: CreateScrapeTasksExecuter,
        @inject('LogCronExecuter') private _logCronExecuter: LogCronExecuter
    ) { }

    async run () {
        // Get all schedules
        const { error, data: schedules } = await this._scheduleReadExecuter.execute();

        if (error) {
            logger.error(error);
            throw error;
        }

        (schedules as Schedule[]).forEach((schedule) => {
            // Create tasks to perform
            const tasks = this._scrapeTasksExecuter.execute(schedule);

            // Create new cron for each task
            const cron = this._cronCreateExecuter.execute(schedule.time, tasks);

            // Log cron data
            this._logCronExecuter.execute(cron, schedule.websites);
        });

    }
}
