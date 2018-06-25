import { CronJob } from 'cron';
import * as Joi from 'joi';
import { logger } from '@util/logger';

export const cronValidation = Joi.extend((joi: any) => ({
    base: joi.string(),
    name: 'string',
    language: { cron: 'cron is not valid' },
    rules: [{
        name: 'cron',
        /* tslint:disable:no-unused-variable */
      // tslint:disable-next-line
        validate (params: any, value: any, state: any, options: any): any {
            const _this: any = this;

            try {
                /* tslint:disable:no-unused-variable */
                // tslint:disable-next-line
                new CronJob(value, () => {
                    logger.info('Good pattern');
                });
                return value;
            } catch (ex) {
                return _this.createError('string.cron', { value }, state, options);
            }

        }
    }]
}));
