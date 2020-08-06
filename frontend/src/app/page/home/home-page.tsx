import React from 'react';

import { Button, Layout } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';
import { TopNavBar } from 'app/components/topnavbar/topnavbar';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;

}

type Props = ContextProps;

class HomePageComponent extends React.Component<Props> {
    // public const ifAdmin: boolean = userRoles.includes('ADMIN');

    public render(): React.ReactNode {
        const {
            username,
            userRoles,
        } = this.props;

        return (
            <Layout >
                <Content>

                    <TopNavBar  userRoles={userRoles} username={username} />
                    <PageContent>
                        <div>
                            Hello, {username}! your role is {userRoles.toString()}


                        </div>
                        {userRoles.includes('ADMIN') ? (<Button type="link"
                                    onClick={this.handleClickToUserList}
                                >
                                    To user list
                                </Button>
                            )
                            :
                            (
                                <Button
                                    type="link"
                                    onClick={this.handleClickToVideoChat}
                                >
                                    To video chat
                                </Button>
                            )

                        }


                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly handleClickToUserList = (): void => {
        navigationService.redirectToUserListPage();
    };

    private readonly handleClickToVideoChat = (): void => {
        navigationService.redirectToVideoChat();
    };
}

const mapContextToProps = ({session: {user}}: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    userRoles: user.roles,

});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
