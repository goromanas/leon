import React from 'react';

import { scheduleCalc } from 'app/page/timetable/schedule-calc';
import { TimeLine } from 'app/page/timetable/time-line';

import styles from 'app/page/timetable/lessons.module.scss';
interface Props {
    schedule?: Api.ScheduleDto[];
}

const SideTimebar: React.FC<Props> = ({ schedule }) => {
    const allTimes = schedule.map((item: Api.ScheduleDto) =>
        (
            <div key={item.startTime}>
                <div
                    className={styles.lessonSideBarTime}
                    style={{
                        marginBottom: scheduleCalc.getBreakTime(schedule, item.id),
                        height: scheduleCalc.getLessonLength(schedule),
                    }}
                >
                    <span>{item.startTime.substr(0, 5)}</span>
                    <span>{item.id}</span>
                </div>

            </div >

        ),
    );
    return (
        <div className={styles.lessonSideBar}>
            {allTimes}
            <TimeLine schedule={schedule} />
        </div>
    );
};

export { SideTimebar };
