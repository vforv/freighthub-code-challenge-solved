import { injectable, inject } from 'inversify';
import { ScrapeContract } from '@domain/task/scrape.contract';
import { ScrapeCommand } from '@app/task/commands/scrape.command';
import { Scrape } from '@domain/task';

@injectable()
export class ScrapeApplicationService {
    constructor (
        @inject('ScrapeRepository') private _scrapeRepo: ScrapeContract
    ) { }

    public craeteScrap (scrapeCmd: ScrapeCommand) {
        const scrape = new Scrape(scrapeCmd.content, scrapeCmd.website);

        return this._scrapeRepo.create(scrape);
    }
}
