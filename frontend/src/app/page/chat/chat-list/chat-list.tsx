import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connectContext, SettingsProps } from 'app/context';

import { Message } from './message';

import styles from './chat-list.module.scss'

interface Message {
    content: string;
    username: string;
    date: string;
    classname?: string;
    subject?: number;
    channel?: number;
}

interface ContextProps {
    teacherLessons: Api.LessonDto[];
    firstName: string | null;

}

interface OwnProps {
    messages: Message[];
    currentChannel: number;
    currentClassroom: string;
}
type Props = ContextProps & OwnProps;

const ChatListComponent: React.FC<Props> = (
    {messages, currentChannel, currentClassroom, firstName }) => {
 
    return(
        < div className={styles.container}>

            < ul>
                < TransitionGroup
                    className="chat-messages"
                    appear={true}
                >

                    {
                        messages
                            .filter(message => message.channel === currentChannel
                                && message.classname === currentClassroom
                            )
                            .map((msg, i) => (
                                <CSSTransition key={i} timeout={300} classNames="fade" appear={true}>
                                    <><Message
                                        key={i}
                                        text={msg.content}
                                        author={msg.username}
                                        date={msg.date}
                                        channel={msg.channel}
                                        classroom={msg.classname}
                                        toRight={msg.username === firstName}
                                    />

                                    </>

                                </CSSTransition>
                            ))
                    }
                </TransitionGroup>
            </ul>
        </div>
    );
}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    teacherLessons: lessons,
    firstName: user != null ? user.firstName : null,
});

const ChatList = connectContext(mapContextToProps)(ChatListComponent);

export { ChatList };
