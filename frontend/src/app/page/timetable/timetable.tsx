import React from 'react';
import { Col, Grid, Row } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { Lessons } from 'app/page/timetable/day-lessons-list/lessons';

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    teacherLessons: Api.Lesson[];
}

type Props = ContextProps;

class TimetablePageComponent extends React.Component<Props> {

    public lesson: Api.Lesson[];

    private sortedLesson: Api.Lesson[];


    public render(): React.ReactNode {

        const {
            username,
            userRoles,
            teacherLessons,
        } = this.props;
        const arrNum = [1,2,3];
        const d = new Date();

        return (
            <>

                <Row>


                    {Array(5).fill(1).map((x, y) => x + y).map((item) => (


                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Lessons lessonsList={this.somefunction(teacherLessons, item) || []} day={item} />
                    </Col>
                        ))}
                </Row>,

            </>);
    }
    public somefunction(teacherLessons: Api.Lesson[], day: number): Api.Lesson[] {
        if (teacherLessons != null) {
            this.sortedLesson = teacherLessons.sort((n1, n2) => n1.time - n2.time);

            return this.sortedLesson.filter(lesson => parseInt(lesson.day) == day ? lesson : null);

        }}

}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({



    username: user != null ? user.username : null,
    userRoles: user.roles,
    teacherLessons: lessons,
});

const TimetablePage = connectContext(mapContextToProps)(TimetablePageComponent);

export { TimetablePage };
