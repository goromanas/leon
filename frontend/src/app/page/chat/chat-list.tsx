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
            <ul>
                {messages.map((msg, i) => (
                    <li key={i}>
                        {msg.text}
                        <span style={{ fontWeight: 'bold' }}>-{msg.author}</span> {msg.date}
                    </li>
                ))}
            </ul>
        </div>
    );

export { ChatList };
