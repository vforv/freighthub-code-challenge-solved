import 'reflect-metadata';

const tsModuleAlias = require('@momothepug/tsmodule-alias');

tsModuleAlias.use({
    '@domain/*': __dirname + '/domain/*',
    '@util/*': __dirname + '/util/*',
    '@rest/*': __dirname + '/presentation/rest/*',
    '@db/*': __dirname + '/infrastructure/db/typeorm/*',
    '@app/*': __dirname + '/application/*'
});

import * as inversify from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';
import { ScheduleWebsiteScrapController } from '@rest/schedule-website-scrape.controller';
import { ScheduleRepository } from '@domain/schedule';
import { TypeORMScheduleRepository } from '@db/typeorm-schedule.repository';
import { TypeORMConnectionService } from '@db/typeorm-connection.service';
import { ScheduleApplicationService } from '@app/schedule/schedule.service';
import { CronRepository } from '@domain/schedule/cron.repository';
import { CronLibReposistory } from './infrastructure/cron-lib/cron-lib.repository';
import { CronApplicationService } from '@app/schedule/cron.service';
import { TypeORMWebsiteRepository } from '@db/typeorm-website.repository';
import { WebsiteApplicationService } from '@app/task/website.service';
import { Task } from '@app/task/task.service';
import { WebsiteContract } from '@domain/task/website.contract';
import { ScrapeApplicationService } from './application/task/scrape.service';
import { ScrapeContract } from '@domain/task/scrape.contract';
import { TypeORMScrapeRepository } from './infrastructure/db/typeorm/typeorm-scrape.repository';
import { HttpScrapeContract } from './domain/task/http-scrape.contract';
import { AxiosScrapeRepository } from './infrastructure/axios/axios-scrape.repository';
import { TaskScrapFullPageService } from '@app/task/task-scrap-full-page.service';
import { CreateScheduleExecuter } from './presentation/rest/executer/create-schedule.executer';
import { CreateWebsiteExecuter } from './presentation/rest/executer/create-websites.executer';
import { CreateCronExecuter } from '@rest/executer/create-cron.executer';
import { CreateScrapeTasksExecuter } from '@rest/executer/create-scrape-tasks.executer';
import { LogCronExecuter } from './presentation/rest/executer/log-cron.executer';
import { StartCrons } from './start-crons';
import { ReadScheduleExecuter } from '@rest/executer/read-schedule.executer';
import { Container } from 'inversify/dts/container/container';

const container: Container = new inversify.Container();

// Schedule
container.bind<interfaces.Controller>(TYPE.Controller).to(ScheduleWebsiteScrapController).inSingletonScope().whenTargetNamed('ScheduleWebsiteScrapControllerSvc');
container.bind<ScheduleRepository>('ScheduleRepository').to(TypeORMScheduleRepository).inSingletonScope();
container.bind<ScheduleApplicationService>('ScheduleApplicationService').to(ScheduleApplicationService).inSingletonScope();
container.bind<CreateScheduleExecuter>('CreateScheduleExecuter').to(CreateScheduleExecuter).inSingletonScope();
container.bind<ReadScheduleExecuter>('ReadScheduleExecuter').to(ReadScheduleExecuter).inSingletonScope();

// CRON
container.bind<CronRepository>('CronRepository').to(CronLibReposistory).inSingletonScope();
container.bind<CronApplicationService>('CronApplicationService').to(CronApplicationService).inRequestScope();
container.bind<CreateCronExecuter>('CreateCronExecuter').to(CreateCronExecuter).inSingletonScope();
container.bind<LogCronExecuter>('LogCronExecuter').to(LogCronExecuter).inSingletonScope();

// Website
container.bind<WebsiteContract>('WebsiteRepository').to(TypeORMWebsiteRepository).inSingletonScope();
container.bind<WebsiteApplicationService>('WebsiteApplicationService').to(WebsiteApplicationService).inSingletonScope();
container.bind<CreateWebsiteExecuter>('CreateWebsiteExecuter').to(CreateWebsiteExecuter).inSingletonScope();

// Scrap
container.bind<ScrapeContract>('ScrapeRepository').to(TypeORMScrapeRepository).inSingletonScope();
container.bind<ScrapeApplicationService>('ScrapeApplicationService').to(ScrapeApplicationService).inSingletonScope();
container.bind<CreateScrapeTasksExecuter>('CreateScrapeTasksExecuter').to(CreateScrapeTasksExecuter).inSingletonScope();

// Http request
container.bind<HttpScrapeContract>('HttpScrapeRepository').to(AxiosScrapeRepository).inSingletonScope();

// Boot cron starter
container.bind<StartCrons>('StartCrons').to(StartCrons).inSingletonScope();

// Task Factory
container.bind<Task>('Task').to(TaskScrapFullPageService).whenTargetNamed('scrape-full-page');

container.bind<inversify.interfaces.Factory<Task>>('Factory<Task>').toFactory<Task>((context) => {
    return (named: string) => (constOption: any) => {
        let task = context.container.getNamed<Task>('Task', named);
        task.options = constOption;
        return task;
    };
});

// Database
container.bind<TypeORMConnectionService>('TypeORMConnectionService').to(TypeORMConnectionService).inSingletonScope();

export {
    container
};
