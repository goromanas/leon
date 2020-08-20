import React, { useState } from 'react';
import { Layout, message } from 'antd';
import { FormikHelpers } from 'formik';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';
import { chatService } from 'app/api/service/chat-service';
import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';

import { ChatForm, MessageValue } from './form/chat-form';
import { ChatList } from './chat-list/chat-list';
import { Channels } from './channels';

import styles from './chat-page.module.scss';

const { Content, Sider } = Layout;

interface ContextProps {
    username: string | null;
    teacherLessons: Api.LessonDto[];
    userRoles: string[] | null;
}

interface OwnProps {}

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
        messages: [],
        file: null,
        className: null,
        lessonId: null,
        channels: [],
        classRooms: [],
        currentChannel: 1,
        currentClassroom:  '',
        teacherSubjectId: 1,
    };

    public static MESSAGE_INITIAL_VALUES: MessageValue = { message: '' };


    public componentDidUpdate(prev: Props, prevState: State) {
        const { userRoles } = this.props;

        if (prev.teacherLessons !== this.props.teacherLessons && userRoles.includes('STUDENT')) {
            const { teacherLessons } = this.props;

            if ((teacherLessons && teacherLessons.length > 0) && userRoles.includes('STUDENT')) {
                this.setState({ currentClassroom: teacherLessons[0].className });
            }
        }

    }

  // tslint:disable-next-line:typedef
    public componentDidMount() {
        const { messages } = this.state;
        const { teacherLessons, userRoles } = this.props;
        const currentChannel: number = 1;

        chatService.getChatMessages()
            .then((data: any) => {
                // console.log(data[0]);
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

        // console.log(teacherLessons);
        //     if (teacherLessons && teacherLessons.length > 0) {
        //         this.setState({ currentClassroom: teacherLessons[0].className });
        //         console.log.log('Student classname' + this.state.className)
        //     }
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
        const { messages, channels, classRooms } = this.state;
        const { teacherLessons } = this.props;

        // console.log(messages);
        // console.log(this.state.currentClassroom);
        // console.log(this.state.currentChannel);
        return (

     <AsyncContent
        loading={!teacherLessons && !this.state.channels}
        loader={<PageLoadingSpinner />}
     >

         <Layout >
            <Sider theme="light" className={styles.sider} width="250px">
              <Channels
                channels={channels}
                classRooms={classRooms}
                currentChannel={this.state.currentChannel}
                onChannelChange={this.onChannelChange}
                onClassChange={this.onClassChange}
              />
           </Sider>
            <Content style={{ background: 'white' }} >
             <PageContent >
            <ChatList
                messages={messages}
                currentChannel={this.state.currentChannel}
                currentClassroom={this.state.currentClassroom}
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
            this.ws.send(JSON.stringify(message));
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
            console.log(this.props.username)
            this.setState({
                messages: [...messages, {
                    content: values.message,
                    username: this.props.username,
                    date: hours + ':' + minutes,
                    channel: currentChannel,
                    classname: currentClassroom,
                    role: userRoles,
                    teacherSubjectId: this.state.teacherSubjectId,
                }],
            });
            this.sendMessage({
                content: values.message,
                username: this.props.username,
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
        // console.log(this.state.currentChannel);
    };

    private readonly onClassChange = (name: string): void => {
        this.setState({
            currentClassroom: name,
        });
        // console.log(this.state.currentClassroom);
    };
}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    username: user != null ? user.firstName : null,
    userRoles: user.roles,
    teacherLessons: lessons,
});

const ChatPage = connectContext(mapContextToProps)(ChatComponent);

export { ChatPage };
