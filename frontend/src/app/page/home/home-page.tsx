import React from 'react';
import { Button, Layout } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';

import { Lessons } from './lessons/lessons';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    teacherLessons: Api.Lesson[];
    // studentLessons: Api.Lesson[];
}

type Props = ContextProps;

class HomePageComponent extends React.Component<Props> {
    // public const ifAdmin: boolean = userRoles.includes('ADMIN');

    public render(): React.ReactNode {
        const {
            username,
            userRoles,
            teacherLessons,
            // studentLessons,
        } = this.props;

        return (
            <Layout>
                <Content>
                    <PageContent>
                        <div>
                            Hello, {username}! your role is {userRoles.toString()}
                        </div>
                        <Lessons lessonsList={teacherLessons || []} />


                        <Button
                            type="primary"
                            onClick={this.handleClickLogout}
                        >
                            Logout
                        </Button>

                        <p>Your lessons are:
                        {teacherLessons &&
                                teacherLessons.map(lesson => lesson.subject)}
                        </p>
                    </PageContent>
                </Content>
            </Layout >
        );
    }

    private readonly handleClickLogout = (): void => {
        navigationService.redirectToLogoutPage();
    };

    private readonly handleClickToUserList = (): void => {
        navigationService.redirectToUserListPage();
    };

}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    userRoles: user.roles,
    teacherLessons: lessons,
    // studentLessons: lessons,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
