import { injectable, inject } from 'inversify';
import { TypeORMConnectionService } from './typeorm-connection.service';
import { Schedule, ScheduleRepository } from '@domain/schedule';

@injectable()
export class TypeORMScheduleRepository implements ScheduleRepository {

    constructor (
        @inject('TypeORMConnectionService') private _conn: TypeORMConnectionService
    ) { }

    async create (schedule: Schedule): Promise<any> {
        const repo = await this._repo(Schedule);
        return repo.save(schedule);
    }

    async read (): Promise<any> {
        const repo = await this._repo(Schedule);
        return repo.find();
    }

    async update (id: string, schedule: Schedule): Promise<Schedule> {
        throw new Error(id + schedule);
    }

    private _repo (rep: any) {
        return this._conn.getRepo<Schedule>(rep);
    }

}
