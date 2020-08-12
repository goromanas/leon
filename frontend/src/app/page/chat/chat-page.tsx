import React from 'react';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout';

import { ChatForm, MessageValue } from './form/chat-form';
import { connectContext, SettingsProps } from 'app/context';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
}
interface OwnProps {}

type Props = ContextProps & OwnProps;

interface Message { text: string; author: string; date: string; }

interface State {
    messages: Message[];
}

class ChatComponent extends React.Component<Props, State> {
    public readonly state: State = {
        messages: [{ text: 'first message', author: 'no', date: 'no' },
                   { text: 'second message', author: 'no', date: 'no' }],
    };
    private static readonly MESSAGE_INITIAL_VALUES: MessageValue = { message: '' };

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

    private readonly handleSubmit = (values: MessageValue): void => {
        const { messages } = this.state;
        const time = new Date();
        const hours = time.getHours().toString();
        const minutes = time.getMinutes().toString();

        this.setState({ messages:
                [...messages, { text: values.message, author: this.props.username, date: hours + ':' + minutes }] });

    };
}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
});

const ChatPage = connectContext(mapContextToProps)(ChatComponent);

export { ChatPage };
