import { Website } from '@domain/task';

export class ScheduleCommand {
    time: string;
    active: boolean;
    websites: Website[];
}
