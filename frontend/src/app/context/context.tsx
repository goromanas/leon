import * as React from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export type CurrentUser = Api.SessionUser | null;

export interface Session {
    user: CurrentUser;
    authenticated: boolean;
}

export interface Message {
    content: string;
    username: string;
    date: string;
    classname?: string;
    subject?: number;
    channel?: number;
    role?: string[];
    teacherSubjectId?: number;
}

export interface Actions {
    updateSession: (session: Session) => void;
    updateLessons: (lessons: Api.LessonDto[]) => void;
    updateCurrentLesson: (currentLesson: number) => void;
    updateSchedule: (schedule: Api.ScheduleDto[]) => void;
    updateWebsocket: (wsChat: ReconnectingWebSocket) => void;
    updateChannelArray: (channelsWithNewMessages: number[]) => void;
    updateNewMessages: (newMessage: Message[]) => void;
    removeChannelArray: (id: number) => void;
}

export interface SettingsProps {
    actions: Actions;
    session: Session;
    lessons: Api.LessonDto[];
    currentLesson: number;
    schedule: Api.ScheduleDto[];
    wsChat: ReconnectingWebSocket;
    channelsWithNewMessages: number[];
    newMessages: Message[];
}

const INITIAL_SESSION: Session = {
    user: null,
    authenticated: false,
};
const INITIAL_CURRENT_LESSON: number = 0;

const INITIAL_LESSONS: Api.LessonDto[] = [];

const INITIAL_SCHEDULE: Api.ScheduleDto[] = [];

const DEFAULT_SETTINGS: SettingsProps = {
    session: INITIAL_SESSION,
    actions: {
        updateSession: () => undefined,
        updateLessons: () => undefined,
        updateCurrentLesson: () => undefined,
        updateSchedule: () => undefined,
        updateWebsocket: () => undefined,
        updateChannelArray: () => undefined,
        updateNewMessages: () => undefined,
        removeChannelArray: () => undefined,
    },
    lessons: INITIAL_LESSONS,
    currentLesson: INITIAL_CURRENT_LESSON,
    schedule: INITIAL_SCHEDULE,
    wsChat: null,
    channelsWithNewMessages: [],
    newMessages: [],
};

const settingsContext: React.Context<SettingsProps> = React.createContext<SettingsProps>(DEFAULT_SETTINGS);

function connectContext<TInjectedProps = {}, TOriginalProps = {}>(
    mapContextToProps: (context: SettingsProps, ownProps: TOriginalProps) => TInjectedProps,
): <P extends TOriginalProps>(WrappedComponent: React.ComponentType<P & TInjectedProps>) => React.FC<P> {
    return (Component) =>
        (props) => (
            <settingsContext.Consumer>
                {(settings: SettingsProps) => (
                    <Component
                        {...mapContextToProps(settings, props)}
                        {...props}
                    />
                )}
            </settingsContext.Consumer>
        );
}

export {
    settingsContext,
    connectContext,
    INITIAL_SESSION,
    INITIAL_CURRENT_LESSON,
    INITIAL_SCHEDULE,
};
