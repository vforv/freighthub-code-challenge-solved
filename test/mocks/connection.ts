import { TypeORMConnectionService } from '../../src/infrastructure/db/typeorm/typeorm-connection.service';
import { Website, Scrape } from '../../src/domain/task';
import { Connection, createConnection } from 'typeorm';
import { Schedule } from '../../src/domain/schedule';

export class ConnectionMock extends TypeORMConnectionService {
    public _getConn(): Promise<Connection> {
        const port: any = process.env.MYSQL_PORT_TEST;
        if (this._conn) {
            return this._conn;
        } else {
            return this._conn = createConnection({
                type: 'mysql',
                host: process.env.MYSQL_HOST_TEST,
                port: parseInt(port),
                username: process.env.MYSQL_USER_TEST,
                password: process.env.MYSQL_PASSWORD_TEST,
                synchronize: true,
                logging: false,
                database: process.env.MYSQL_DATABASE_TEST,
                entities: [Schedule, Website, Scrape]
            });
        }
    }
}