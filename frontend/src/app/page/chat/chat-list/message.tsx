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
    { text, author, date, channel, classroom, toRight }) => (
  <div className={toRight ? styles.containerR : styles.containerL} >
      {!toRight  && <div className={styles.avatarBox}>
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
            <p className={styles.timestamp}>{date}</p>
            {'channel ' + channel}
            {'classroom ' + classroom}
        </div>

    </div>
  </div>
);

export { Message };
