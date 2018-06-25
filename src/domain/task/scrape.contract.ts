import { Scrape } from './scrape.entity';

export interface ScrapeContract {
    create (scrapes: Scrape): Promise<Scrape>;
}
