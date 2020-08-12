import React from 'react';
import { Button, Col, Grid, Row } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { Lessons } from 'app/page/timetable/day-lessons-list/lessons';

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    teacherLessons: Api.Lesson[];
}

interface State {
    move: number;
}

type Props = ContextProps;

class TimetablePageComponent extends React.Component<Props, State> {
    public state =
        {
            move: 0,
        };

    public lesson: Api.Lesson[];
    private sortedLesson: Api.Lesson[];

    public render(): React.ReactNode {
        const move: number = 0;
        const {
            username,
            userRoles,
            teacherLessons,
        } = this.props;
        const arrNum = [1, 2, 3];
        const d = new Date();

        return (
            <>

                <Button type="primary"
                        onClick={() => this.handleButtonClick(false)}
                >Previous</Button>
                <Button type="primary"
                        onClick={() => this.handleButtonClick(true)}>Next</Button>
                <Row>

                    {Array(5).fill(new Date().getDay() + this.state.move).map((x, y) => x + y).map((item) => (
                        item ==0? item=5:null,
                        item < 0 ? item =0-item : null,
                            (item % 5) == 0 ? item = 5 : null,
                            (item % 5) != 0 ? item = item % 5 : null,

                            console.log(item),

                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Lessons lessonsList={this.somefunction(teacherLessons, item) || []} day={item} />
                    </Col>
                        ))}
                    {console.log(this.state.move + '-------')}

                </Row>,

            </>);
    }
    public somefunction(teacherLessons: Api.Lesson[], day: number): Api.Lesson[] {
        if (teacherLessons != null) {
            this.sortedLesson = teacherLessons.sort((n1, n2) => n1.time - n2.time);

            return this.sortedLesson.filter(lesson => parseInt(lesson.day) == day ? lesson : null);

        }}
    private handleButtonClick = (forward: boolean): void => {

        forward ?
        this.setState({ move: this.state.move + 1 }) :
        this.setState({ move: this.state.move - 1 });

    };

}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({

    username: user != null ? user.username : null,
    userRoles: user.roles,
    teacherLessons: lessons,
});

const TimetablePage = connectContext(mapContextToProps)(TimetablePageComponent);

export { TimetablePage };
