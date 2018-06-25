import { injectable } from 'inversify';
import * as Axios from 'axios';

@injectable()
export class AxiosScrapeRepository {
    public read (url: string) {
        return Axios.default.get(url);
    }
}
