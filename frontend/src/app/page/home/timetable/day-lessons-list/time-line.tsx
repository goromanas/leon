import React, { useState, useEffect } from 'react';

import styles from './lessons.module.scss';
interface Props {
    scheduleTimes: Api.ScheduleDto[];
    listHeight: number;
    lessonsList: Api.Lesson[];
}

const TimeLine: React.FC<Props> = (props) => {
    interface DayTimes {
        startTime: number;
        endTime: number;
    }
    const { scheduleTimes, listHeight, lessonsList } = props;
    const [startEndDay, setStartEndDay] = useState<DayTimes>({
        startTime: 0,
        endTime: 0,
    });
    const [lineTop, setLineTop] = useState(0);
    const [clock, setClock] = useState<Date>(new Date());
    const [currentTime, setCurrentTime] = useState<number>(0);

    const time = clock.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    const convertTimeToMinutes = (time: any) => {
        const hours = parseInt(time.substr(0, 2), 10);
        const minutes = parseInt(time.substr(3, 4), 10);
        return hours * 60 + minutes;
    };

    const setDayTimes = () => {
        const startTime = scheduleTimes[0].startTime;
        const endTime = scheduleTimes[lessonsList.length].endTime;
        setStartEndDay({
            startTime: convertTimeToMinutes(startTime),
            endTime: convertTimeToMinutes(endTime),
        });
    };
    useEffect(() => {
        setCurrentTime(convertTimeToMinutes(time));
        setDayTimes();
    }, [setDayTimes, time]);
    useEffect(() => {
        setLineTop((listHeight / startEndDay.endTime) * currentTime);
    }, [currentTime, listHeight, startEndDay.endTime]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClock(new Date());
            setCurrentTime(convertTimeToMinutes(time));
        }, 1000);
        return () => clearTimeout(timer);
    }, [clock, time]);

    return (
        currentTime > startEndDay.startTime && currentTime < startEndDay.endTime &&
        (
            <div>
                <span
                    className={styles.timeLine}
                    style={{ top: currentTime - startEndDay.startTime + 'px' }}
                >
                    <div>{time}<span /></div>
                </span>
            </div>

        )

    );
};

export { TimeLine };
