import React from 'react';

// @ts-ignore
import Websocket from 'react-websocket';
import { INITIAL_CURRENT_LESSON, INITIAL_SESSION } from 'app/context';

interface State {
    // lessonsList: Api.Lesson[];
    currentLesson: number;
}

class CurrentLessonSocket extends React.Component {
    constructor(props:any) {
        super(props);
        this.state = { currentLesson: 2 };
        this.handleData = this.handleData.bind(this);
    }

    // public getCurrentLesson() {
    //     return this.state.currentLesson;
    // }

    public render(): React.ReactNode {

        return (
                <Websocket
                    url={this.getSocketUrl()}
                    onMessage={this.handleData}
                    debug={true}
                />
        );
    }
    private handleData(data: any): void {
        // const result = JSON.parse(data);
        // this.setState({ currentLesson: result });
        console.log(data);
    }

    public getSocketUrl = (): string => {
        const loc = window.location;

        let newUrl: string;

        if (loc.host === 'localhost:3000') {
            newUrl = 'ws://localhost:8080/ws/currentLesson';
        } else {
            newUrl = ' wss://java-menuo-su-it.northeurope.cloudapp.azure.com/ws/currentLesson';
        }

        return newUrl;
    };
}

export { CurrentLessonSocket };
