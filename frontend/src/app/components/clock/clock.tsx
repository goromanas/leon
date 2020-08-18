import React from 'react';

import { scheduleCalc } from 'app/page/timetable/schedule-calc';

class Clock extends React.Component {

    public state = { date: new Date() };

    public componentDidMount() {
        setInterval(
            () => this.tick(),
            1000,
        );
    }

    public tick() {
        this.setState({
            date: new Date(),
        });
    }

    public render(): React.ReactNode {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'long',
            second: 'numeric',
        };

        return (
            // this.state.date.toLocaleTimeString('en-EN', options)
            scheduleCalc.getDayFromInt(this.state.date.getDay()) + ' '
            + this.state.date.getFullYear() + '-'
            + this.state.date.getMonth() + '-'
            + this.state.date.getDate() + ' '
            + this.state.date.getHours() + ':'
            + this.state.date.getMinutes() + ':'
            + this.state.date.getSeconds()
        );
    }
}

export { Clock };
