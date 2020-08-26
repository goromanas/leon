import React from 'react';
import { Button, Col, Row } from 'antd';
import moment from 'moment';

import { Quotes } from 'app/components/quotes/quotes';
import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { DayLessonsList } from 'app/page/timetable/day-timetable';
import { SideTimebar } from 'app/page/timetable/side-timebar';
import { scheduleCalc } from 'app/page/timetable/schedule-calc';

import { HolidayCounter } from './holiday-counter/holiday-counter';
import { TeacherFeedback } from './teacher-feedback/teacher-feedback';
import { ToDoList } from './to-do-list/to-do-list';
import { Greeting } from './greeting/greeting';

import styles from './home.module.scss';

interface ContextProps {
    username: string | null;
    firstName: string | null;
    userRoles: string[] | null;
    allLessons: Api.LessonDto[];
    currentLesson: number;
    schedule: Api.ScheduleDto[];
}

type Props = ContextProps;

interface State {
    move: number;
    dayOfWeek: number;
}

class HomePageComponent extends React.Component<Props, State> {

    public render(): React.ReactNode {
        const {
            userRoles,
            allLessons,
            currentLesson,
            schedule,
            firstName,
        } = this.props;

        const dayLessons = allLessons && allLessons.filter(lesson => lesson.day === moment().day());

        return (
            <AsyncContent loading={this.props.schedule.length === 0} loader={<PageLoadingSpinner />}>
                <div className={styles.homePage}>
                    <div className={styles.home}>
                        {
                            userRoles.includes('ADMIN') ? (
                                <Button type="primary" onClick={this.handleClickToUserList}>
                                    To user list
                                </Button>
                            ) : (
                                    <>
                                        <div className={styles.greeting}>
                                            <Greeting firstname={firstName} />
                                        </div>
                                        <Row>
                                            <Col lg={2} md={2} sm={2}>
                                                <SideTimebar
                                                    schedule={schedule}
                                                    homepage={true}
                                                    itemsInList={scheduleCalc.thisDayLength(
                                                        allLessons, parseInt(moment().format('d'), 10),
                                                    )}
                                                />

                                            </Col>
                                            <Col lg={14} md={14} sm={38}>
                                                <DayLessonsList
                                                    userRole={this.props.userRoles}
                                                    currentLesson={currentLesson}
                                                    allLessons={dayLessons || []}
                                                    date={moment().format('YYYY-MM-DD')}
                                                    day={parseInt(moment().format('d'), 10)}
                                                    schedule={schedule}
                                                    homepage={true}
                                                />
                                            </Col>

                                            <Col
                                                lg={8}
                                                md={4}
                                                sm={38}
                                                className={styles.todoList}
                                            >
                                                <ToDoList
                                                    lessons={allLessons}
                                                    userRole={this.props.userRoles}
                                                />
                                            </Col>
                                            <Col
                                                lg={12}
                                                md={4}
                                                sm={38}
                                                className={styles.holidayCounterwrapper}
                                            >
                                                <div>
                                                    <HolidayCounter />
                                                </div>


                                                <div className={styles.homeModal}>

                                                    <h2>Did you know?</h2>
                                                    <div>
                                                        <div className={styles.homeModalMotivation}>
                                                            <img src={'icons/quoteLogo.svg'} alt="Quote" />
                                                            <Quotes />

                                                        </div>
                                                    </div>
                                                    <div className={styles.homeModalOne} />
                                                    <div className={styles.homeModalTwo} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </>
                                )

                        }
                    </div>

                </div>
            </AsyncContent >
        );
    }

    private readonly handleClickToUserList = (): void => {
        navigationService.redirectToUserListPage();
    };
}

const mapContextToProps = ({ session: { user }, lessons, currentLesson, schedule }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    firstName: user != null ? user.firstName : null,
    userRoles: user.roles,
    allLessons: lessons,
    currentLesson,
    schedule,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
