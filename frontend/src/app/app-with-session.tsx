import * as React from 'react';

import { IndexPage } from 'app/index-page';
import { sessionService } from 'app/api/service/session-service';
import { connectContext, Session as ContextSession, SettingsProps } from 'app/context';
import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { loggerService } from 'app/service/logger-service';
import { lessonsService } from 'app/api/service/lessons-service';

interface State {
    content: React.ReactNode;
    lessons: Api.Lesson[];
    schedule: Api.ScheduleDto[];
}

interface OwnProps { }

interface ContextProps {
    updateSession: (session: ContextSession) => void;
    updateLessons: (lessons: Api.Lesson[]) => void;
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
            .catch(error => { loggerService.error('Error occurred when getting session information', error); });

        lessonsService.getTeacherLessons()
            .then(this.handleLessonsResponse)
            .catch(error => { loggerService.error('Error occurred when getting session information', error); });

        lessonsService.getStudentLessons()
            .then(this.handleLessonsResponse)
            .catch(error => { loggerService.error('Error occurred when getting session information', error); });

        lessonsService.getSchedule()
            .then(this.handleScheduleResponse)
            .catch(error => { loggerService.error('Error occurred when getting session information', error); });

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

    private readonly handleLessonsResponse = (lessons: Api.Lesson[]): void => {
        const {
            updateLessons,
        } = this.props;

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
        const ws: any = new WebSocket(lessonsService.getSocketUrl());

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
        let currentLessonID: number = 0;
        let day: Api.Lesson[] | null = null;
        let pos: number = 0;

        if (this.state.lessons && currentDay !== 0 && currentDay !== 6) {
            day = this.state.lessons.filter(lesson => lesson.day && lesson.day === currentDay);
        } else {
            day = this.state.lessons;
        }
        if (currentLesson > 0 && currentDay !== 0 && currentDay !== 6) {
            pos = currentLesson - 1;
            currentLessonID = day[pos].id;
        }
        // console.log('currentLesson: ' + currentLesson);
        // console.log('currentDAY: ' + currentDay);
        // console.log('currentID: ' + currentLessonID);
        return currentLessonID;
    };

    private readonly createSession = (user: Api.SessionUser): ContextSession => ({ user, authenticated: !!user });
}

const mapContextToProps = ({
    actions: { updateSession, updateLessons, updateCurrentLesson, updateSchedule } }: SettingsProps): ContextProps => ({
        updateSession,
        updateLessons,
        updateCurrentLesson,
        updateSchedule,
    });

const AppWithSession = connectContext(mapContextToProps)(AppWithSessionComponent);

export { AppWithSession };
