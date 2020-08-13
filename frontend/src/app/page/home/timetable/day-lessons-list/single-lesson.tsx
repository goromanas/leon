import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import styles from './lessons.module.scss';

interface Props {
    positionInList: number;
    currentLesson: number;
    lesson: any;
    handleOpenClassroom: any;
    schedule: Api.ScheduleDto | null;
}

const { listItem, activeLesson, upcomingLesson, listNumber, listContent } = styles;

const SingleLesson: React.FC<Props> =
    (props) => {
        const { currentLesson, positionInList, lesson, handleOpenClassroom, schedule } = props;
        const [scheduleTime, setScheduleTime] = useState<Api.ScheduleDto>({
            endTime: 'endTime',
            id: 1,
            startTime: 'startTime',
        });

        useEffect(() => {
            setScheduleTime(schedule);
            // console.log(schedule)
        }, [schedule]);
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
        const lessonStart: string = (schedule.startTime).substr(0, 5);

        return (
            <>
                < li className={listClass} key={lesson.id}>
                    <div
                        className={numberClass}
                    >
                        <span>{schedule && lessonStart}</span>
                        <span>{positionInList}</span>
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
                                Live
                            </Button>
                        ) : null}
                    </div>
                </li >
            </>
        );

    };

export { SingleLesson };
