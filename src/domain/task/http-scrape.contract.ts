import { AxiosPromise } from 'axios';

export interface HttpScrapeContract {
    read (url: string): AxiosPromise;
}
