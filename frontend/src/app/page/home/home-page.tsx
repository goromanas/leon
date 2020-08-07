import React from 'react';
import { Button, Layout } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';
import { TopNavBar } from 'app/components/topnavbar/topnavbar';

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
                    <TopNavBar userRoles={userRoles} username={username} />
                    <PageContent>
                        <div>
                            Hello, {username}! your role is {userRoles.toString()}
                        </div>
                        <Lessons lessonsList={teacherLessons || []} />
                        {userRoles.includes('ADMIN') ? (
                            <Button type="link" onClick={this.handleClickToUserList}>
                                To user list
                            </Button>
                        ) : (
                                ''
                            )}
                    </PageContent>
                </Content>
            </Layout >
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
    // studentLessons: lessons,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
