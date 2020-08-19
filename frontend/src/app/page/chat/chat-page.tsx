import React, { useState } from 'react';
import { Layout, message } from 'antd';
import { FormikHelpers } from 'formik';
import Sider from 'antd/lib/layout/Sider';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps, INITIAL_CURRENT_LESSON } from 'app/context';
import { chatService } from 'app/api/service/chat-service';
import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';

import { ChatForm, MessageValue } from './form/chat-form';
import { ChatList } from './chat-list/chat-list';
import { Channels } from './channels';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
    teacherLessons: Api.LessonDto[];
    userRoles: string[] | null;
}

interface OwnProps {}

type Props = ContextProps & OwnProps;

interface Message {
    text: string;
    author: string;
    date: string;
    classroom?: string;
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
        currentChannel: 0,
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

        if (this.state.channels.length < 1 && userRoles.includes('STUDENT')) {
            chatService
        .getSubjects()
        .then(channels => {
            this.setState({ channels });
            this.setState({ currentChannel: channels[0].id });
        })
        .catch(() => console.log('Error getting subjects'));

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

                const copyMsg = [...this.state.messages];
                const newMsg = [...copyMsg, message];

                this.setState({
                    messages: newMsg,
                });
            };
        }}

    public render(): React.ReactNode {
        const { messages, channels, classRooms } = this.state;
        const { teacherLessons } = this.props;

        return (

     <AsyncContent
        loading={!teacherLessons && this.state.channels[0] === 0}
        loader={<PageLoadingSpinner />}
     >
      <Layout>
        <Sider>
          <Channels
            channels={channels}
            classRooms={classRooms}
            currentChannel={this.state.currentChannel}
            onChannelChange={this.onChannelChange}
            onClassChange={this.onClassChange}
          />
        </Sider>
        <Content>
          <PageContent>
         <ChatList
            messages={messages}
            currentChannel={this.state.currentChannel}
            currentClassroom={this.state.currentClassroom}
         />
            <ChatForm
              initialValues={ChatComponent.MESSAGE_INITIAL_VALUES}
              onSubmit={this.handleSubmit}
              // addFile={this.addFile}
            />
          </PageContent>
        </Content>
      </Layout>
     </AsyncContent>
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

  // public addFile = (file: any) => {
  //     this.setState({ file: file });
  //     console.log(file);
  // }

    private readonly handleSubmit = (values: MessageValue, { resetForm }: FormikHelpers<MessageValue>): void => {
        const { messages, currentChannel, currentClassroom } = this.state;
        const { teacherLessons, userRoles } = this.props;
        const time = new Date();
        const hours = time.getHours().toString();
        const minutes = time.getMinutes().toString();

        if (values.message.trim() !== '') {
            this.setState({
                messages: [...messages, {
                    text: values.message,
                    author: this.props.username,
                    date: hours + ':' + minutes,
                    channel: currentChannel,
                    classroom: currentClassroom,
                    role: userRoles,
                    teacherSubjectId: this.state.teacherSubjectId,
                }],
            });
            this.sendMessage({
                text: values.message,
                author: this.props.username,
                date: hours + ':' + minutes,
                classroom: currentClassroom,
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

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    username: user != null ? user.firstName : null,
    userRoles: user.roles,
    teacherLessons: lessons,
});

const ChatPage = connectContext(mapContextToProps)(ChatComponent);

export { ChatPage };
