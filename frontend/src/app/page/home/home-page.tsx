import React from 'react';
import { Button, Layout } from 'antd';

import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { PageContent } from 'app/components/layout';

import { DayLessonsList } from './timetable/day-lessons-list/day-lessons-list';

import styles from './home.module.scss';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    teacherLessons: Api.Lesson[];
    currentLesson: number;
}

type Props = ContextProps;

class HomePageComponent extends React.Component<Props> {

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

                            Welcome back, {this.props.username},

                        </div>
                        {userRoles.includes('ADMIN') ? (
                            <Button type="primary" onClick={this.handleClickToUserList}>
                                To user list
                            </Button>
                        ) : (
                                <DayLessonsList lessonsList={teacherLessons || []} />
                            )}

                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly handleClickToUserList = (): void => {
        navigationService.redirectToUserListPage();
    };

}

const mapContextToProps = ({ session: { user }, lessons, currentLesson }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    userRoles: user.roles,
    teacherLessons: lessons,
    currentLesson,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
