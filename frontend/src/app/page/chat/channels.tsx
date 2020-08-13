import React from 'react';



interface Props {
    lessons: Api.Lesson[];
}

const Channels: React.FC<Props> = ({ lessons }) =>
    (
        <div>
            {lessons.map(lesson=>(
                <button>{lesson.subject}</button>
            ))}
        </div>
    );

export { Channels };
