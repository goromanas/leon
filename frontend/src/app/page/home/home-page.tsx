import React from 'react';
import { Button, Layout, Row, Col } from 'antd';
import moment from 'moment';

import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';

import { DayLessonsList } from 'app/page/timetable/day-timetable';
import { SideTimebar } from 'app/page/timetable/side-timebar';

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

    public readonly state: State = {
        move: 0,
        dayOfWeek: 0,
    };

    public componentDidMount(): void {
        const date = new Date();
        const today: number = date.getDay();

        this.setState({ ...this.state, dayOfWeek: today });
    }

    public render(): React.ReactNode {
        const {
            userRoles,
            allLessons,
            currentLesson,
            schedule,
        } = this.props;

        return (
            <AsyncContent loading={this.props.schedule.length === 0} loader={<PageLoadingSpinner />}>
                <div className={styles.homePage}>
                    <div className={styles.home}>
                        {/* <div className={styles.welcomeHeader}>
                            Welcome back, {this.props.firstName},
                {currentLesson}
                        </div> */}
                        {
                            userRoles.includes('ADMIN') ? (
                                <Button type="primary" onClick={this.handleClickToUserList}>
                                    To user list
                                </Button>
                            ) : (
                                    <>

                                        <Row className={styles.scheduleInHome}>
                                            <Col lg={2} md={2} sm={2} >
                                                <SideTimebar schedule={schedule} homepage={true} />
                                            </Col>
                                            <Col lg={20} md={38} sm={38} >
                                                <DayLessonsList
                                                    userRole={this.props.userRoles}
                                                    currentLesson={currentLesson}
                                                    allLessons={allLessons || []}
                                                    date={moment().format('YYYY-MM-DD')}
                                                    day={this.state.dayOfWeek}
                                                    schedule={schedule}
                                                    homepage={true}
                                                />
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
