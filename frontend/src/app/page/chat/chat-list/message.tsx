import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';

import styles from './chat-list.module.scss';

interface Props {
    text: string;
    author: string;
    date: string;
    channel: number;
}

const Message: React.FC<Props> = ({ text, author, date, channel }) => (
  <div className={styles.message}>
    <div>
      <Avatar size="small" icon={<UserOutlined />} />
      <span className={styles.author}>{author}</span> <span className={styles.timestamp}>{date}</span>
    </div>
    <div>{text}</div>
    <p>channel: {channel}</p>
  </div>
);

export { Message };
