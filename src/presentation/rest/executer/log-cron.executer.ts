import { injectable } from 'inversify';
import { CronJob } from 'cron';
import { Website } from '@domain/task';
import { logger } from '@util/logger';

@injectable()
export class LogCronExecuter {

    execute (cron: CronJob, websites: Website[]) {
        const websiteUrls = websites.map((website) => website.url);
        if (cron.running) {
            logger.info(`Next schedule for sites: ${websiteUrls}: ${cron.nextDates()}`);
            cron.addCallback(() => {
                logger.info(`Next schedule for sites: ${websiteUrls}: ${cron.nextDates()}`);
            });
        } else {
            logger.error(`Schedule for sites: ${websiteUrls} NOT WORKING`);
        }

    }
}
