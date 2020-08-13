import React from 'react';

import { Message } from './message'

interface Message {
    text: string;
    author: string;
    date: string;
}

interface Props {
    messages: Message[];
}

const ChatList: React.FC<Props> = ({ messages }) =>
    (
        <div>
            <ul>
                {messages.map((msg, i) => (
                    <Message key={i} text={msg.text} author={msg.author} date={msg.date} />
                ))}
            </ul>
        </div>
    );

export { ChatList };
