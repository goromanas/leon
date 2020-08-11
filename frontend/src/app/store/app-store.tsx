import * as React from 'react';

import { Actions, INITIAL_SESSION, INITIAL_CURRENT_LESSON, Session, settingsContext } from 'app/context';

interface State {
    session: Session;
    lessons: Api.Lesson[];
    currentLesson: number;
}

class AppStore extends React.Component<{}, State> {

    public readonly state: State = {
        session: INITIAL_SESSION,
        lessons: null,
        currentLesson: INITIAL_CURRENT_LESSON,
    };

    public render(): React.ReactNode {
        const {
            children,
        } = this.props;

        const {
            session,
            lessons,
            currentLesson,
        } = this.state;

        const actions: Actions = { updateSession: this.updateSession, updateLessons: this.updateLessons };

        return (
            <settingsContext.Provider value={{ session, lessons, currentLesson, actions }}>
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

}

export { AppStore };
