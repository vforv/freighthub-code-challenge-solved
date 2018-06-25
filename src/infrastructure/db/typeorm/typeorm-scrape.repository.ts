import { injectable, inject } from 'inversify';
import { TypeORMConnectionService } from './typeorm-connection.service';
import { ScrapeContract } from '@domain/task/scrape.contract';
import { Scrape } from '@domain/task';

@injectable()
export class TypeORMScrapeRepository implements ScrapeContract {

    constructor (
        @inject('TypeORMConnectionService') private _conn: TypeORMConnectionService
    ) { }

    async create (scrape: Scrape): Promise<any> {
        const repo = await this._repo(Scrape);
        return repo.save(scrape);
    }

    private _repo (rep: any) {
        return this._conn.getRepo<Scrape>(rep);
    }

}
