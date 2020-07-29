import React from 'react';

import { Button, Layout } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
}

interface OwnProps {
}

type Props = OwnProps & ContextProps;

class HomePageComponent extends React.Component<Props, {}> {

    public render(): React.ReactNode {
        const {
            username,
        } = this.props;

        return (
            <Layout>
                <Content>
                    <PageContent>
                        <div>
                            Hello, {username}!
                        </div>
                        <Button
                            type="primary"
                            onClick={this.handleClick}
                        >
                            Logout
                        </Button>
                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly handleClick = (): void => { navigationService.redirectToLogoutPage(); };

}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
