import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { Response } from 'express';
import { Website } from '@domain/task';
import { logger } from '@util/logger';
import { CreateScheduleExecuter } from '@rest/executer/create-schedule.executer';
import { CreateWebsiteExecuter } from '@rest/executer/create-websites.executer';
import { CreateCronExecuter } from './executer/create-cron.executer';
import { Schedule } from '@domain/schedule';
import { LogCronExecuter } from './executer/log-cron.executer';
import { CreateScrapeTasksExecuter } from '@rest/executer/create-scrape-tasks.executer';
import { ISVALID } from './validator/schedule-website-scrape.validator';
import * as validate from 'express-validation';

@controller('/api')
export class ScheduleWebsiteScrapController {

    constructor (
        @inject('CreateWebsiteExecuter') private _websiteCreateExecuter: CreateWebsiteExecuter,
        @inject('CreateScheduleExecuter') private _scheduleCreateExecuter: CreateScheduleExecuter,
        @inject('CreateCronExecuter') private _cronCreateExecuter: CreateCronExecuter,
        @inject('CreateScrapeTasksExecuter') private _scrapeTasksExecuter: CreateScrapeTasksExecuter,
        @inject('LogCronExecuter') private _logCronExecuter: LogCronExecuter
    ) { }

    @httpPost('/schedule/commands/add', validate(ISVALID))
    async addPage (request: any, response: Response) {

        // Create website/s
        const { error: websitesError, data: websites } = await this._websiteCreateExecuter
            .execute(request.body.urls);

        if (websitesError) {
            logger.error(websitesError);

            response
                .status(500)
                .send('Server Error. Please contact website administrator.');

            return;
        }

        // Create schedule for websites
        const { error: errorSchedule, data: schedule } = await this._scheduleCreateExecuter
            .execute(request.body.time, request.body.active, (websites as Website[]));

        if (errorSchedule) {
            logger.error(errorSchedule.message);

            response
                .status(500)
                .send('Server Error. Please contact website administrator.');
            return;
        }

        // Create tasks to perform
        const tasks = this._scrapeTasksExecuter.execute((schedule as Schedule));

        // Create new cron for each task
        const cron = this._cronCreateExecuter.execute((schedule as Schedule).time, tasks);

        // Log cron data
        this._logCronExecuter.execute(cron, (websites as Website[]));

        response.send(schedule);
    }
}
