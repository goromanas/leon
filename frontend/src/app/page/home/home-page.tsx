import React from 'react';
import { Button, Layout, Row, Col } from 'antd';
import moment from 'moment';

import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { DayLessonsList } from 'app/page/timetable/day-timetable';
import { SideTimebar } from 'app/page/timetable/side-timebar';
import { scheduleCalc } from 'app/page/timetable/schedule-calc';
import { Whiteboard } from 'app/components/whiteboard/whiteboard';

import { HolidayCounter } from './holiday-counter/holiday-counter';
import { TeacherFeedback } from './teacher-feedback/teacher-feedback';

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
        } = this.props;

        return (
            <AsyncContent loading={this.props.schedule.length === 0} loader={<PageLoadingSpinner />}>
                {/* {console.log('homepage')} */}
                <div className={styles.homePage}>
                    <div className={styles.home}>
                        {
                            userRoles.includes('ADMIN') ? (
                                <Button type="primary" onClick={this.handleClickToUserList}>
                                    To user list
                                </Button>
                            ) : (
                                    <>

                                        <Row>
                                            <Col lg={2} md={2} sm={2} >
                                                <SideTimebar schedule={schedule} homepage={true} itemsInList={scheduleCalc.thisDayLength(allLessons, parseInt(moment().format('d'), 10))} />

                                            </Col>
                                            <Col lg={16} md={38} sm={38} >
                                                <DayLessonsList
                                                    userRole={this.props.userRoles}
                                                    currentLesson={currentLesson}
                                                    allLessons={allLessons || []}
                                                    date={moment().format('YYYY-MM-DD')}
                                                    day={parseInt(moment().format('d'), 10)}
                                                    schedule={schedule}
                                                    homepage={true}
                                                />
                                            </Col>
                                            <Col lg={22} md={40} sm={40} className={styles.homeSide}>
                                                {userRoles.includes('TEACHER') ? <TeacherFeedback /> : ''}
                                                {userRoles.includes('STUDENT') ? <HolidayCounter /> : ''}
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
