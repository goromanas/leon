import React from 'react';

interface Props {
    schedule?: Api.ScheduleDto[];
}

const SideTimebar: React.FC<Props> = ({ schedule }) => {
    const allTimes = schedule.map((item: Api.ScheduleDto) =>
        (
            <div key={item.startTime}>
                {item.startTime.substr(0, 5)}
            </div>
        )
    );
    return (
        <div>
            {allTimes}
        </div>
    );
};

export { SideTimebar };
