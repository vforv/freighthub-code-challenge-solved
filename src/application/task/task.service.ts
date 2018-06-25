
import { injectable } from 'inversify';

@injectable()
export abstract class Task {
    public options: any;

    abstract doJob (): any;
}
