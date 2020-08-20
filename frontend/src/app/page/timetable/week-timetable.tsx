import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import moment from 'moment';

import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { connectContext, SettingsProps } from 'app/context';
import { DayLessonsList } from 'app/page/timetable/day-timetable';
import { SideTimebar } from 'app/page/timetable/side-timebar';
import styles from 'app/page/timetable/lessons.module.scss';

import { scheduleCalc } from './schedule-calc';
import { lessonsService } from 'app/api/service/lessons-service';
import { lessonInformationService } from 'app/api/service/lessonInformation-service';

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
        username,
        userRoles,
        allLessons,
        currentLesson,
        schedule,
    } = props;

    const [week, setWeek] = useState(0);
    const [weekWorkDays, setWeekWorkDays] = useState([1, 2, 3, 4, 5]);
    const dayDate = (item?: any) => moment().day(item || undefined);

    useEffect(() => {
        setWeekWorkDays([1 + week, 2 + week, 3 + week, 4 + week, 5 + week]);
    }, [week]);

    const moveWeek = (direction: boolean) => {
        direction ? setWeek(week + 7)
            : setWeek(week - 7);
    };
    const resetWeek = () => {
        setWeekWorkDays([1, 2, 3, 4, 5]);
    }


    const filterByDay = (teacherLessons: Api.LessonDto[], day: number): Api.LessonDto[] => {
        if (teacherLessons != null) {
            const sortedLesson = teacherLessons.sort((n1, n2) => n1.time - n2.time);
            return sortedLesson.filter(lesson => lesson.day === day ? lesson : null);
        }
    };

    const allWeekDays = weekWorkDays.map((item) =>
        (
            < Col lg={8} md={20} sm={40} className={styles.dayClassCol} key={dayDate(item).day()} >
                < DayLessonsList
                    userRole={userRoles}
                    allLessons={filterByDay(allLessons, dayDate(item).day()) || []}
                    currentLesson={currentLesson}
                    day={dayDate(item).day()}
                    date={dayDate(item).format('YYYY-MM-DD')}
                    schedule={schedule}
                />
            </ Col >
        ));

    return (
        <AsyncContent loading={schedule.length === 0} loader={<PageLoadingSpinner />}>
            <div className={styles.weekPage}>
                <div className={styles.weekInfo}>
                    <div className={styles.weekNavigation}>
                        {weekWorkDays.includes(1) ? <span className={styles.weekNavigationText}>This Week</span>
                            : <span className={styles.weekNavigationBackText} onClick={() => resetWeek()}>Back to This Week</span>}
                        <span className={styles.weekNavigationDate}>
                            <img
                                alt="week navigation"
                                src={'icons/arrow.svg'}
                                onClick={() => moveWeek(false)}
                            />
                            <span>{dayDate(weekWorkDays[0]).format('DD')} - {dayDate(weekWorkDays[4]).format('DD MMM')}</span>
                            <img
                                alt="week navigation"
                                src={'icons/arrow.svg'}
                                onClick={() => moveWeek(true)}
                            />
                        </span>
                    </div>
                    <p>Lesson duration: {scheduleCalc.getLessonLength(schedule)}min</p>
                </div>

                <div className={styles.week}>
                    <div className={styles.weekList} >
                        <SideTimebar schedule={schedule} itemsInList={allLessons && scheduleCalc.getLongestDay(allLessons)} />
                        <Row className={styles.daysRow} gutter={[0, 40]}>
                            {allWeekDays}
                        </Row>
                    </div>
                </div >
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
