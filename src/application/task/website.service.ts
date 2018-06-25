import { injectable, inject } from 'inversify';
import { WebsiteCommand } from './commands/website.command';
import { Website, WebsiteContract } from '@domain/task';

@injectable()
export class WebsiteApplicationService {

    constructor (
        @inject('WebsiteRepository') private _websiteRepo: WebsiteContract
    ) { }

    public createWerbsites (websiteCmd: WebsiteCommand) {
        const websites = websiteCmd.urls.map((url: string) => {
            return new Website(url, websiteCmd.schedule, []);
        });

        return this._websiteRepo.create(websites);
    }
}
