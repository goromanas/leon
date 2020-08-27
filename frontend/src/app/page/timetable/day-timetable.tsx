import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { navigationService } from 'app/service/navigation-service';
import { variantsWeek, variantsUl } from 'app/page/timetable/animation';

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
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 200);

    }, []);
    // console.log(day);
    const { dayHeader, dayClass, dayLessonsList, activeDay, dayHeaderInHome } = styles;
    const dayTable = new Array(scheduleCalc.getLongestDay(allLessons));

    const dayLessons = allLessons && allLessons.filter((lesson: Api.LessonDto) =>
        lesson.day === day);

    for (let i = 0; dayTable.length > i; i++) {
        if (dayTable[i] === undefined) {
            dayTable[i] = {
                id: -1,
                lessonInformation: [],
                time: i + 1,
            };
        }
        dayLessons[i] !== undefined && dayTable[i].day === undefined &&
            dayTable.splice(dayLessons[i].time - 1, 1, dayLessons[i]);
    }

    // navigate to video chat by class number id. Passed function in SingleLesson
    const handleOpenClassroom = (id: number): void => {
        navigationService.redirectToVideoChat(id);
    };

    const dayClasses = classNames(
        dayClass,
        moment().format('YYYY-MM-DD') === date && activeDay,
    );

    const lessonsList = dayTable.map((item: any, index) => (

        <SingleLesson
            key={index}
            currentLesson={currentLesson}
            thisLesson={item}
            handleOpenClassroom={handleOpenClassroom}
            schedule={schedule}
            userRole={userRole}
            date={date}
            homepage={homepage}
            ifDayEnded={scheduleCalc.ifDayEnded(allLessons, schedule, day)}
        />
    ));

    return (
        <div className={dayClasses}>
            {homepage ?
                (
                    <div className={dayHeaderInHome}>
                        <h1 className={dayHeader}>Today&nbsp;<span>({dayLessons.length})</span></h1>
                        <Link to={navigationService.redirectToCalendarPage}>
                            View All Week
                        </Link>
                    </div>
                )
                : (
                    <h1 className={dayHeader}>
                        <span>
                            {(scheduleCalc.getDayFromInt(day))}
                        </span>
                        <span>{moment(date).format('DD MMM')}</span>
                    </h1>
                )
            }
            <motion.nav
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={variantsWeek}
            >
                {homepage && lessonsList.length === 0 ? <h2>There are no lessons today</h2> :
                    (
                        <motion.div className={dayLessonsList} variants={variantsUl}>
                            {lessonsList}
                        </motion.div>
                    )
                }
            </motion.nav>
        </div>
    );
};

export { DayLessonsList };
