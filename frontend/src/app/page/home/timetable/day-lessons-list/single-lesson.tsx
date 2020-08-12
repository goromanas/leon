import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import { navigationService } from 'app/service/navigation-service';

import styles from './lessons.module.scss';

interface Props {
    positionInList: number;
    currentLesson: number;
    lesson: any;
}

const { listItem, activeLesson, upcomingLesson, listNumber, listContent } = styles;

const handleOpenClassroom = (id?: number): void => {
    navigationService.redirectToVideoChat(id);
};

const SingleLesson: React.FC<Props> = ({ currentLesson, positionInList, lesson }) => {
    const listClass = classNames(
        listItem,
        positionInList === currentLesson && activeLesson,
        positionInList > currentLesson && upcomingLesson,
    );
    const numberClass = classNames(
        listNumber,
        positionInList === currentLesson && activeLesson,
        positionInList > currentLesson && upcomingLesson,
    );
    const contentClass = classNames(
        listContent,
        positionInList === currentLesson && activeLesson,
        positionInList > currentLesson && upcomingLesson,
    );

    return (
        < li className={listClass} key={lesson.id} >
            <div
                className={numberClass}
            >
                {positionInList}.
            </div>
            <div
                className={contentClass}
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
        </li >
    );

};

export { SingleLesson };
