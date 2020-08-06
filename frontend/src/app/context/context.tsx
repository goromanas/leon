import * as React from 'react';

export type CurrentUser = Api.SessionUser | null;

export interface Session {
    user: CurrentUser;
    authenticated: boolean;
}

// export interface Lessons {
//     [index: number]: {id: number, status: number, subject: string, teacher: string, key: number, video: string};
// }

export interface Actions {
    updateSession: (session: Session) => void;
    updateLessons: (lessons: Api.Lesson[]) => void;
}

export interface SettingsProps {
    actions: Actions;
    session: Session;
    lessons: Api.Lesson[];
}

const INITIAL_SESSION: Session = {
    user: null,
    authenticated: false,
};

const INITIAL_LESSONS: Api.Lesson[] = [];

const DEFAULT_SETTINGS: SettingsProps = {
    session: INITIAL_SESSION,
    actions: {
        updateSession: () => undefined,
        updateLessons: () => undefined,
    },
    lessons: INITIAL_LESSONS,
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
};
