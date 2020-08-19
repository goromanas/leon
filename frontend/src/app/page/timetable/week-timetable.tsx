import React from 'react';
import { Layout } from 'antd';
import moment from 'moment';

import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { connectContext, SettingsProps } from 'app/context';
import { DayLessonsList } from 'app/page/timetable/day-timetable';
import { SideTimebar } from 'app/page/timetable/side-timebar';
import styles from 'app/page/timetable/lessons.module.scss';

import { scheduleCalc } from './schedule-calc';

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
    constructor(props: Props) {
        super(props);
        // this.weekListRef = React.createRef();
    }
    public state: State =
        {
            move: 0,
        };

    private sortedLesson: Api.LessonDto[];
    public allDaysList: string = '';

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
            <AsyncContent loading={schedule.length === 0} loader={<PageLoadingSpinner />}>
                <div className={styles.weekPage}>
                    <div className={styles.weekInfo}>
                        <div className={styles.weekNavigation}>
                            <span className={styles.weekNavigationText}>This Week</span>
                            <span className={styles.weekNavigationDate}>
                                <img
                                    alt="week navigation"
                                    src={'icons/arrow.svg'}
                                    onClick={() => this.handleButtonClick(false)}
                                />
                                <span>{this.getDays(5, now)}</span>
                                <img
                                    alt="week navigation"
                                    src={'icons/arrow.svg'}
                                    onClick={() => this.handleButtonClick(true)}
                                />
                            </span>
                        </div>
                        <p>Lesson duration: {scheduleCalc.getLessonLength(schedule)}min</p>
                    </div>

                    <div className={styles.week}>
                        <div className={styles.weekList} >
                            <SideTimebar schedule={this.props.schedule} />
                            {Array(5).fill(1 + this.state.move).map((x, y) => x + y).map((item) => (
                                item === 0 ? item = 5 : null,
                                item < 0 ? item = 0 - item : null,
                                (item % 5) !== 0 ? null : item = 5,
                                (item % 5) !== 0 ? item = item % 5 : null,
                                < DayLessonsList
                                    key={item}
                                    userRole={this.props.userRoles}
                                    allLessons={this.filterByDay(allLessons, item) || []}
                                    currentLesson={this.props.currentLesson}
                                    day={item}
                                    date={this.getDate(item, now)}
                                    schedule={this.props.schedule}
                                />
                            ))}
                        </div>
                    </div >
                </div>

            </AsyncContent >
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

        if (1 > item) {
            t = (item) + 7;
        } else {
            t = item;
        }
        const day = moment().add(this.state.move / 5 * 7 - now + t, 'd').format('YYYY-MM-DD');
        // const day = moment().add(this.state.move / 5 * 7 - now + t, 'd').format('MMM DD');

        return day;
    };

    public getDays = (item: number, now: number): string => {
        let t;

        if (1 > item) {
            t = (item) + 7;
        } else {
            t = item;
        }
        const day = moment().add(this.state.move / 5 * 7 - now + t, 'd').format('D MMM');

        return parseInt(day, 10) - 4 + ' - ' + day;
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
