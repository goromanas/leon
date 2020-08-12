import React from 'react';
// @ts-ignore
import Websocket from 'react-websocket';

interface State { currentLesson?: number }
interface OwnProps {
}

type Props = OwnProps;

class CurrentLesson extends React.Component<Props, State> {
// @ts-ignore
    constructor(props: any) {
        super(props);
        this.state = {
            currentLesson: 1
        };
    }

    handleData(data: any) {
        //let result = JSON.parse(data);
        console.log(data);
        //this.setState({currentLesson: result});
    }

    render() {
        return (
            <div>
                CurrentLesson <strong>{this.state.currentLesson}</strong>

                <Websocket
                           url='ws://localhost:8080/currentLesson'
                           onMessage={this.handleData.bind(this)} />
            </div>
        );
    }
}

export default CurrentLesson;
