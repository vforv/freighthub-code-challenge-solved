import * as dotenv from 'dotenv';

if (!process.env.PROD) {
    dotenv.config();
}

import { container } from './ioc-container';
import * as validate from 'express-validation';
import { InversifyExpressServer } from 'inversify-express-utils';
import { logger } from '@util/logger';
import { StartCrons } from './start-crons';

const server = new InversifyExpressServer(container);
server.setConfig((App: any) => {
    const bodyParser = require('body-parser');
    App
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true
        }));
})
    .setErrorConfig((app) => {
        /* tslint:disable:no-unused-variable */
        // tslint:disable-next-line
        app.use((err: any, req: any, res: any, next: any) => {
            if (err instanceof validate.ValidationError) return res.status(err.status).json(err);
            next();
        });
    });

const app: any = server.build();

// Starts the app
app.listen(process.env.PORT, () => {
    const bootCrons = container.get<StartCrons>('StartCrons');

    bootCrons.run()
        .then()
        .catch();

    logger.info(`Scheduler started on port: ${process.env.PORT}`);
});

export { app };
