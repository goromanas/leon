import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import moment from 'moment';
import { motion } from 'framer-motion';

import { AsyncContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';
import { DayLessonsList } from 'app/page/timetable/day-timetable';
import { SideTimebar } from 'app/page/timetable/side-timebar';
import styles from 'app/page/timetable/lessons.module.scss';
import { variantsDay, variantsWeek, variantsUl } from 'app/page/timetable/animation';

import { scheduleCalc } from './schedule-calc';
import { ComponentLoadingSpinner } from '../common/page-loading-spinner/component-loading-spinner';

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    allLessons: Api.LessonDto[];
    currentLesson: number;
    schedule: Api.ScheduleDto[];
}

type Props = ContextProps;

const TimetablePageComponent: React.FC<Props> = (props) => {

    const {
        userRoles,
        allLessons,
        currentLesson,
        schedule,
    } = props;

    const [week, setWeek] = useState(0);
    const [weekWorkDays, setWeekWorkDays] = useState([1, 2, 3, 4, 5]);
    const dayDate = (item?: any) => moment().day(item || undefined);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setWeekWorkDays([1 + week, 2 + week, 3 + week, 4 + week, 5 + week]);
    }, [week]);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    // change week on arrow click
    const moveWeek = (direction: boolean) => {

        if (dayDate(weekWorkDays[4]).year() === moment().year()) {
            direction ? setWeek(week + 7)
                : setWeek(week - 7);
            // }
        } else if (dayDate(weekWorkDays[4]).year() < moment().year()) {
            direction ? setWeek(week + 7)
                : setWeek(week);
        } else if (dayDate(weekWorkDays[4]).year() > moment().year()) {
            direction ? setWeek(week)
                : setWeek(week - 7);
        }
    };

    // change back to current week
    const resetWeek = () => {
        setWeek(0);
        setWeekWorkDays([1, 2, 3, 4, 5]);
    };

    // sort lessons by day of week
    const filterByDay = (teacherLessons: Api.LessonDto[], day: number): Api.LessonDto[] => {
        if (teacherLessons != null) {
            const sortedLesson = teacherLessons.sort((n1, n2) => n1.time - n2.time);
            return sortedLesson.filter(lesson => lesson.day === day ? lesson : null);
        }
    };

    const allWeekDays = weekWorkDays.map((item, index) =>
        (

            < Col lg={8} md={20} sm={40} key={index} className={styles.dayClassCol}>
                <motion.div variants={variantsDay}>
                    < DayLessonsList
                        userRole={userRoles}
                        allLessons={allLessons || []}
                        currentLesson={currentLesson}
                        day={dayDate(item).year() === moment().year() ? dayDate(item).day() : 0}
                        date={dayDate(item).format('YYYY-MM-DD')}
                        schedule={schedule}
                    />
                </motion.div>
            </ Col >

        ),

    );

    return (
        <AsyncContent loading={schedule.length === 0} loader={<ComponentLoadingSpinner />}>

            <div className={styles.weekPage}>
                <div className={styles.weekInfo}>
                    <div className={styles.weekNavigation}>
                        {weekWorkDays.includes(1) ? <span className={styles.weekNavigationText}>This Week</span>
                            : (
                                <span className={styles.weekNavigationBackText} onClick={() => resetWeek()}>
                                    Back to This Week
                                </span>
                            )
                        }
                        <span className={styles.weekNavigationDate}>
                            <img
                                alt="week navigation"
                                src={'icons/arrow.svg'}
                                onClick={() => moveWeek(false)}
                            />
                            <span>
                                {dayDate(weekWorkDays[0]).format('DD')} - {dayDate(weekWorkDays[4]).format('DD MMM')}
                            </span>
                            <img
                                alt="week navigation"
                                src={'icons/arrow.svg'}
                                onClick={() => moveWeek(true)}
                            />
                        </span>
                    </div>
                    <p>Lesson duration: {scheduleCalc.getLessonLength(schedule)}min</p>
                </div>

                <motion.div
                    className={styles.week}
                    initial={false}
                    animate={isOpen ? 'open' : 'closed'}
                    variants={variantsWeek}
                >
                    <div className={styles.weekList} >
                        <SideTimebar
                            schedule={schedule}
                            itemsInList={allLessons && scheduleCalc.getLongestDay(allLessons)}
                        />
                        <motion.div variants={variantsUl} style={{ width: '100%' }}>
                            <Row gutter={[0, 40]} className={styles.daysRow}>
                                {allWeekDays}
                            </Row>
                        </motion.div>

                    </div>
                </motion.div >
            </div>

        </AsyncContent >
    );

};

const mapContextToProps = ({ session: { user }, lessons, currentLesson, schedule }: SettingsProps): ContextProps => ({

    username: user != null ? user.username : null,
    userRoles: user.roles,
    allLessons: lessons,
    currentLesson,
    schedule,
});

const TimetablePage = connectContext(mapContextToProps)(TimetablePageComponent);

export { TimetablePage };
