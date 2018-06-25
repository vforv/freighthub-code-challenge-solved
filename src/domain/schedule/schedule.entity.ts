import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { Website } from '../task/website.entity';

@Entity()
export class Schedule {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    time: string;

    @Column()
    active: boolean;

    /* tslint:disable:no-unused-variable */
    // tslint:disable-next-line
    @OneToMany(type => Website, website => website.schedule, {
        eager: true
    })
    @JoinTable()
    websites: Website[] = [];

    constructor (time: string, active: boolean, websites: Website[]) {
        this.time = time;
        this.active = active;
        this.websites = websites;
    }

}
