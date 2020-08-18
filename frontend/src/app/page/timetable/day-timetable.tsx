import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { navigationService } from 'app/service/navigation-service';

import { scheduleCalc } from './schedule-calc';
import { SingleLesson } from './single-lesson';

import styles from './lessons.module.scss';

interface Props {
    allLessons: Api.Lesson[];
    schedule: Api.ScheduleDto[];
    currentLesson: number;
    userRole: string[];
    day: number;
    date: string;
    homepage?: boolean;
}

const DayLessonsList: React.FC<Props> = ({ allLessons, userRole, day, date, currentLesson, schedule, homepage }) => {

    // filter this { day } lessons from allLessons
    const dayLessons = allLessons && allLessons.filter((lesson: Api.Lesson) =>
        lesson.day === day);

    // navigate to video chat by class number id. Passed function in SingleLesson
    const handleOpenClassroom = (id: number): void => {
        navigationService.redirectToVideoChat(id);
    };

    const lessonsList = dayLessons.map((item: any) => (

        <SingleLesson
            key={item.id}
            currentLesson={currentLesson}
            thisLesson={item}
            handleOpenClassroom={handleOpenClassroom}
            schedule={schedule}
            userRole={userRole}
            date={date}
            homepage={homepage}
        />
    ));

    return (
        <div className={styles.day}>
            <h1 className={styles.dayHeader}>
                <span>
                    {(scheduleCalc.getDayFromInt(day).toUpperCase())} {moment().format('MM-DD') === date ? `(TODAY)` : ''}
                </span>
                <span>{date}</span>
            </h1>
            {date === moment().format('MM-DD') && homepage ?
                <h1 className={styles.dayHeader}>Today's lecture ({dayLessons.length})</h1>
                : null
            }
            <div className={styles.dayLessonsList}>{lessonsList}</div>
        </div>
    );
};

export { DayLessonsList };
