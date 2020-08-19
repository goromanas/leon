import React from 'react';
import moment from 'moment';

import { scheduleCalc } from 'app/page/timetable/schedule-calc';

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
            this.state.date.format('dddd YYYY MM D HH:mm')
        );
    }
}

export { Clock };
