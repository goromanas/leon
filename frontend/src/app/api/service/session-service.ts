import { CancelSource, RestService } from 'app/api/common';

class SessionService {

    private static readonly SESSION_PATH: string = '/session';

    private readonly restService: RestService;

    constructor(cancelSource: CancelSource = new CancelSource()) {
        this.restService = cancelSource.service;
    }

    public readonly getSession = (): Promise<Api.Session> =>
        this.restService.get<Api.Session>(SessionService.SESSION_PATH);

    public readonly login = (username: string, password: string, rememberMe: boolean): Promise<Api.Session> =>
        this.restService.post<Api.Session>(SessionService.SESSION_PATH, {username, password, rememberMe});

    public readonly logout = (): Promise<void> =>
        this.restService.delete<void>(SessionService.SESSION_PATH);

}

const sessionService = new SessionService();

export { sessionService, SessionService };
