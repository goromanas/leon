import React from 'react';
import { Button, Layout } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';
// import {CurrentLessonSocket} from '../../websocket/current-lesson-socket'

import { Lessons } from './timetable/day-lessons-list/lessons';

import styles from './home.module.scss';
// import { Whiteboard } from './../../components/whiteboard/whiteboard';

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

        const userRoleToLT = userRoles.includes('STUDENT') ? 'mokiny'
            : userRoles.includes('TEACHER') ? 'mokytojau'
                : userRoles.includes('ADMIN') ? 'administratoriau'
                    : userRoles.includes('PARENT') ? 'tėve' : null;
        console.log("Home page props :" )
        return (
            <Layout>
                <Content>

                    <PageContent>
                        <div className={styles.welcomeHeader}>
                            Labas, {userRoleToLT},
                        </div>
                        {/*<CurrentLessonSocket/>*/}
                        {userRoles.includes('ADMIN') ? (
                            <Button type="primary" onClick={this.handleClickToUserList}>
                                To user list
                            </Button>
                        ) : (
                                <Lessons userRole={this.props.userRoles} lessonsList={teacherLessons || []} currentLesson={currentLesson} />
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
    currentLesson: currentLesson,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
