import { CancelSource, RestService } from 'app/api/common';

class UserService {


    private static readonly USER_PATH: string = '/user';
    private static readonly CLASSROOM_PATH: string = '/usersClass';


    private readonly restService: RestService;

    constructor(cancelSource: CancelSource = new CancelSource()) {
        this.restService = cancelSource.service;
    }

    public readonly getUsers = (): Promise<Api.UserDto[]> =>
        this.restService.get<Api.UserDto[]>(UserService.USER_PATH);

    public readonly getUser = (id: number): Promise<Api.UserDto> =>
        this.restService.get<Api.UserDto>(`${UserService.USER_PATH}/${id}`);

    public readonly createUser = (user: Api.UserDto): Promise<Api.UserDto> =>
        this.restService.post<Api.UserDto>(UserService.USER_PATH, user);

    public readonly updateUser = (user: Api.UserDto): Promise<Api.UserDto> =>
        this.restService.put<Api.UserDto>(UserService.USER_PATH, user);

    public readonly getUsersByClass = (className: string): Promise<Api.UserDto[]> =>
        this.restService.get<Api.UserDto[]>(`${UserService.CLASSROOM_PATH}/${className}`);

}

const userService = new UserService();

export { userService };
