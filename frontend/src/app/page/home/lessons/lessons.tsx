import React from 'react';
import { Button } from 'antd';

import styles from './lessons.module.scss';

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

interface Props {
    lessonsList: Api.Lesson[];
}

class Lessons extends React.Component<Props> {

    public render(): React.ReactNode {

        const { lessonsList } = this.props;
        const activeLesson = { backgroundColor: '#636363' };
        const allLessons = lessonsList.map((item) =>
            (
                <li className={styles.listItem} key={item.id} >
                    <div className={styles.classNumber} style={item.status === 1 ? activeLesson : null}>{
                        lessonsList.indexOf(item) + 1}.
                    </div>
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
                <h1>Šiandienos pamokos({lessonsList.length})</h1>
                <ul className={styles.list}>
                    {allLessons}
                </ul>
            </div>

        );
    }

}

export { Lessons };
