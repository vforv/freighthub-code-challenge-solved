import { Website } from '@domain/task/website.entity';

export interface WebsiteContract {
    create (websites: Website[]): Promise<Website[]>;
}
