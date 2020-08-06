import React from 'react';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout';

import { ChatForm, MessageValue } from './form/chat-form';

const { Content } = Layout;

class ChatPage extends React.Component {
    private static readonly MESSAGE_INITIAL_VALUES: MessageValue = { message: '' };

    public render(): React.ReactNode {
        return (
            <Layout>
                <Content>
                    <PageContent>
                        <div>Messages List</div>
                        <ChatForm initialValues={ChatPage.MESSAGE_INITIAL_VALUES} onSubmit={this.handleSubmit} />
                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly handleSubmit = (values: MessageValue): void => {
        console.log(values);
    };
}

export { ChatPage };
