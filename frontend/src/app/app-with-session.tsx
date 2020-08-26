import * as React from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

import { IndexPage } from 'app/index-page';
import { sessionService } from 'app/api/service/session-service';
import { connectContext, Session as ContextSession, SettingsProps } from 'app/context';
import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { loggerService } from 'app/service/logger-service';
import { lessonsService } from 'app/api/service/lessons-service';

interface State {
    content: React.ReactNode;
    lessons: Api.LessonDto[];
    schedule: Api.ScheduleDto[];
}

interface OwnProps {
}

interface ContextProps {
    updateSession: (session: ContextSession) => void;
    updateLessons: (lessons: Api.LessonDto[]) => void;
    updateCurrentLesson: (currentLesson: number) => void;
    updateSchedule: (schedule: Api.ScheduleDto[]) => void;
}

type Props = OwnProps & ContextProps;

class AppWithSessionComponent extends React.Component<Props, State> {
    public readonly state: State = {
        content: null,
        lessons: null,
        schedule: null,
    };

    public componentDidMount(): void {
        sessionService
            .getSession()
            .then(this.handleResponse)
            .catch(error => {
                loggerService.error('Error occurred when getting session information', error);
            });
        lessonsService
            .getRoleLessons()
            .then(this.handleLessonsResponse)
            .catch(error => {
                loggerService.error('Error occurred when getting session information', error);
            });
        lessonsService
            .getSchedule()
            .then(this.handleScheduleResponse)
            .catch(error => {
                loggerService.error('Error occurred when getting session information', error);
            });
        this.handleSocketResponse();
    }

    public render(): React.ReactNode {
        const { content, lessons } = this.state;

        return (
            <AsyncContent loading={!content} loader={<PageLoadingSpinner />}>
                {content}
            </AsyncContent>
        );
    }

    private readonly handleResponse = ({ user }: Api.Session): void => {
        const { updateSession } = this.props;

        updateSession(this.createSession(user));
        this.setState({ ...this.state, content: <IndexPage /> });
    };
    private readonly handleLessonsResponse = (lessons: Api.LessonDto[]): void => {
        const { updateLessons } = this.props;

        this.setState({ ...this.state, lessons });
        updateLessons(lessons);
    };
    private readonly handleScheduleResponse = (schedule: Api.ScheduleDto[]): void => {
        const {
            updateSchedule,
        } = this.props;

        this.setState({ ...this.state, schedule });
        updateSchedule(schedule);
    };
    private readonly handleSocketResponse = (): void => {
        const { updateCurrentLesson } = this.props;
        // connect to websocket to get currentLesson
        const ws: any = new ReconnectingWebSocket(lessonsService.getSocketUrl());

        ws.onopen = () => {
            // tslint:disable-next-line: no-console
            console.log('connected');
        };
        ws.onmessage = (evt: any) => {
            const currentLesson = evt.data;
            // set first property to currentLesson to get currentLessonID of this day.

            if (currentLesson === 0) {
                updateCurrentLesson(this.getCurrentLessonID(0));
            } else {
                updateCurrentLesson(this.getCurrentLessonID(currentLesson));
                // updateCurrentLesson(this.getCurrentLessonID(4));
            }
        };
        ws.onclose = () => {
            // tslint:disable-next-line: no-console
            console.log('disconnected');
        };
    };
    // get currentLessonID from lessons using curent day of week and currentLesson from websocket
    private readonly getCurrentLessonID = (currentLesson: number): number => {
        const date = new Date();
        const currentDay = date.getDay();

        if (!this.state.lessons || currentDay === 0 || currentDay === 6) {
            return 0;
        }
        return this.state.lessons.find(
            _lesson =>
                _lesson.day && _lesson.day === currentDay && _lesson.time == currentLesson,
        )?.id || 0;
    };
    private readonly createSession = (user: Api.SessionUser): ContextSession => ({ user, authenticated: !!user });
}

const mapContextToProps = ({
    actions: { updateSession, updateLessons, updateCurrentLesson, updateSchedule },
}: SettingsProps)
    : ContextProps => ({
        updateSession,
        updateLessons,
        updateCurrentLesson,
        updateSchedule,
    });
const AppWithSession = connectContext(mapContextToProps)(AppWithSessionComponent);

export { AppWithSession };
