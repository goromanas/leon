class ScheduleCalc {

    public clock: Date = new Date();
    public readonly time: string = this.clock.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

    public convertTimeToMinutes = (time: any) => {
        const hours = parseInt(time.substr(0, 2), 10);
        const minutes = parseInt(time.substr(3, 4), 10);

        return hours * 60 + minutes;
    };

    public getDayFromInt = (d: number): string => {
        switch (d) {
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            case 0:
                return 'Sunday';
            default:
                return 'Nothing';
        }
    };

    // return breakTime in minutes from schedule times and break position
    public getBreakTime = (schedule?: Api.ScheduleDto[], currentBreak?: number): any => {

        if (schedule.length !== 0 && currentBreak !== 0 && currentBreak < schedule.length) {
            const starts = schedule[currentBreak - 1].endTime;
            const ends = schedule[currentBreak].startTime;

            const breakStartMinutes = this.convertTimeToMinutes(starts);
            const breakEndMinutes = this.convertTimeToMinutes(ends);

            return schedule && breakEndMinutes - breakStartMinutes;
        }
        // console.log(schedule);
        return 0;
    };

    public getLessonLength = (schedule: Api.ScheduleDto[]): number => {
        if (schedule.length !== 0) {
            return this.convertTimeToMinutes(schedule[1].endTime) - this.convertTimeToMinutes(schedule[1].startTime);
        }
        return 0;
    };

}

const scheduleCalc = new ScheduleCalc();

export { scheduleCalc };
