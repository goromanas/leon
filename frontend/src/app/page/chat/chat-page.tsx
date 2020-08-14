import React from 'react';
import { Layout } from 'antd';
import { FormikHelpers } from 'formik';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';

import { ChatForm, MessageValue } from './form/chat-form';
import { ChatList } from './chat-list/chat-list';
import { Channels } from './channels';

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
    className: string | null;
    lessonId: number | null;
}

class ChatComponent extends React.Component<Props, State> {
    public getSocketUrl = (): string => {
        const loc = window.location;
        let newUrl: string;
        if (loc.host === 'localhost:3000') {
            newUrl = 'ws://localhost:8080/ws/chat';
        } else {
            newUrl = ' wss://java-menuo-su-it.northeurope.cloudapp.azure.com/ws/chat';
        }
        return newUrl;
    };

    public ws = new WebSocket(this.getSocketUrl());

    public readonly state: State = {
        messages: [{ text: 'first message', author: 'Mokinys1', date: '12:45' },
                   { text: 'second message', author: 'Mokinys2', date: '12:55' }],
        file: null,
        className: null,
        lessonId: null,
    };
    public static MESSAGE_INITIAL_VALUES: MessageValue = { message: '' };

    // tslint:disable-next-line:typedef
    public componentDidMount() {
        const { messages } = this.state;
        const { teacherLessons } = this.props;
        console.log(teacherLessons)
        // this.ws.onopen = () => {
        //     console.log('connected');
        // };

        this.ws.onmessage = e => {
            const message = JSON.parse(e.data);
            // console.log('Chat page receives ',message.classroom);

            const copyMsg = [...this.state.messages];
            const newMsg = [...copyMsg, message];

            this.setState({
                messages: newMsg,
            });
        };
    }

    public render(): React.ReactNode {
        const { messages } = this.state;
        const { teacherLessons } = this.props;

        if (teacherLessons) {
            console.log(teacherLessons);
            const removedDuplicates = (teacherLessons: Api.Lesson[]) => {
                const result = teacherLessons.reduce((acc, current) => {
                    const x = acc.find((item) => item.subject === current.subject);
                    console.log(x);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                return result;
            };
            // console.log(removedDuplicates)
        }


        return (
            <Layout>
                <Content>
                    <PageContent>
                        {/*<Channels lessons={teacherLessons} />*/}
                        <ChatList messages={messages} />
                        <ChatForm
                            initialValues={ChatComponent.MESSAGE_INITIAL_VALUES}
                            onSubmit={this.handleSubmit}
                            // addFile={this.addFile}
                        />
                    </PageContent>
                </Content>
            </Layout>
        );
    }

    // public addFile = (file: any) => {
    //     this.setState({ file: file });
    //     console.log(file);
    // }

    public sendMessage = (message: Message) => {
        try {
            // console.log(message)
            this.ws.send(JSON.stringify(message));
        } catch (error) {
            console.log(error); // catch error
        }
    };

    private readonly handleSubmit = (values: MessageValue, { resetForm }: FormikHelpers<MessageValue>): void => {
        const { messages } = this.state;
        const { teacherLessons } = this.props;
        const time = new Date();
        const hours = time.getHours().toString();
        const minutes = time.getMinutes().toString();
        // console.log(Object.keys(this.props.teacherLessons[0]));
        // console.log(this.props.teacherLessons[0]["className"]);

        // @ts-ignore
        const className: string = this.props.teacherLessons[0].className;

        console.log(teacherLessons);
        // const id: number = this.props.teacherLessons
        console.log(values.message);
        if (values.message.trim() !== '') {
            this.setState({
                messages:
                    [...messages, { text: values.message, author: this.props.username, date: hours + ':' + minutes }],
                className,
            });
            this.sendMessage({
                text: values.message,
                author: this.props.username,
                date: hours + ':' + minutes,
                classroom: className,
                // id:
            });
        }
        resetForm();
        this.setState({ file: null });
    };

}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    teacherLessons: lessons,
});

const ChatPage = connectContext(mapContextToProps)(ChatComponent);

export { ChatPage };
