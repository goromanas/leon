import React from 'react';
import { Button, Col, Row } from 'antd';
import moment from 'moment';

import { connectContext, SettingsProps } from 'app/context';
import { DayLessonsList } from 'app/page/timetable/day-timetable';

import styles from 'app/page/timetable/lessons.module.scss';

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    allLessons: Api.LessonDto[];
    currentLesson: number;
    schedule: Api.ScheduleDto[];
}

interface State {
    move: number;
}

type Props = ContextProps;

class TimetablePageComponent extends React.Component<Props, State> {
    public state: State =
        {
            move: 0,
        };

    private sortedLesson: Api.LessonDto[];

    public render(): React.ReactNode {

        const {
            username,
            userRoles,
            allLessons,
            currentLesson,
            schedule,
        } = this.props;
        const now = new Date().getDay();

        return (
            <div>
                <div className={styles.weekButtons}>
                    <Button
                        type="primary"
                        onClick={() => this.handleButtonClick(false)}
                    >Previous Week
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.handleButtonClick(true)}
                    >Next Week
                    </Button>
                </div>
                <Row>

                    {Array(5).fill(now + this.state.move).map((x, y) => x + y).map((item) => (
                        item === 0 ? item = 5 : null,
                        item < 0 ? item = 0 - item : null,
                        (item % 5) !== 0 ? null : item = 5,
                        (item % 5) !== 0 ? item = item % 5 : null,

                        < Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }} key={item}>

                            < DayLessonsList
                                userRole={this.props.userRoles}
                                allLessons={this.filterByDay(allLessons, item) || []}
                                currentLesson={this.props.currentLesson}
                                day={item}
                                date={this.getDate(item, now)}
                                schedule={this.props.schedule}
                            />
                        </Col>
                    ))}

                </Row>

            </div >
        );
    }

    public filterByDay(teacherLessons: Api.LessonDto[], day: number): Api.LessonDto[] {

        if (teacherLessons != null) {
            this.sortedLesson = teacherLessons.sort((n1, n2) => n1.time - n2.time);
            return this.sortedLesson.filter(lesson => lesson.day === day ? lesson : null);

        }
    }

    public getDate = (item: number, now: number): string => {
        const today = new Date();
        let t;

        if (now > item) {
            t = (item) + 7;
        } else {
            t = item;
        }
        const day = moment().add(this.state.move / 5 * 7 - now + t, 'd').format('YYYY-MM-DD');

        return day;
    };
    private handleButtonClick = (forward: boolean): void => {

        forward ?
            this.setState({ move: this.state.move + 5 }) :
            this.setState({ move: this.state.move - 5 });

    };
}

const mapContextToProps = ({ session: { user }, lessons, currentLesson, schedule }: SettingsProps): ContextProps => ({

    username: user != null ? user.username : null,
    userRoles: user.roles,
    allLessons: lessons,
    currentLesson,
    schedule,
});

const TimetablePage = connectContext(mapContextToProps)(TimetablePageComponent);

export { TimetablePage };
