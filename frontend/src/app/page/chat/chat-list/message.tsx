import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

// import Avatar from 'antd/lib/avatar/avatar';
import { Avatar } from 'app/components/avatar/avatar';

import styles from './message.module.scss';

interface Props {
    text: string;
    author: string;
    date: string;
    channel: number;
    classroom: string;
    toRight: boolean;
    role: string;
    teachersList: string[];
}

const Message: React.FC<Props> = (
    { text, author, date, channel, classroom, toRight, role, teachersList }) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Ap', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    let dateDisplay = date;
    const today = new Date();
    const minutes = moment(date).format('mm');

    if (dateDisplay.toString().length > 5) {
        const a = new Date(date);

        if (a.getDate() < today.getDate()) {
            dateDisplay = monthNames[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getHours().toString() + ':' + minutes;
            // return;
        } else {
            dateDisplay = a.getHours().toString() + ':' + minutes;
        }
    }

    let iconName = author;
    if (author && author.includes(' ')) {
        const arr = author.split(' ');
        iconName = arr[0];
    }

    return (
        <div className={toRight ? styles.containerR : teachersList.includes(author) ? styles.containerLt : styles.containerL}>
            {!toRight && <div className={styles.avatarBox}>
                <Avatar firstName={iconName} />
            </div>}

            <div>
                {!toRight && <span className={styles.author}>
                    {/*{teachersList.includes(author) ?'Teacher | '+ author :author}*/}
                    {author}
                </span>}
                <div className={styles.message}>
                    <p>{text}</p>
                    <p className={styles.timestamp}>{dateDisplay}</p>
                </div>

            </div>
        </div>
    );
};

export { Message };
