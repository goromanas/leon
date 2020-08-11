import React from 'react';
// @ts-ignore
import Websocket from 'react-websocket';

interface State { currentLesson?: string }
interface OwnProps {
}

type Props = OwnProps;

class CurrentLesson extends React.Component<Props, State> {
// @ts-ignore
    constructor(props: any) {
        super(props);
        this.state = {
            currentLesson: "test"
        };
    }

    handleData(data: any) {
        let result = JSON.parse(data);
        // this.setState({currentLesson: data});
        console.log(result)
    }


    render() {
        return (
            <div>
                CurrentLesson <strong>{this.state.currentLesson}</strong>

                <Websocket url='ws://localhost:3000/currentLesson'
                           onMessage={this.handleData.bind(this)}
                           debug={true}/>

            </div>
        );
    }
}

export default CurrentLesson;
