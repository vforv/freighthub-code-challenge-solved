import to from '@util/to';
import { Schedule } from '@domain/schedule';
import { inject, injectable } from 'inversify';
import { ScheduleApplicationService } from '@app/schedule/schedule.service';

@injectable()
export class ReadScheduleExecuter {
    constructor (
        @inject('ScheduleApplicationService') private _scheduleService: ScheduleApplicationService
    ) { }

    async execute () {
        const schedule = await to<Schedule[]>(this._scheduleService.readSchedule());

        return schedule;
    }
}
