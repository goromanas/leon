import React from "react";

import styles from "./chat-list.module.scss";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  text: string;
  author: string;
  date: string;
}

const Message: React.FC<Props> = ({ text, author, date }) => (
  <div className={styles.message}>
    <div>
      <Avatar size="small" icon={<UserOutlined />} />
      <span className={styles.author}>{author}</span> <span className={styles.timestamp}>{date}</span>
    </div>
    <div>{text}</div>
  </div>
);

export { Message };
