import React from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout } from 'antd';
import Jitsi from 'react-jitsi';

import { connectContext, SettingsProps } from 'app/context';
import { PageContent } from 'app/components/layout';
import { navigationService } from 'app/service/navigation-service';
import { Whiteboard } from 'app/components/whiteboard/whiteboard';

const { Content } = Layout;

interface ContextProps {
    username: string | null;
    teacherLessons: Api.Lesson[];
    userRoles: string[] | null;
}

type OwnProps = RouteComponentProps<Params>;

interface Params {
    id: string;
}

type Props = OwnProps & ContextProps;

class HomePageComponent extends React.Component<Props, {}> {

    public render(): React.ReactNode {
        const {
            username,
            teacherLessons,
            match: {
                params: { id },
            },
        } = this.props;

        const currentLesson = teacherLessons && teacherLessons.filter((lesson) => lesson.id === parseInt(id, 10));
        const videoChatName: string = currentLesson && currentLesson[0].video.toString();

        return (
            <Layout>
                <Content>
                    <PageContent>
                        {videoChatName && (
                            <Jitsi
                                jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzLmRpY2ViZWFyLmNvbS9hcGkvbWFsZS9tZW51by1zdS1pdC5zdmciLCJuYW1lIjoiTcSXbnVvIHN1IElUIn19LCJhdWQiOiJtZW51b19zdV9pdCIsImlzcyI6Im1lbnVvX3N1X2l0Iiwic3ViIjoibWVldC5qaXRzaSIsInJvb20iOiIqIn0.6CKZU_JWLhtj9eKJ-VdFGQZyRzvTZz29fn7--_dp-jw"
                                roomName={videoChatName}
                                domain="video-menuo-su-it.northeurope.cloudapp.azure.com:443"
                                userInfo={{ email: username }}
                                displayName={username}
                                onAPILoad={handleCallEnd}
                            />
                        )}
                        <Whiteboard />
                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly generateUniqueName = (subject: string, video: string): string => {
        return subject + ' ' + video;
    };

    private readonly handleClickToDefaultPage = (): void => {
        navigationService.redirectToDefaultPage();
    };
}

const handleCallEnd = (api: any) => {
    api.addEventListener('readyToClose', () => {
        navigationService.redirectToDefaultPage();
    });
};

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    userRoles: user.roles,
    teacherLessons: lessons,
    // studentLessons: lessons,
});

const VideoChatPage = connectContext(mapContextToProps)(HomePageComponent);

export { VideoChatPage };
