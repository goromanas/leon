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
}

interface OwnProps { }

interface ContextProps {
    updateSession: (session: ContextSession) => void;
    updateLessons: (lessons: Api.Lesson[]) => void;
    updateCurrentLesson: (currentLesson: number) => void;
}

type Props = OwnProps & ContextProps;

class AppWithSessionComponent extends React.Component<Props, State> {
    public readonly state: State = {
        content: null,
        lessons: null,
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

        this.setState({ content: <IndexPage /> });
    };

    private readonly handleLessonsResponse = (lessons: Api.Lesson[]): void => {
        const {
            updateLessons,
        } = this.props;

        this.setState({ ...this.state, lessons });
        updateLessons(lessons);
    };

    private readonly handleSocketResponse = (): void => {
        const { updateCurrentLesson } = this.props;

        // connect to websocket to get currentLesson
        const ws: any = new WebSocket(lessonsService.getSocketUrl());

        ws.onopen = () => {
            console.log('connected');
        };
        ws.onmessage = (evt: any) => {
            const date = new Date();
            const currentDay = date.getDay();
            const currentLesson = evt.data;

            // set first property to currentLesson to get currentLessonID of this day.
            updateCurrentLesson(this.getCurrentLessonID(3, currentDay));
        };
        ws.onclose = () => {
            console.log('disconnected');
        };
    };

    // get currentLessonID from lessons by curent day of week and currentLesson from websocket
    private readonly getCurrentLessonID = (currentLesson: number, currentDay: number): any => {
        const days = this.state.lessons.filter(lesson => lesson.day === currentDay - 1);

        console.log(days);
        return days[currentLesson].id;
    };

    private readonly createSession = (user: Api.SessionUser): ContextSession => ({ user, authenticated: !!user });
}

const mapContextToProps = ({
    actions: { updateSession, updateLessons, updateCurrentLesson } }: SettingsProps): ContextProps => ({
        updateSession,
        updateLessons,
        updateCurrentLesson,
    });

const AppWithSession = connectContext(mapContextToProps)(AppWithSessionComponent);

export { AppWithSession };
