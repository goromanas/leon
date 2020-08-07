import React from 'react';
import { Button, Layout } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';
import styles from './home.module.scss';

import { Lessons } from './lessons/lessons';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    teacherLessons: Api.Lesson[];
}

type Props = ContextProps;

class HomePageComponent extends React.Component<Props> {

    public render(): React.ReactNode {
        const {
            userRoles,
            teacherLessons,
        } = this.props;

        const userRoleToLT = userRoles.includes('STUDENT') ? 'mokinį'
            : userRoles.includes('TEACHER') ? 'mokytojau'
                : userRoles.includes('ADMIN') ? 'administratoriau' : null

        return (
            <Layout>
                <Content>
                    <PageContent>
                        <div className={styles.welcomeHeader}>
                            Labas, {userRoleToLT},
                        </div>
                        {userRoles.includes('ADMIN') ? (
                            <Button type="primary" onClick={this.handleClickToUserList}>
                                To user list
                            </Button>
                        ) : (
                            <Lessons lessonsList={teacherLessons || []} />
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

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    userRoles: user.roles,
    teacherLessons: lessons,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
