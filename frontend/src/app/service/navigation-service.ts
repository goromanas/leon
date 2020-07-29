class NavigationService {

    public static readonly HOME_PATH: string = '/';
    public static readonly LOGIN_PATH: string = '/login';
    public static readonly LOGOUT_PATH: string = '/logout';
    public static readonly PAGE_NOT_FOUND_PATH: string = '/not-found';

    public readonly redirectToDefaultPage = (): void => {
        window.location.href = NavigationService.HOME_PATH;
    };

    public readonly redirectToLoginPage = (): void => {
        window.location.href = NavigationService.LOGIN_PATH;
    };

    public readonly redirectToLogoutPage = (): void => {
        window.location.href = NavigationService.LOGOUT_PATH;
    };

}

const navigationService = new NavigationService();

export { NavigationService, navigationService };
