import { injectable, inject } from 'inversify';
import { Task } from './task.service';
import { HttpScrapeContract } from '@domain/task/http-scrape.contract';
import { ScrapeContract, Scrape, Website } from '@domain/task';
import * as sanitizeHtml from 'sanitize-html';
import { logger } from '@util/logger';

@injectable()
export class TaskScrapFullPageService implements Task {
    public options: Website;

    constructor (
        @inject('HttpScrapeRepository') private _httpScrapeRepo: HttpScrapeContract,
        @inject('ScrapeRepository') private _scrapeRepo: ScrapeContract
    ) { }

    public doJob () {
        this._httpScrapeRepo.read(this.options.url)
            .then((scrapeHttp: any) => {
                const scrape = new Scrape(sanitizeHtml(scrapeHttp.data), this.options);
                this._scrapeRepo.create(scrape)
                    .then(() => {
                        logger.info(`Website ${this.options.url} SCRAPED!`);
                    })
                    .catch(() => {
                        logger.error(`Website ${this.options.url} NOT SCRAPED!`);
                    });

            })
            .catch(() => {
                logger.error(`Http request to site ${this.options.url} NOT WORKING.`);
            });
    }

}
