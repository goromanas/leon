import * as React from 'react';

import { Actions, INITIAL_SESSION, INITIAL_CURRENT_LESSON, INITIAL_SCHEDULE, Session, settingsContext } from 'app/context';

interface State {
    session: Session;
    lessons: Api.Lesson[];
    currentLesson: number;
    schedule: Api.ScheduleDto[];
}

class AppStore extends React.Component<{}, State> {

    public readonly state: State = {
        session: INITIAL_SESSION,
        lessons: null,
        currentLesson: INITIAL_CURRENT_LESSON,
        schedule: INITIAL_SCHEDULE,
    };

    public render(): React.ReactNode {
        const {
            children,
        } = this.props;

        const {
            session,
            lessons,
            currentLesson,
            schedule,
        } = this.state;

        const actions: Actions = {
            updateSession: this.updateSession,
            updateLessons: this.updateLessons,
            updateCurrentLesson: this.updateCurrentLesson,
            updateSchedule: this.updateSchedule,
        };

        return (
            <settingsContext.Provider value={{ session, lessons, currentLesson, actions, schedule }}>
                {children}
            </settingsContext.Provider>
        );
    }

    private readonly updateSession = (session: Session): void => {
        this.setState({ session });
    };

    private readonly updateLessons = (lessons: Api.Lesson[]): void => {
        this.setState({ lessons });
    };

    private readonly updateCurrentLesson = (currentLesson: number): void => {
        this.setState({ currentLesson });
    };

    private readonly updateSchedule = (schedule: Api.ScheduleDto[]): void => {
        this.setState({ schedule });
    };

}

export { AppStore };
