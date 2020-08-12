import React, { useState, useEffect } from 'react';

import { navigationService } from 'app/service/navigation-service';

import { SingleLesson } from './single-lesson';

import styles from './lessons.module.scss';

interface Props {
    lessonsList: Api.Lesson[];
}

// navigate to video chat by class number id. Passed function in SingleLesson
const handleOpenClassroom = (id: number): void => {
    navigationService.redirectToVideoChat(id);
};

// create new websocket instance
const ws = new WebSocket('ws://localhost:8080/currentLesson');

const DayLessonsList: React.FC<Props> = ({ lessonsList }) => {
    const [currentLesson, setCurrentLesson] = useState(0);
    const positionInList = (e: any) => lessonsList.indexOf(e) + 1;

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            setCurrentLesson(parseInt(evt.data, 10));
        };

        ws.onclose = () => {
            console.log('disconnected');
        };
    }, []);

    const allLessons = lessonsList.map((item: any) => (
        <SingleLesson
            positionInList={positionInList(item)}
            currentLesson={currentLesson}
            lesson={item}
            key={item.id}
            handleOpenClassroom={handleOpenClassroom}
        />
    ));
    return (
        <div>
            <h1 className={styles.classListHeader}>Šiandienos pamokos({lessonsList.length})</h1>
            <ul className={styles.list}>{allLessons}</ul>
        </div>
    );
};

export { DayLessonsList };
