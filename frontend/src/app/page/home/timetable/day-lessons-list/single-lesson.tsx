import React from 'react';
import { Button } from 'antd';

import { navigationService } from 'app/service/navigation-service';

import styles from './lessons.module.scss';

interface Props {
    positionInList: number;
    currentLesson: number;
    lesson: any;
}

const activeLesson = { backgroundColor: '#636363', color: '#000000' };
const upcomingLesson = { backgroundColor: '#929292', color: '#000000' };

const handleOpenClassroom = (id?: number): void => {
    navigationService.redirectToVideoChat(id);
};

const SingleLesson: React.FC<Props> = ({ currentLesson, positionInList, lesson }) =>

    (
        <li className={styles.listItem}>
            <div
                className={styles.classNumber}
                style={positionInList === currentLesson ? activeLesson
                    : positionInList > currentLesson ? upcomingLesson : null}
            >
                {positionInList}.
            </div>
            <div
                className={styles.listContent}
                style={positionInList === currentLesson ? activeLesson
                    : positionInList > currentLesson ? upcomingLesson : null}
            >
                {lesson.subject}
                {positionInList === currentLesson ? (
                    <Button
                        type="primary"
                        className={styles.toVideoButton}
                        onClick={() => handleOpenClassroom(lesson.id)}
                    >
                        Prisijungti į pamoką
                    </Button>
                ) : null}
            </div>
        </li>
    );

export { SingleLesson };
