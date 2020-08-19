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
}

const Message: React.FC<Props> = ({ text, author, date, channel, classroom }) => (
  <div >
      <div>
          <Avatar size="small" icon={<UserOutlined />} />
      </div>

    <div>
      <span className={styles.author}>{author}</span>
        <div className={styles.message}>
            {text}
            <span className={styles.timestamp}>{date}</span>
        </div>

    {/*<p>channel: {channel}</p>*/}
    {/*<p>Clasroom: {classroom}</p>*/}
    </div>
  </div>
);

export { Message };
