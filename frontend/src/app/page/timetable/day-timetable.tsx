import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { navigationService } from 'app/service/navigation-service';

import { scheduleCalc } from './schedule-calc';
import { SingleLesson } from './single-lesson';

import styles from './lessons.module.scss';

interface Props {
    allLessons: Api.LessonDto[];
    schedule: Api.ScheduleDto[];
    currentLesson: number;
    userRole: string[];
    day: number;
    date: string;
    homepage?: boolean;
}

const DayLessonsList: React.FC<Props> = ({ allLessons, userRole, day, date, currentLesson, schedule, homepage }) => {

    const { dayHeader, dayClass, dayLessonsList, activeDay } = styles;
    // filter this { day } lessons from allLessons
    const dayLessons = allLessons && allLessons.filter((lesson: Api.LessonDto) =>
        lesson.day === day);

    // navigate to video chat by class number id. Passed function in SingleLesson
    const handleOpenClassroom = (id: number): void => {
        navigationService.redirectToVideoChat(id);
    };

    const dayClasses = classNames(
        dayClass,
        moment().format('MM-DD') === date && activeDay,
    );

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
        <div className={dayClasses}>
            <h1 className={dayHeader}>
                <span>
                    {(scheduleCalc.getDayFromInt(day).toUpperCase())}
                </span>
                <span>{date}</span>
            </h1>
            {date === moment().format('MM-DD') && homepage ?
                <h1 className={dayHeader}>Today's lecture ({dayLessons.length})</h1>
                : null
            }
            <div className={dayLessonsList}>{lessonsList}</div>
        </div>
    );
};

export { DayLessonsList };
