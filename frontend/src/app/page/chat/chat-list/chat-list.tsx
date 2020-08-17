import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { message } from 'antd';

import { connectContext, SettingsProps } from 'app/context';

import { Message } from './message';

interface Message {
    text: string;
    author: string;
    date: string;
    classroom?: string;
    subject?: number;
    channel?: string;
}

interface ContextProps {
    teacherLessons: Api.Lesson[];
}

interface OwnProps {
    messages: Message[];
    currentChannel: string;
}
type Props = ContextProps & OwnProps;

const ChatListComponent: React.FC<Props> = ({ messages, currentChannel }) => (
  <div>
    <ul>
      <TransitionGroup className="chat-messages" appear={true}>
        {messages
          .filter(message => message.channel === currentChannel)
          .map((msg, i) => (
            <CSSTransition key={i} timeout={300} classNames="fade" appear={true}>
              <Message key={i} text={msg.text} author={msg.author} date={msg.date} channel={parseInt(msg.channel)} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </ul>
  </div>
);

const mapContextToProps = ({ lessons }: SettingsProps): ContextProps => ({
    teacherLessons: lessons,
});

const ChatList = connectContext(mapContextToProps)(ChatListComponent);

export { ChatList };
