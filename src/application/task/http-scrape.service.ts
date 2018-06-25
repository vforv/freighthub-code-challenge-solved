import { injectable, inject } from 'inversify';
import { HttpScrapeContract } from '@domain/task/http-scrape.contract';

@injectable()
export class HttpScrap {
    constructor (
        @inject('HttpScrapeRepository') private _httpScrape: HttpScrapeContract
    ) { }

    public scrape (website: string) {
        this._httpScrape.read(website);
    }
}
