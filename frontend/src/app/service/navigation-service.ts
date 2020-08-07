import { generatePath } from 'react-router';

class NavigationService {
    public static readonly HOME_PATH: string = '/';
    public static readonly LOGIN_PATH: string = '/login';
    public static readonly LOGOUT_PATH: string = '/logout';
    public static readonly VIDEO_CHAT_PATH: string = '/video-chat/:id?';
    public static readonly USER_LIST_PATH: string = '/user-list';
    public static readonly USER_DETAILS_PATH: string = '/user-details/:id?';
    public static readonly CHAT_ROOM_PATH: string = '/chat-room';
    public static readonly PAGE_NOT_FOUND_PATH: string = '/not-found';
    public static readonly USER_TIMETABLE_PATH: string = '/timetable';

    public readonly redirectToCalendarPage = (): void => {
        window.location.href = NavigationService.USER_TIMETABLE_PATH;
    };

    public readonly redirectToDefaultPage = (): void => {
        window.location.href = NavigationService.HOME_PATH;
    };

    public readonly redirectToLoginPage = (): void => {
        window.location.href = NavigationService.LOGIN_PATH;
    };

    public readonly redirectToLogoutPage = (): void => {
        window.location.href = NavigationService.LOGOUT_PATH;
    };

    public readonly redirectToUserListPage = (): void => {
        window.location.href = NavigationService.USER_LIST_PATH;
    };

    public readonly redirectToUserDetailsPage = (id?: number): void => {
        window.location.href = generatePath(NavigationService.USER_DETAILS_PATH, { id });
    };

    public readonly redirectToChatRoom = (): void => {
        window.location.href = NavigationService.CHAT_ROOM_PATH;
    };

    public readonly redirectToVideoChat = (id?: number): void => {
        window.location.href = generatePath(NavigationService.VIDEO_CHAT_PATH, { id });
    };
}

const navigationService = new NavigationService();

export { NavigationService, navigationService };
