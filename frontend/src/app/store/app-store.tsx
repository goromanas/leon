import * as React from 'react';

import {
    Actions,
    INITIAL_SESSION,
    INITIAL_CURRENT_LESSON,
    INITIAL_SCHEDULE,
    Session,
    settingsContext,
    Message
} from 'app/context';
import ReconnectingWebSocket from 'reconnecting-websocket';

interface State {
    session: Session;
    lessons: Api.LessonDto[];
    currentLesson: number;
    schedule: Api.ScheduleDto[];
    wsChat: ReconnectingWebSocket;
    channelsWithNewMessages: number[];
    newMessages: Message[];
}

class AppStore extends React.Component<{}, State> {

    public readonly state: State = {
        session: INITIAL_SESSION,
        lessons: null,
        currentLesson: INITIAL_CURRENT_LESSON,
        schedule: INITIAL_SCHEDULE,
        wsChat: null,
        channelsWithNewMessages: [],
        newMessages: [],
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
            wsChat,
            channelsWithNewMessages,
            newMessages,
        } = this.state;

        const actions: Actions = {
            updateSession: this.updateSession,
            updateLessons: this.updateLessons,
            updateCurrentLesson: this.updateCurrentLesson,
            updateSchedule: this.updateSchedule,
            updateWebsocket: this.updateWebsocket,
            updateChannelArray: this.updateChannelArray,
            updateNewMessages: this.updateNewMessages,
            removeChannelArray: this.removeChannelArray,
            filterNewMessages: this.filterNewMessages,
        };

        return (
            <settingsContext.Provider value={{
                session,
                lessons,
                currentLesson,
                actions,
                schedule,
                wsChat,
                channelsWithNewMessages,
                newMessages
            }}>
                {children}
            </settingsContext.Provider>
        );
    }

    private readonly updateSession = (session: Session): void => {
        this.setState({session});
    };

    private readonly updateLessons = (lessons: Api.LessonDto[]): void => {
        this.setState({lessons});
    };

    private readonly updateCurrentLesson = (currentLesson: number): void => {
        this.setState({currentLesson});
    };

    private readonly updateSchedule = (schedule: Api.ScheduleDto[]): void => {
        this.setState({schedule});
    };
    private readonly updateWebsocket = (wsChat: ReconnectingWebSocket): void => {
        this.setState({wsChat});
    };

    private readonly updateChannelArray = (nr: number): void => {
        const array = this.state.channelsWithNewMessages.includes(nr) ? [...this.state.channelsWithNewMessages] : [...this.state.channelsWithNewMessages, nr];
        this.setState({channelsWithNewMessages: array});

        // this.setState({ channelsWithNewMessages: [...Array.from(new Set([...this.state.channelsWithNewMessages, nr]))] });
    };

    private readonly updateNewMessages = (newMessages: Message): void => {
        this.setState({newMessages: [...this.state.newMessages, newMessages]});
    };
    private readonly removeChannelArray = (id: number): void => {
        const newArr = this.state.channelsWithNewMessages.filter(item => item !== id);

        this.setState({
            ...this.state,
            channelsWithNewMessages: [...this.state.channelsWithNewMessages.filter(item => item !== id)]
        });
    };
    private readonly filterNewMessages = (channelId: number): void => {
        // console.log('App store clean new messages', this.state.newMessages)
        const cleanArr = [...this.state.newMessages];
        while (cleanArr.length > 0) {
            cleanArr.pop();
        }
        // console.log(cleanArr);
        this.setState({newMessages: cleanArr});
        console.log(this.state.newMessages);
    };
}

export { AppStore };
