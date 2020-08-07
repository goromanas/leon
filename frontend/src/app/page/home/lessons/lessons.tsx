import React from 'react';
import { Button } from 'antd';

import styles from './lessons.module.scss';
import { navigationService } from 'app/service/navigation-service';

interface Props {
    lessonsList: Api.Lesson[];
}

class Lessons extends React.Component<Props> {
    public render(): React.ReactNode {
        const { lessonsList } = this.props;
        const activeLesson = { backgroundColor: '#636363' };
        const allLessons = lessonsList.map((item) => (
            <li className={styles.listItem} key={item.id}>
                <div className={styles.classNumber} style={item.status === 1 ? activeLesson : null}>
                    {lessonsList.indexOf(item) + 1}.
                </div>
                <div className={styles.listContent} style={item.status === 1 ? activeLesson : null}>
                    {item.subject}
                    {item.status === 0 ? (
                        <Button
                            type="primary"
                            className={styles.toVideoButton}
                            onClick={() => this.handleOpenClassroom(item.id)}
                        >
                            Prisijungti į pamoką
                        </Button>
                    ) : null}
                </div>
            </li>
        ));

        return (
            <div>
                <h1>Šiandienos pamokos({lessonsList.length})</h1>
                <ul className={styles.list}>{allLessons}</ul>
            </div>
        );
    }
    private readonly handleOpenClassroom = (id?: number): void => {
        navigationService.redirectToVideoChat(id);
    };
}

export { Lessons };
