import { Cron } from '@domain/schedule/cron';
import { CronJob } from 'cron';

export interface CronRepository {
    create (cron: Cron): CronJob;
    delete (): any;
}
