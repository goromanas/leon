import React, { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './lessons.module.scss';
interface Props {

}

const TimeLine: React.FC<Props> = (props) => {

    const date = moment();
    const [top, setTop] = useState(1);


    useEffect(() => {
        const interval = setInterval(() => {
            setTop(top + 1);
            console.log(top);
        }, 60000);

        return () => {
            clearInterval(interval);
        };
    }, [top]);

    return (

        <span
            className={styles.timeLine}
            style={{ top }}
        >
            <div>{date.format('HH:mm')}<span /></div>
        </span>

    );
};

export { TimeLine };
