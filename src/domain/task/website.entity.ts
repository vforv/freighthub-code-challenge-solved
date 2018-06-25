import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { Scrape } from './scrape.entity';

@Entity()
export class Website {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    url: string;

    /* tslint:disable:no-unused-variable */
    // tslint:disable-next-line
    @ManyToOne(type => Schedule, schedule => schedule.websites)
    schedule: Schedule;

    /* tslint:disable:no-unused-variable */
    // tslint:disable-next-line
    @OneToMany(type => Scrape, scrape => scrape.website)
    scrapes: Scrape[];

    constructor (url: string, schedule: Schedule, scrapes: Scrape[]) {
        this.url = url;
        this.schedule = schedule;
        this.scrapes = scrapes;
    }
}
