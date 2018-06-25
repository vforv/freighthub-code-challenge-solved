import { injectable } from 'inversify';
import { createConnection, Connection, Repository } from 'typeorm';
import { Schedule } from '@domain/schedule';
import { Website } from '@domain/task/website.entity';
import { Scrape } from '@domain/task';

@injectable()
export class TypeORMConnectionService {
    protected _conn: Promise<Connection>;

    public getRepo<T> (target: any): Promise<Repository<T>> {
        return this._getConn().then((conn) => conn.getRepository<T>(target));
    }

    public _getConn (): Promise<Connection> {
        const port: any = process.env.MYSQL_PORT;
        if (this._conn) {
            return this._conn;
        } else {
            return this._conn = createConnection({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: parseInt(port, 10),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                synchronize: true,
                logging: false,
                database: process.env.MYSQL_DATABASE,
                entities: [Schedule, Website, Scrape]
            });
        }
    }
}
