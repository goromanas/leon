import React from 'react'

import styles from './chat-list.module.scss';

interface Props {
    text: string;
    author: string;
    date: string;
}

const Message: React.FC<Props> = ({text,author, date}) => {
    return (
        <div className={styles.message}>
            <div><span>{author}</span> {date}</div>
            <div>{text}</div>
        </div>
    )
}

export { Message }
