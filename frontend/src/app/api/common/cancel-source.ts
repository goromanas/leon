import axios, { CancelTokenSource } from 'axios';

import { RestService, RestServiceConfig } from './rest-service';

class CancelSource {

    public readonly service: RestService;

    private readonly cancelTokenSource: CancelTokenSource;

    constructor(configOverrides: Partial<RestServiceConfig> = {}) {
        const config: RestServiceConfig = {
            cancelTokenSource: axios.CancelToken.source(),
            ...configOverrides,
        };

        this.cancelTokenSource = config.cancelTokenSource;
        this.service = new RestService(config);
    }

    public cancel(): void {
        this.cancelTokenSource.cancel();
    }

}

export { CancelSource };
