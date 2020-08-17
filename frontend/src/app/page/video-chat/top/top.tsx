import React from 'react';

import { ClockCircleOutlined } from '@ant-design/icons';

interface Props {
    lessonTitle: string;
    teacher: string | null;
    endTime: string | null;
    startTime: string | null;
}

const Top: React.FC<Props> = ({ lessonTitle, teacher, startTime, endTime}) => {
    // const date = new Date()
    // const hours = date.getHours()
    // const minutes = date.getMinutes()
    // const seconds = date.getSeconds()
    console.log(Date.parse(endTime))

    //endTime 12:00:00
    //now 11:45

    // const countDown = endTime: any => {
    //     const time = Date.parse(endTime) - Date.parse(new Date());
    //     if (time < 0) {
    //         console.log("Date passed");
    //     } else {
    //         const seconds = Math.floor((time / 1000) % 60);
    //         const minutes = Math.floor((time / 1000 / 60) % 60);
    //         const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    //         const days = Math.floor(time / 1000 / 60 / 60 / 24);
    //         this.setState({
    //             seconds,
    //             minutes,
    //             hours,
    //             days
    //         });
    //     }
    // };

    return (
        <div>
            <div>
                <h1>
                    {lessonTitle}
                </h1>
                {teacher}
            </div>
            <div><ClockCircleOutlined />Time left: 00:20
                <p>{startTime} - {endTime}</p>
            </div>
        </div>
    )
}

export { Top }
