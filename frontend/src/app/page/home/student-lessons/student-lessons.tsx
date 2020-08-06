import React from 'react';
import { List, Card } from 'antd';

import { LessonAction } from './lesson-action';

const data = [
    {
        subject: 'Title 1',
        status: 0,
    },
    {
        subject: 'Title 2',
        status: 1,
    },
    {
        subject: 'Title 3',
        status: 0,
    },
    {
        subject: 'Title 4',
        status: 0,
    },
    {
        subject: 'Title 5',
        status: 0,
    },
    {
        subject: 'Title 6',
        status: 0,
    },
];

class StudentLessons extends React.Component {

    public render(): React.ReactNode {

        return (
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.subject}>
                            <LessonAction status={item.status} subject={item.subjec} />
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}

export { StudentLessons };
