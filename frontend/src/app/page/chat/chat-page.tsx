import React from 'react';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';

import { ChatForm, MessageValue } from './form/chat-form';
import { ChatList } from './chat-list';
import { FormikHelpers } from 'formik';

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
    file: any;
}

class ChatComponent extends React.Component<Props, State> {
    public ws = new WebSocket('ws://localhost:8080/currentLesson');
    public readonly state: State = {
        messages: [{ text: 'first message', author: 'no', date: 'no' },
                   { text: 'second message', author: 'no', date: 'no' }],
        file: null,
    };
    public static MESSAGE_INITIAL_VALUES: MessageValue = { message: '' };

    // public componentDidMount() {
    //     this.ws.onopen = () => {
    //         console.log('connected');
    //     };
    // }

    public render(): React.ReactNode {
        const { messages } = this.state;
        // console.log(this.state);
        return (
            <>
            <Layout>
                <Content>
                    <PageContent>
                        <ChatList messages={messages} />
                        <ChatForm
                            initialValues={ChatComponent.MESSAGE_INITIAL_VALUES}
                            onSubmit={this.handleSubmit}
                            addFile={this.addFile}
                        />
                    </PageContent>
                </Content>
            </Layout>
                </>
        );
    }

    public addFile = (file: any) => {
        this.setState({ file: file });
        console.log(file);
    }

    public sendMessage = (message: Message) => {
        try {
            // const data = new FormData();
            // if (this.state.file) {
               // data.append('file', this.state.file)
            // }
            // data.append('message', message);
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
                [...messages, { text: values.message, author: this.props.username, date: hours + ':' + minutes}]
        });
        this.sendMessage({ text: values.message, author: this.props.username, date: hours + ':' + minutes });
        resetForm();
        this.setState({ file: null });
    };

}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
});

const ChatPage = connectContext(mapContextToProps)(ChatComponent);

export { ChatPage };
