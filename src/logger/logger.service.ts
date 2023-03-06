import { Logger, ILogObj } from 'tslog';

export class LoggerService {
    public logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger({
            type: 'pretty',
            hideLogPositionForProduction: true
        })
    }

    log(...args: unknown[]) {
        this.logger.info(args)
    }

    error(...args: unknown[]) {
        // отправка в sentry / rollbar
        this.logger.error(args)
    }

    warn(...args: unknown[]) {
        this.logger.warn(args)
    }

}