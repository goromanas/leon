import React from 'react';
import { Button, Menu, Avatar, Layout } from 'antd';
import {
    CalendarOutlined,
    BookOutlined,
    TrophyOutlined,
    VideoCameraOutlined,
    FormOutlined,
    CodeSandboxOutlined,
} from '@ant-design/icons';

import { navigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';
import { Lessons } from 'app/page/home/timetable/day-lessons-list/lessons';

const { SubMenu } = Menu;
const { Header } = Layout;

interface OwnProps {}

interface ContextProps {
    teacherLessons: Api.Lesson[];
    username: string | null;
    userRoles: string[] | null;
}

type Props = OwnProps & ContextProps;

class TopNavBarComponent extends React.Component<Props> {
    public state = {
        current: 'mail',
        color: 'red',
        user: 'Rytis',
    };
    public handleClick = (e: any) => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    public render(): React.ReactNode {
        const { current } = this.state;

        const {
            teacherLessons,
        } = this.props;

        const currentLesson = teacherLessons && teacherLessons.filter((lesson) => lesson.status === 1);

        let lessonId: number;
        if (currentLesson != null) {
            if( currentLesson.length > 0){
            lessonId = currentLesson && parseInt(currentLesson[0].id.toString(), 10);
        }};

        return (
            <Header>
                <Menu theme="dark" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="home" onClick={() => this.handleClickToDefaultPage()}>
                        <CodeSandboxOutlined style={{ fontSize: '30px', color: 'blue' }} />
                    </Menu.Item>
                    <Menu.Item key="timetable"
                               // style={this.navStudentHandler()}
                               onClick={this.handleClickToCalendarPage} icon={<CalendarOutlined />}>
                        Tvarkaraštis
                    </Menu.Item>
                    <Menu.Item key="material" icon={<BookOutlined />}>
                        Pamokų medžiaga
                    </Menu.Item>
                    <Menu.Item key="achievements" icon={<TrophyOutlined />}>
                        Pasiekimai
                    </Menu.Item>
                    <Menu.Item key="forum" icon={<FormOutlined />}>
                        Forumas
                    </Menu.Item>

                    <SubMenu
                        title="Vartotojo parinktys"
                        icon={<Avatar size="large">{this.props.username}</Avatar>}
                        style={{ color: 'grey', float: 'right' }}
                    >
                        <Menu.ItemGroup>
                            <Menu.Item key="logout" style={{ margin: 'auto' }}>
                                <Button type="primary" onClick={this.handleClickLogout}>
                                    Atsijungti
                                </Button>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    {lessonId ?
                    <Button
                        type="primary"
                        style={{ display: 'block', float: 'right', marginTop: '15px' }}
                        icon={<VideoCameraOutlined />}
                        onClick={()=>this.handleOpenClassroom(lessonId)}
                    >
                        Į pamoką
                    </Button>
                    :''
                     }


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
    private readonly handleClickToCalendarPage=(): void => {
        navigationService.redirectToCalendarPage()
    }

    private readonly handleOpenClassroom = (id: number): void => {
        if (id) {
            navigationService.redirectToVideoChat(id);
        }
    };
}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    teacherLessons: lessons,
    username: user != null ? user.username : null,
    userRoles: user.roles,
});

const TopNavBar = connectContext(mapContextToProps)(TopNavBarComponent);

export { TopNavBar };
