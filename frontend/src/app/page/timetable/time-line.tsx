import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { scheduleCalc } from './schedule-calc';

import styles from './lessons.module.scss';
interface Props {
    schedule: Api.ScheduleDto[];
}

const TimeLine: React.FC<Props> = (props) => {
    const { schedule } = props;

    let date = moment();
    const [top, setTop] = useState(0);
    const [timeInMins, setTimeInMins] = useState(0);
    const startTimeInMins = scheduleCalc.getDayStart(schedule);
    const endTimeInMins = scheduleCalc.getDayEnd(schedule);

    useEffect(() => {
        const interval = setInterval(() => {
            date = moment();
            const time = date.format('HH:mm');

            setTimeInMins(scheduleCalc.convertTimeToMinutes(time));
            const calcTop = timeInMins - startTimeInMins;
            setTop(calcTop);

            console.log(top);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [top]);

    if (endTimeInMins > timeInMins && timeInMins > startTimeInMins && top !== 0) {
        return (
            <span
                className={styles.timeLine}
                style={{ top }}
            >
                {}
                <div>{date.format('HH:mm')}<span /></div>
            </span >
        );
    } else { return <></>; }
};

export { TimeLine };
