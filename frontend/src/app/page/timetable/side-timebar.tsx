import React from 'react';
import classNames from 'classnames';

import { scheduleCalc } from 'app/page/timetable/schedule-calc';
import { TimeLine } from 'app/page/timetable/time-line';
import styles from 'app/page/timetable/lessons.module.scss';

interface Props {
    schedule?: Api.ScheduleDto[];
    homepage?: boolean;
}

const SideTimebar: React.FC<Props> = ({ schedule, homepage }) => {
    const { lessonSideBar, lessonSideBarTime, lessonSideBarTimeInHome } = styles;
    const lessonSideBarClass = classNames(
        lessonSideBar,
        homepage && lessonSideBarTimeInHome,
    );

    const allTimes = schedule.map((item: Api.ScheduleDto) =>
        (
            <div key={item.startTime}>
                <div
                    className={lessonSideBarTime}
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
        <div className={lessonSideBarClass}>
            {allTimes}
            <TimeLine schedule={schedule} />
        </div>
    );
};

export { SideTimebar };
