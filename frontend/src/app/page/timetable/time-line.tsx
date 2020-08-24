import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { scheduleCalc } from './schedule-calc';

import styles from './lessons.module.scss';

interface Props {
    schedule: Api.ScheduleDto[];
    itemsInList: number;
}

const TimeLine: React.FC<Props> = (props) => {
    const { schedule, itemsInList } = props;
    const { timeLine, timeLineLong } = styles;

    let date = moment();
    const [top, setTop] = useState(scheduleCalc.convertTimeToMinutes(date.format('HH:mm')) - scheduleCalc.getDayStart(schedule));
    const startTimeInMins = scheduleCalc.getDayStart(schedule) - 10;
    const endTimeInMins = scheduleCalc.getDayEnd(schedule, itemsInList) + 10;
    const [long, setLong] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLong(true)
        }, 500)
    }, [])

    const timeLineClass = classNames(
        timeLine,
        long && timeLineLong,
    )
    useEffect(() => {
        const interval = setInterval(() => {

            date = moment();
            const time = date.format('HH:mm');
            setTop(
                scheduleCalc.convertTimeToMinutes(time) - scheduleCalc.getDayStart(schedule),
            );
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [top]);

    const timeInMins = scheduleCalc.convertTimeToMinutes(date.format('HH:mm'));

    if (endTimeInMins > timeInMins && timeInMins > startTimeInMins && top !== 0) {
        return (
            <span
                className={timeLineClass}
                style={{ top }}
            >
                <div>{date.format('HH:mm')}<span /></div>
            </span>
        );
    } else {
        return <></>;
    }
};

// @ts-ignore
export { TimeLine };
