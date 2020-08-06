import * as React from 'react';

import { Actions, INITIAL_SESSION, Session, settingsContext } from 'app/context';

interface State {
    session: Session;
    lessons: Api.Lesson[];
}

class AppStore extends React.Component<{}, State> {

    public readonly state: State = {
        session: INITIAL_SESSION,
        lessons: null,
    };

    public render(): React.ReactNode {
        const {
            children,
        } = this.props;

        const {
            session,
            lessons,
        } = this.state;

        const actions: Actions = { updateSession: this.updateSession, updateLessons: this.updateLessons };

        return (
            <settingsContext.Provider value={{ session, actions, lessons }}>
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
