
import * as dotenv from 'dotenv';

if (!process.env.PROD) {
    dotenv.config();
}

import 'mocha';
import { container } from '../../src/ioc-container';
import { CreateWebsiteExecuter } from '../../src/presentation/rest/executer/create-websites.executer';
import { expect } from 'chai';
import { Website } from '../../src/domain/task';
import { ConnectionMock } from '../mocks/connection';
import { CreateScheduleExecuter } from '../../src/presentation/rest/executer/create-schedule.executer';
import { Schedule } from '../../src/domain/schedule';

describe('Test schedule creating', () => {
    beforeEach(() => {

        // create a snapshot so each unit test can modify 
        // it without breaking other unit tests
        container.snapshot();

        // Mock database
        container.unbind('TypeORMConnectionService');
        container.bind('TypeORMConnectionService').to(ConnectionMock).inSingletonScope();
    });

    afterEach(() => {

        // Restore to last snapshot so each unit test 
        // takes a clean copy of the application container
        container.restore();

    });

    it('Create schedule',async () => {
        const websiteCreator = container.get<CreateWebsiteExecuter>('CreateWebsiteExecuter');

        const { error: errorWebsite, data: websites } = await websiteCreator.execute(["http://vladimirdjukic.com"]);

        expect(errorWebsite).to.be.equals(undefined);
        expect((websites as Website[])[0].url).to.be.equals("http://vladimirdjukic.com");

        const scheduleCreator = container.get<CreateScheduleExecuter>('CreateScheduleExecuter');

        const {error: errorSchedule, data: schedule } = await scheduleCreator.execute('* * * * * *', true, (websites as Website[]));

        expect(errorSchedule).to.be.equals(undefined);
        expect((schedule as Schedule).time).to.be.equals('* * * * * *');

    })
})