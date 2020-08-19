import React, { useEffect, useState } from 'react';
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
    const startTimeInMins = scheduleCalc.getDayStart(schedule) - 10;
    const endTimeInMins = scheduleCalc.getDayEnd(schedule) + 10;

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
                className={styles.timeLine}
                style={{ top }}
            >
                <div>{date.format('HH:mm')}<span /></div>
            </span>
        );
    } else {
        return <></>;
    }
};

export { TimeLine };
