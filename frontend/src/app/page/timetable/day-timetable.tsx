import React, { useState, useEffect, useRef, ReactElement } from 'react';
import ReactTooltip from 'react-tooltip';
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
}

const DayLessonsList: React.FC<Props> = ({ allLessons, userRole, day, date, currentLesson, schedule }) => {

    // filter this { day } lessons from allLessons
    const dayLessons = allLessons && allLessons.filter((lesson: Api.Lesson) =>
        lesson.day === day);

    // navigate to video chat by class number id. Passed function in SingleLesson
    const handleOpenClassroom = (id: number): void => {
        navigationService.redirectToVideoChat(id);
    };

    const lessonsList = dayLessons.map((item: any) => (
        <div key={item.id}>
            <SingleLesson
                currentLesson={currentLesson}
                thisLesson={item}
                handleOpenClassroom={handleOpenClassroom}
                schedule={schedule[item.time - 1]}
                userRole={userRole}
                date={date}
            />
            < span
                data-tip="Break"
                style={{ height: scheduleCalc.getBreakTime(schedule, item.time) }}
                className={styles.breakSpan}
            />
            <ReactTooltip />

        </div>
    ));

    const listClass = classNames(
        styles.list,
        // moment().format('YYYY-MM-DD') !== date && styles.listOtherDay,
        styles.listOtherDay,
    );
    return (
        <div>
            <h1 className={styles.classListHeader}>
                {(scheduleCalc.getDayFromInt(day))} {moment().format('YYYY-MM-DD') === date ? `(today)` : ``}
                <h3>{date}</h3>
            </h1>
            <h1 className={styles.classListHeader}>Today's lecture ({dayLessons.length})</h1>

            <ul className={listClass}>{lessonsList}</ul>

        </div>
    );
};

export { DayLessonsList };
