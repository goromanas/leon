import React, { useState } from 'react';
import { Button } from 'antd';

import { navigationService } from 'app/service/navigation-service';

import { SingleLesson } from './single-lesson';

import styles from './lessons.module.scss';

interface Props {
    lessonsList: Api.Lesson[];
}

const handleOpenClassroom = (id?: number): void => {
    navigationService.redirectToVideoChat(id);
};

const DayLessonsList: React.FC<Props> = ({ lessonsList }) => {
    const [currentLesson, setCurrentLesson] = useState(2);
    const positionInList = (e: any) => lessonsList.indexOf(e) + 1;

    const handleData = (data: any): void => {
        setCurrentLesson(data);
    };

    const allLessons = lessonsList.map((item: any) => (
        <SingleLesson positionInList={positionInList(item)} currentLesson={currentLesson} lesson={item} key={item.id} />
    ));
    return (
        <div>
            <h1 className={styles.classListHeader}>Šiandienos pamokos({lessonsList.length})</h1>
            <ul className={styles.list}>{allLessons}</ul>
        </div>
    );
};

export { DayLessonsList };
