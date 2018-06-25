import { injectable, inject } from 'inversify';
import { TypeORMConnectionService } from './typeorm-connection.service';
import { Website } from '@domain/task/website.entity';
import { WebsiteContract } from '@domain/task/website.contract';

@injectable()
export class TypeORMWebsiteRepository implements WebsiteContract {

    constructor (
        @inject('TypeORMConnectionService') private _conn: TypeORMConnectionService
    ) { }

    async create (websites: Website[]): Promise<any> {
        const repo = await this._repo(Website);
        return repo.save(websites);
    }

    private _repo (rep: any) {
        return this._conn.getRepo<Website>(rep);
    }

}
