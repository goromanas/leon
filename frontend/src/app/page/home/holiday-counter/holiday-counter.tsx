import React from 'react';

import styles from './holiday-counter.module.scss';

const HolidayCounter: React.FC = () =>

    (
        <div>
            <span>Holiday Counter</span>
            <img
                alt="Teacher board"
                src={'images/teacher-board.svg'}
                className={styles.holidayCounterboard}
            />
        </div>
    );

export { HolidayCounter };
