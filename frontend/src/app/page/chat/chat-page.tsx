import React from 'react';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';

import { ChatForm, MessageValue } from './form/chat-form';
import { ChatList } from './chat-list';
import {Channels} from './channels';
import { FormikHelpers } from 'formik';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
    teacherLessons: Api.Lesson[];
}

interface OwnProps {
}

type Props = ContextProps & OwnProps;

interface Message {
    text: string;
    author: string;
    date: string;
    classroom?: string;
}

interface State {
    messages: Message[];
    file: any;
}

class ChatComponent extends React.Component<Props, State> {
    public ws = new WebSocket('ws://localhost:8080/ws/currentLesson');
    public readonly state: State = {
        messages: [{ text: 'first message', author: 'no', date: 'no' },
                   { text: 'second message', author: 'no', date: 'no' }],
        file: null,
    };
    public static MESSAGE_INITIAL_VALUES: MessageValue = { message: '' };

    public componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected');
        };
        this.ws.onmessage = e => {
            const message = JSON.parse(e.data);
            console.log('Chat page receives ',message);
        }
    }

    public render(): React.ReactNode {
        const { messages } = this.state;
        // console.log(this.state);
        return (
            <>
            <Layout>
                <Content>
                    <PageContent>
                        {/*<Channels lessons={this.props.teacherLessons[0].subject} />*/}
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
            console.log(message)
            this.ws.send(JSON.stringify(message));
            console.log(message);
        } catch (error) {
            console.log(error); // catch error
        }
    };

    private readonly handleSubmit = (values: MessageValue, { resetForm }: FormikHelpers<MessageValue>): void => {
        const { messages } = this.state;
        const time = new Date();
        const hours = time.getHours().toString();
        const minutes = time.getMinutes().toString();
        // console.log(Object.keys(this.props.teacherLessons[0]));
        // console.log(this.props.teacherLessons[0]["className"]);

        // @ts-ignore
        const className: string = this.props.teacherLessons[0]["className"]
        this.setState({
            messages:
                [...messages, { text: values.message, author: this.props.username, date: hours + ':' + minutes}]
        });
        this.sendMessage({
            text: values.message,
            author: this.props.username,
            date: hours + ':' + minutes,
            classroom: className,
        });
        resetForm();
        this.setState({ file: null });
    };

}

const mapContextToProps = ({ session: { user }, lessons, }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    teacherLessons: lessons,
});

const ChatPage = connectContext(mapContextToProps)(ChatComponent);

export { ChatPage };
