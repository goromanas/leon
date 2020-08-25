import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { VideoCameraOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { Clock } from 'app/components/clock/clock';
import { Logo } from 'app/components/logo/logo';
import { Avatar } from 'app/components/avatar/avatar';

import styles from './topnavbar.module.scss';

const { Header } = Layout;

interface OwnProps { }

interface ContextProps {
    teacherLessons: Api.LessonDto[];
    username: string | null;
    userRoles: string[] | null;
    currentLesson: number;
    firstName: string | null;
}

type Props = OwnProps & ContextProps;

class TopNavBarComponent extends React.Component<Props> {
    public render(): React.ReactNode {
        const { currentLesson, userRoles, teacherLessons, firstName } = this.props;

        return (
            <Header className={styles.header} >
                <Menu mode="horizontal" className={styles.menu} defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to={navigationService.redirectToDefaultPage} key="2">
                            <Logo fontSize={'1.5rem'} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" >
                        <Link to={navigationService.redirectToDefaultPage} key="4">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="t5">
                        <Link to={navigationService.redirectToCalendarPage} key="6">Schedule</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to={navigationService.redirectToChatRoom} key="8">Chat Room</Link>
                    </Menu.Item>

                </Menu>
                <div className={styles.menuWrapper}>

                    <div className={styles.itemWrapper}>
                        <Clock />
                    </div>
                    <Link
                        to={navigationService.redirectToVideoChat(currentLesson)}
                        className={currentLesson === 0 ? styles.joinLessonDisabled : ''}
                        key="16"
                    >
                        <Button
                            size="large"
                            type="link"
                            className={styles.cameraButton}
                            shape="circle"
                            icon={<VideoCameraOutlined style={{ fontSize: '25px', color: '#000' }} />}
                        />
                        <div className={currentLesson === 0 ? styles.cameraStatusDisabled : styles.cameraStatus} />
                    </Link>
                    <div className={styles.itemWrapperButton}>
                        <Link to={navigationService.redirectToVideoChat(currentLesson)} key="13">
                            <Button disabled={currentLesson === 0 ? true : false} shape="round" type="primary" key="14" className={styles.joinButton}>
                                Join a Class
                            </Button>
                        </Link>
                    </div>

                    <div className={styles.itemWrapper}>
                        <div>
                            {teacherLessons && userRoles.includes('STUDENT') ? teacherLessons[0].className : ''}
                            {teacherLessons && userRoles.includes('TEACHER') ? firstName : ''}
                        </div>
                    </div>

                    <div className={styles.itemWrapper}>
                        {/* <Avatar className={styles.avatar} size="large" icon={<UserOutlined className={styles.userIcon} style={{ fontSize: '25px' }} />} style={{ color: 'grey' }} /> */}

                        <Avatar firstName={firstName} />
                    </div>
                    <div className={styles.itemWrapper}>
                        <LogoutOutlined data-tip="Log Out" onClick={this.handleClickLogout} style={{ fontSize: '1rem' }} />
                    </div>

                </div>
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
    firstName: user.firstName,
    userRoles: user.roles,
    currentLesson,
});

const TopNavBar = connectContext(mapContextToProps)(TopNavBarComponent);

export { TopNavBar };
