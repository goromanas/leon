import React from 'react';
import Item from 'antd/lib/list/Item';

interface Props {
    schedule?: Api.ScheduleDto[];
}

const SideTimebar: React.FC<Props> = ({ schedule }) => {
    // const allTimes = schedule.length !== 0 ? schedule.map((item: any) => <p key={Item}>1</p>)
    console.log(schedule);
    return (
        <div>
            {/* {allTimes} */}
        </div>
    );
};

export { SideTimebar };
