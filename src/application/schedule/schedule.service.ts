import { injectable, inject } from 'inversify';
import { Schedule, ScheduleRepository } from '@domain/schedule';
import { ScheduleCommand } from './commands/schedule.command';

@injectable()
export class ScheduleApplicationService {

    constructor (
        @inject('ScheduleRepository') private _scheduleRepo: ScheduleRepository
    ) { }

    public createSchedule (scheduleCmd: ScheduleCommand): Promise<Schedule> {
        const schedule = new Schedule(scheduleCmd.time, scheduleCmd.active, scheduleCmd.websites);
        return this._scheduleRepo.create(schedule);
    }

    public readSchedule (): Promise<Schedule[]> {
        return this._scheduleRepo.read();
    }
}
