import { ScheduleCommand } from '@app/schedule/commands/schedule.command';
import { Website } from '@domain/task';
import { Schedule } from '@domain/schedule';
import to from '@util/to';
import { inject, injectable } from 'inversify';
import { ScheduleApplicationService } from '@app/schedule/schedule.service';

@injectable()
export class CreateScheduleExecuter {
    constructor (
        @inject('ScheduleApplicationService') private _scheduleService: ScheduleApplicationService
    ) { }

    async execute (time: string, active: boolean, website: Website[]) {
        const scheduleCmd = new ScheduleCommand();
        scheduleCmd.time = time;
        scheduleCmd.active = active;
        scheduleCmd.websites = website;

        const schedule = await to<Schedule>(this._scheduleService.createSchedule(scheduleCmd));

        return schedule;
    }

}
