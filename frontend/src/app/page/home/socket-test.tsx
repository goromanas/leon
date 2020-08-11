import React from 'react';
// @ts-ignore
// import Websocket from 'react-websocket';

interface State { currentLesson?: string }
interface OwnProps {
}

type Props = OwnProps;

class CurrentLesson extends React.Component<Props, State> {
    httpServletRequest: any;
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

    connect() {

        const url ='ws://localhost:8080/web-socket';
        const exampleSocket = new WebSocket(url, "protocolOne");
        exampleSocket.onopen = (data) => {
            console.log("connected to websocket!")
        }
        exampleSocket.onmessage = (data) => {
            console.log(data)
        }
    }


    render() {

        return (
            <div>
                CurrentLesson <strong>{this.state.currentLesson}</strong>
                <button onClick={this.connect}>connect to websocket</button>
                {/*<Websocket url='ws://localhost:8080/currentLesson'*/}
                {/*           onMessage={this.handleData.bind(this)}*/}
                {/*           debug={true}/>*/}

            </div>
        );
    }
}

export default CurrentLesson;
