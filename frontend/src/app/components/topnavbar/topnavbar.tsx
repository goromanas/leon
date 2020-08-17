import React from 'react';
import { Avatar, Button, Layout, Menu } from 'antd';
import {
    CodeSandboxOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { Clock } from 'app/components/clock/clock';

import styles from './topnavbar.module.scss';

const { SubMenu } = Menu;
const { Header } = Layout;

interface OwnProps {
}

interface ContextProps {
    teacherLessons: Api.LessonDto[];
    username: string | null;
    userRoles: string[] | null;
    currentLesson: number;
}

type Props = OwnProps & ContextProps;

class TopNavBarComponent extends React.Component<Props> {

    public render(): React.ReactNode {

        const {
            currentLesson,
            username,
        } = this.props;

        return (
            <Header>

                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="logo" onClick={() => this.handleClickToDefaultPage()}>
                        <CodeSandboxOutlined style={{ fontSize: '30px', color: 'blue' }} />
                    </Menu.Item>
                    <Menu.Item
                        key="home"
                        onClick={this.handleClickToDefaultPage}
                        style={{ fontWeight: 'bold' }}
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item
                        key="timetable"
                        onClick={this.handleClickToCalendarPage}
                    >
                        Schedule
                    </Menu.Item>
                    <Menu.Item
                        key="forum"
                        onClick={this.handleOpenChatRoom}
                    >
                        Chat
                    </Menu.Item>

                    <SubMenu
                        icon={<Avatar size="large">{username}</Avatar>}
                        style={{ color: 'grey', float: 'right' }}
                    >

                        <Menu.ItemGroup>
                            <Menu.Item key="logout" style={{ margin: 'auto' }}>
                                <Button type="primary" onClick={this.handleClickLogout}>
                                    Log out
                                </Button>
                            </Menu.Item>
                        </Menu.ItemGroup>

                    </SubMenu>
                    <Menu.Item style={{ display: 'block', float: 'right' }}>
                        <Button
                            disabled={currentLesson === 0 ? true : false}
                            type="primary"

                            icon={<VideoCameraOutlined />}
                            onClick={() => this.handleOpenClassroom(currentLesson)}
                        >
                            Join a Class
                        </Button>
                    </Menu.Item>
                    <Menu.Item className={styles.modifiedItem}>
                        <Clock />
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
    private readonly handleClickLogout = (): void => {
        navigationService.redirectToLogoutPage();
    };
    // private readonly navStudentHandler = (): any =>
    //     this.props.userRoles[0] === 'STUDENT' ? { display: 'none' } : null;
    private readonly handleClickToDefaultPage = (): void => {
        navigationService.redirectToDefaultPage();
    };
    private readonly handleClickToVideoPage = (): void => {
        navigationService.redirectToVideoChat();
    };
    private readonly handleClickToCalendarPage = (): void => {
        navigationService.redirectToCalendarPage();
    };

    private readonly handleOpenClassroom = (id: number): void => {
        if (id) {
            navigationService.redirectToVideoChat(id);
        }
    };

    private readonly handleOpenChatRoom = (): void => {
        navigationService.redirectToChatRoom();
    };
}

const mapContextToProps = ({ session: { user }, lessons, currentLesson }: SettingsProps): ContextProps => ({
    teacherLessons: lessons,
    username: user != null ? user.username : null,
    userRoles: user.roles,
    currentLesson,
});

const TopNavBar = connectContext(mapContextToProps)(TopNavBarComponent);

export { TopNavBar };
