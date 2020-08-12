import React from 'react';
// @ts-ignore
// import Websocket from 'react-websocket';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';

import { ChatForm, MessageValue } from './form/chat-form';
import { FormikHelpers } from 'formik';
import { LoginValues } from 'app/page/login/form/login-form';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
}

interface OwnProps {
}

type Props = ContextProps & OwnProps;

interface Message {
    text: string;
    author: string;
    date: string;
}

interface State {
    messages: Message[];
}

class ChatComponent extends React.Component<Props, State> {
    public ws = new WebSocket('ws://localhost:8080/currentLesson');
    public readonly state: State = {
        messages: [{ text: 'first message', author: 'no', date: 'no' },
                   { text: 'second message', author: 'no', date: 'no' }],
    };
    public static MESSAGE_INITIAL_VALUES: MessageValue = { message: '' };

    public componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected');
        };
    }

    public render(): React.ReactNode {
        const { messages } = this.state;

        return (
            <Layout>
                <Content>
                    <PageContent>
                        <div>{messages.map(msg => (
                            <li key={msg.text}>
                                {msg.text}
                                <span style={{ fontWeight: 'bold' }}>-{msg.author}</span> {msg.date}
                            </li>
                        ))}</div>
                        <ChatForm initialValues={ChatComponent.MESSAGE_INITIAL_VALUES} onSubmit={this.handleSubmit} />
                    </PageContent>
                </Content>
            </Layout>
        );
    }

    public sendMessage = (message: Message) => {
        try {
            console.log(message);
            this.ws.send(JSON.stringify(message));
        } catch (error) {
            console.log(error); // catch error
        }
    };

    private readonly handleSubmit = (values: MessageValue, { resetForm }: FormikHelpers<MessageValue>): void => {
        const { messages } = this.state;
        const time = new Date();
        const hours = time.getHours().toString();
        const minutes = time.getMinutes().toString();

        this.setState({
            messages:
                [...messages, { text: values.message, author: this.props.username, date: hours + ':' + minutes }]
        });
        this.sendMessage({ text: values.message, author: this.props.username, date: hours + ':' + minutes });
        resetForm();
    };

}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
});

const ChatPage = connectContext(mapContextToProps)(ChatComponent);

export { ChatPage };
