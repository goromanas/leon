import React from 'react';

import { Layout } from 'antd';
import Jitsi from 'react-jitsi';

import { connectContext, SettingsProps } from 'app/context';
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
                        <Jitsi
                            jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzLmRpY2ViZWFyLmNvbS9hcGkvbWFsZS9tZW51by1zdS1pdC5zdmciLCJuYW1lIjoiTcSXbnVvIHN1IElUIn19LCJhdWQiOiJtZW51b19zdV9pdCIsImlzcyI6Im1lbnVvX3N1X2l0Iiwic3ViIjoibWVldC5qaXRzaSIsInJvb20iOiIqIn0.6CKZU_JWLhtj9eKJ-VdFGQZyRzvTZz29fn7--_dp-jw"
                            roomName="java-team-room"
                            domain="video-menuo-su-it.northeurope.cloudapp.azure.com:443"
                            userInfo={{email: username}}
                        />
                    </PageContent>
                </Content>
            </Layout>
        );
    }

}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
});

const VideoChatPage = connectContext(mapContextToProps)(HomePageComponent);

export { VideoChatPage };
