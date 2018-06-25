import { Schedule } from './schedule.entity';

export interface ScheduleRepository {

    create (schedule: Schedule): Promise<Schedule>;
    update (id: string, schedule: Schedule): Promise<Schedule>;
    read (): Promise<Schedule[]>;
}
