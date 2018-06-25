import { injectable, inject } from 'inversify';
import { Website } from '@domain/task';
import to from '@util/to';
import { WebsiteCommand } from '@app/task/commands/website.command';
import { WebsiteApplicationService } from '@app/task/website.service';

@injectable()
export class CreateWebsiteExecuter {
    constructor (
        @inject('WebsiteApplicationService') private _websiteService: WebsiteApplicationService
    ) { }

    async execute (urls: string[]) {
        const websiteCmd = new WebsiteCommand();
        websiteCmd.urls = urls;

        const website = await to<Website[]>(this._websiteService.createWerbsites(websiteCmd));

        return website;
    }

}
