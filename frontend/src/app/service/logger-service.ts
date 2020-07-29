import { environment } from 'app/utils/environment';
import { Environment } from 'app/model/environment';

class LoggerService {

    public error(message: string, ...errors: any[]): void {
        window.console.error(message, ...errors);
    }

    public warn(message: string, ...warnings: any[]): void {
        if (environment !== Environment.PRODUCTION) {
            window.console.warn(message, ...warnings);
        }
    }

    public info(message: string, ...info: any[]): void {
        if (environment !== Environment.PRODUCTION) {
            window.console.info(message, ...info);
        }
    }

}

const loggerService = new LoggerService();

export { loggerService };
