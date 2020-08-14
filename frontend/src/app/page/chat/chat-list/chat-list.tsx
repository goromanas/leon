import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Message } from "./message";
import { connectContext, SettingsProps } from "app/context";

interface Message {
  text: string;
  author: string;
  date: string;
}

interface ContextProps {
  teacherLessons: Api.Lesson[];
}

interface OwnProps {
  messages: Message[];
}
type Props = ContextProps & OwnProps;

const ChatListComponent: React.FC<Props> = ({ messages }) => (
  <div>
    <ul>
      <TransitionGroup className="chat-messages" appear>
        {messages.map((msg, i) => (
          <CSSTransition key={i} timeout={300} classNames="fade" appear={true}>
            <Message key={i} text={msg.text} author={msg.author} date={msg.date} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  </div>
);

const mapContextToProps = ({ lessons }: SettingsProps): ContextProps => ({
  teacherLessons: lessons
});

const ChatList = connectContext(mapContextToProps)(ChatListComponent);

export { ChatList };
