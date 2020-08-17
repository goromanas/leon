import React from 'react';

interface Props {
    lessonTitle: string;
    // teacher: string | null;
}

const Top: React.FC<Props> = ({lessonTitle}) => {
    return (
        <div>
            <div>
                <h1>
                    {lessonTitle}
                </h1>
                {/*{teacher}*/}
            </div>
            {/*<div><ClockCircleOutlined />Time left: 00:20</div>*/}
        </div>
    )
}

export { Top }
