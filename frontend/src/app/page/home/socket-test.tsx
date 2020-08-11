import React from 'react';
// @ts-ignore
import Websocket from 'react-websocket';

interface State { currentLesson?: number }

class CurrentLesson extends React.Component<State> {

    constructor(props) {
        super(props);
        this.state = {
            currentLesson: 1
        };
    }

    handleData(data) {
        let result = JSON.parse(data);
        this.setState({currentLesson: result});
    }

    render() {
        return (
            <div>
                CurrentLesson <strong>{this.state.currentLesson}</strong>

                <Websocket url='ws://localhost:8000/currentLesson/'
                           onMessage={this.handleData.bind(this)}/>
            </div>
        );
    }
}

export default CurrentLesson;
