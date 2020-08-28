import React, { useState } from 'react';
import { Layout, message } from 'antd';
import { FormikHelpers } from 'formik';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ReconnectingWebSocket from 'reconnecting-websocket';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';
import { chatService } from 'app/api/service/chat-service';
import { AsyncContent } from 'app/components/layout';

import { ChatForm, MessageValue } from './form/chat-form';
import { ChatList } from './chat-list/chat-list';
import { Channels } from './channels';

import styles from './chat-page.module.scss';
import { ComponentLoadingSpinner } from '../common/page-loading-spinner/component-loading-spinner';
import { ComponentSmallSpinner } from 'app/page/common/page-loading-spinner/component-small-spinner';

const { Content, Sider } = Layout;

interface ContextProps {
    username: string | null;
    lastname: string | null;
    teacherLessons: Api.LessonDto[];
    userRoles: string[] | null;
    wsChat: any;
    channelsWithNewMessages: number[];
    newMessages: Message[];
    updateNewMessages: (newMessage: Message) => void;
    filterNewMessages: (channelId: number) => void;
}

interface OwnProps { }

type Props = ContextProps & OwnProps;

interface Message {
    content: string;
    username: string;
    date: string;
    classname?: string;
    subject?: number;
    channel?: number;
    role?: string[];
    teacherSubjectId?: number;
}

interface State {
    messages: Message[];
    file: any;
    className: string | null;
    lessonId: number | null;
    channels: Api.Subject[];
    classRooms: Api.ClassroomDto[];
    currentChannel: number | null;
    currentClassroom: string | null;
    teacherSubjectId: number;
}

class ChatComponent extends React.Component<Props, State> {
    public readonly state: State = {
        messages: [],
        file: null,
        className: null,
        lessonId: null,
        channels: [],
        classRooms: [],
        currentChannel: 1,
        currentClassroom: '',
        teacherSubjectId: 1,
    };

    public static MESSAGE_INITIAL_VALUES: MessageValue = { message: '' };

    public componentDidUpdate(prev: Props, prevState: State) {
        const { messages, currentChannel } = this.state;
        const { userRoles, newMessages, filterNewMessages } = this.props;

        if (prev.teacherLessons !== this.props.teacherLessons && userRoles.includes('STUDENT')) {
            const { teacherLessons } = this.props;

            if ((teacherLessons && teacherLessons.length > 0) && userRoles.includes('STUDENT')) {
                this.setState({ currentClassroom: teacherLessons[0].className });
            }
        }

if(newMessages.length !== 0 ){
        if ( prev.newMessages !== this.props.newMessages) {
            this.setState({ ...this.state, messages: [...messages, ...newMessages] });
            filterNewMessages(currentChannel);
        }}


    }

    // tslint:disable-next-line:typedef
    public componentDidMount() {
        const { messages } = this.state;
        const { teacherLessons, userRoles, newMessages } = this.props;
        const currentChannel: number = 1;

        console.log(teacherLessons);
        chatService.getChatMessages()
            .then((data: any) => {
                this.setState({
                    messages: [...data],
                });
            })
            .catch(() => console.log('Error getting subjects'));

        if (this.state.channels.length < 1 && userRoles.includes('STUDENT')) {
            chatService
                .getSubjects()
                .then(channels => {
                    this.setState({ channels });
                    this.setState({ currentChannel: channels[0].id });
                    this.setState({ currentClassroom: teacherLessons[0].className });
                })
                .catch(() => console.log('Error getting subjects'));
        }

        if (this.state.channels.length < 1 && userRoles.includes('TEACHER')) {
            chatService
                .getClassrooms()
                .then(classRooms => {
                    this.setState({ classRooms, currentClassroom: classRooms[0].classroomName });
                })

                .catch(() => console.log('Error getting subjects'));

            chatService.getTeacherSubject()
                .then(teacherSubject => {
                    this.setState({ currentChannel: teacherSubject.id });
                })
                .catch(() => console.log('Error getting teacher subject'));

        }

        if (this.state.channels.length > 0) {
            this.setState({ currentChannel: this.state.channels[0].id });
        }
    }

    public render(): React.ReactNode {
        const { messages, channels, classRooms } = this.state;
        const { teacherLessons, channelsWithNewMessages, newMessages } = this.props;

        const teachersList = teacherLessons && teacherLessons.map(lesson => lesson.teacher);

        return (

            <AsyncContent
                loading={!teacherLessons && !this.state.channels}
                loader={<ComponentSmallSpinner />}
            >

                <Layout >
                    <Sider theme="light" className={styles.sider} width="250px">
                        <Channels
                            channels={channels}
                            classRooms={classRooms}
                            currentChannel={this.state.currentChannel}
                            currentClassroom={this.state.currentClassroom}
                            onChannelChange={this.onChannelChange}
                            onClassChange={this.onClassChange}
                            role={this.props.userRoles[0]}
                        />
                    </Sider>
                    <Content style={{ background: 'white', overflow: 'hidden', height: '92vh' }} >
                        <PageContent >
                            <ChatList
                                messages={messages}
                                currentChannel={this.state.currentChannel}
                                currentClassroom={this.state.currentClassroom}
                                teachersList={teachersList}
                                username={this.props.username + ' ' + this.props.lastname}
                            />
                            <ChatForm
                                initialValues={ChatComponent.MESSAGE_INITIAL_VALUES}
                                onSubmit={this.handleSubmit}
                            />
                        </PageContent>
                    </Content>
                </Layout>

            </AsyncContent>
        );
    }

    public sendMessage = (message: Message) => {
        try {
            // console.log(message)
            this.props.wsChat.send(JSON.stringify(message));
        } catch (error) {
            console.log(error); // catch error
        }
    };

    private readonly handleSubmit = (values: MessageValue, { resetForm }: FormikHelpers<MessageValue>): void => {
        const { messages, currentChannel, currentClassroom } = this.state;
        const { userRoles } = this.props;
        const time = new Date();
        const hours = time.getHours().toString();
        const minutes = time.getMinutes().toString();

        if (values.message.trim() !== '') {

                this.setState({
                    messages: [...messages, {
                        content: values.message,
                        username: this.props.username + ' ' + this.props.lastname,
                        date: hours + ':' + minutes,
                        channel: currentChannel,
                        classname: currentClassroom,
                        role: userRoles,
                        teacherSubjectId: this.state.teacherSubjectId,
                    }],
                });
                this.sendMessage({
                    content: values.message,
                    username: this.props.username + ' ' + this.props.lastname,
                    date: hours + ':' + minutes,
                    classname: currentClassroom,
                    channel: currentChannel,
                    role: userRoles,
                    teacherSubjectId: this.state.teacherSubjectId,
                });
        }
        resetForm();
        this.setState({ file: null });
    };

    private readonly onChannelChange = (id: number): void => {
        this.setState({
            currentChannel: id,
        });
    };

    private readonly onClassChange = (name: string): void => {
        this.setState({
            currentClassroom: name,
        });
    };
}

const mapContextToProps = ({ session: { user }, wsChat, lessons, channelsWithNewMessages, newMessages, actions: { updateNewMessages, filterNewMessages } }: SettingsProps): ContextProps => ({
    username: user != null ? user.firstName : null,
    lastname: user != null ? user.lastName : null,
    userRoles: user.roles,
    teacherLessons: lessons,
    wsChat,
    channelsWithNewMessages,
    newMessages,
    updateNewMessages,
    filterNewMessages,
});

const ChatPage = connectContext(mapContextToProps)(ChatComponent);

export { ChatPage };
