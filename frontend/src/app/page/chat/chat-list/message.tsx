import React from 'react';

import styles from './chat-list.module.scss';

interface Props {
    text: string;
    author: string;
    date: string;
}

const Message: React.FC<Props> = ({ text,author, date }) =>
    (
        <div className={styles.message}>
            <div><span style={{ fontWeight: 'bold' }}>{author}</span> {date}</div>
            <div>{text}</div>
        </div>
    );

export { Message };
