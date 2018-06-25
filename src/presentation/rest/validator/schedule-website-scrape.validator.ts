import * as Joi from 'joi';
import { cronValidation } from '@util/cron-validator';

export const ISVALID = {
    body: {
        active: Joi.boolean().required(),
        urls: Joi.array().items(Joi.string().uri().required()).required(),
        time: cronValidation.string().cron()
    }
};
