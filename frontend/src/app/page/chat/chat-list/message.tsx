import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';

import styles from './message.module.scss';

interface Props {
    text: string;
    author: string;
    date: string;
    channel: number;
    classroom: string;
    toRight: boolean
}

const Message: React.FC<Props> = (
    { text, author, date, channel, classroom, toRight }) => {
    let dateDisplay = date
    if (dateDisplay.toString().length> 5){
        let a = new Date(date)
        let minutes = a.getMinutes().toString().length === 1 ? a.getMinutes().toString() + '0': a.getMinutes().toString()
        dateDisplay = a.getHours().toString()+ ':' + minutes
    }
    return (
        <div className={toRight ? styles.containerR : styles.containerL}>
            {!toRight && <div className={styles.avatarBox}>
                <Avatar
                    className={styles.avatar}
                    size="large" icon={
                    <UserOutlined
                        className={styles.userIcon}
                        style={{fontSize: '25px'}}/>}
                    style={{color: 'white'}}
                />
            </div>}

            <div>
                {!toRight && <span className={styles.author}>{author}</span>}
                <div className={styles.message}>
                    <p>{text}</p>
                    <p className={styles.timestamp}>{dateDisplay}</p>
                </div>

            </div>
        </div>
    );
};

export { Message };
