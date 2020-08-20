import React from 'react';
import moment from 'moment';

import { scheduleCalc } from 'app/page/timetable/schedule-calc';

import styles from './clock.module.scss';

class Clock extends React.Component {

    public state = { date: moment() };

    public componentDidMount() {
        setInterval(
            () => this.tick(),
            1000,
        );
    }

    public tick() {
        this.setState({
            date: moment(),
        });
    }

    public render(): React.ReactNode {

        return (
            <>
                <span className={styles.date}>{this.state.date.format('dddd YYYY MM DD')}</span>
                {this.state.date.format('HH:mm')}
            </>
        );
    }
}

export { Clock };
