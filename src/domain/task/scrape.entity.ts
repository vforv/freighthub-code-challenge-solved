import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Website } from './website.entity';

@Entity()
export class Scrape {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'longtext', charset: 'utf8' })
    content: string;

    /* tslint:disable:no-unused-variable */
    // tslint:disable-next-line
    @ManyToOne(type => Website, website => website.scrapes)
    website: Website;

    constructor (content: string, website: Website) {
        this.content = content;
        this.website = website;
    }
}
