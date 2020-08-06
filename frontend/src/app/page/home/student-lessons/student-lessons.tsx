import React from 'react';
import { Button } from 'antd';

import styles from './student-lessons.module.scss';

const data = [
    {
        subject: 'Matematika',
        status: 0,
    },
    {
        subject: 'Lietuvių kalba',
        status: 1,
    },
    {
        subject: 'Biologija',
        status: 0,
    },
];

class StudentLessons extends React.Component {

    public render(): React.ReactNode {
        const activeLesson = { backgroundColor: '#636363' };
        const allLessons = data.map((item) =>
            (
                <li className={styles.listItem} key={item.subject} >
                    <div className={styles.classNumber} style={item.status === 1 ? activeLesson : null}>1.</div>
                    <div className={styles.listContent} style={item.status === 1 ? activeLesson : null}>{item.subject}
                        {
                            item.status === 1 ?
                                <Button type="primary" className={styles.toVideoButton}>Prisijungti į pamoką</Button>
                                : null
                        }
                    </div>
                </li >
            ),
        );

        return (
            <div>
                <h1>Šiandienos pamokos({data.length})</h1>
                <ul className={styles.list}>
                    {allLessons}
                </ul>
            </div>

        );
    }

}

export { StudentLessons };
