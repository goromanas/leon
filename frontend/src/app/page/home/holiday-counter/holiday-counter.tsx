import React from 'react';

import styles from './holiday-counter.module.scss';

// const time = Math.round((Date.parse(new Date('2020-12-24')) - Date.parse(new Date())) / 1000 / 86400);
const deadline = new Date('2020-12-24');
const today = new Date();
const days = Math.round(Math.abs((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
const hours = 24 - today.getHours();

const HolidayCounter: React.FC = () =>

    (
        <div className={styles.holidayCounterwrapper}>
            <img
                alt="Teacher board"
                src={'images/teacher-board.svg'}
                // src={'images/teacher.png'}
                className={styles.holidayCounterboard}
            />
            <div className={styles.holidayCounterTextWrapper}>
                <div className={styles.holidayCounterTimeWrapper}>
                    {/* <span className={styles.holidayCounterdays}>{days}</span>
                <span className={styles.holidayCountersemicolon}>:</span>
                <span className={styles.holidayCounterhours}>{hours}</span>
                <span className={styles.holidayCounterday}>Days   Hours</span> */}
                    <span>{days}</span> days <span>{hours}</span> hours
            </div>
                <div className={styles.holidayCountertitle}>
                    Left till <span>Christmas!</span>
                </div>

            </div >
        </div >

    );

export { HolidayCounter };
