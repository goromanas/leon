import React from 'react';
import { Button, Layout } from 'antd';
import moment from 'moment';

import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { PageContent } from 'app/components/layout';

import { DayLessonsList } from 'app/page/home/timetable/day-lessons-list/day-lessons-list';

import styles from './home.module.scss';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
    firstName: string | null;
    userRoles: string[] | null;
    teacherLessons: Api.Lesson[];
    currentLesson: number;

}

type Props = ContextProps;
interface State {
    move: number;
}

class HomePageComponent extends React.Component<Props, State> {

    public state =
        {
            move: 0,
        };

    public render(): React.ReactNode {
        const {
            userRoles,
            teacherLessons,
            currentLesson,
        } = this.props;

        return (
            <Layout>
                <Content>
                    <PageContent>
                        <div className={styles.welcomeHeader}>
                            Welcome back, {this.props.firstName}, {currentLesson}
                        </div>
                        {userRoles.includes('ADMIN') ? (
                            <Button type="primary" onClick={this.handleClickToUserList}>
                                To user list
                            </Button>
                        ) : (
                                <DayLessonsList userRole={this.props.userRoles} lessonsList={teacherLessons || []} date={moment().format('YYYY-MM-DD')} />
                            )}

                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly handleClickToUserList = (): void => {
        navigationService.redirectToUserListPage();
    };

    public getDate = (): String => {
        const today = new Date();
        const day = moment().add(this.state.move, 'd').format('YYYY-MM-DD');

        return day;
    };
}

const mapContextToProps = ({ session: { user }, lessons, currentLesson }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    firstName: user != null ? user.firstName : null,
    userRoles: user.roles,
    teacherLessons: lessons,
    currentLesson,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
