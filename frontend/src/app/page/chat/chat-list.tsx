import React from 'react';

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
            <h1>Message list</h1>
            <ul>
                {messages.map(msg => (
                    <li key={msg.text}>
                        {msg.text}
                        <span style={{ fontWeight: 'bold' }}>-{msg.author}</span> {msg.date}
                    </li>
                ))}
            </ul>
        </div>
    );

export { ChatList };
