import React from 'react';
import { Button, Menu, Avatar, Layout } from 'antd';
import {
    CalendarOutlined,
    BookOutlined,
    TrophyOutlined,
    VideoCameraOutlined,
    FormOutlined,
    CodeSandboxOutlined
} from '@ant-design/icons';
import { navigationService } from 'app/service/navigation-service';

const {SubMenu} = Menu;
const {Header} = Layout;

interface Props {
    username: string | null;
    userRoles: string[] | null;
}

class TopNavBar extends React.Component<Props> {
    state = {
        current: 'mail',
        color: 'red',
        user: 'Rytis'
    };
    handleClick = (e: any) => {
        console.log('click ', e);
        this.setState({current: e.key});
    };

    render(): React.ReactNode {
        const {current} = this.state;
        return (
            <Header >

                <Menu theme="dark" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="home" onClick={()=>this.handleClickToDefaultPage()}>

                            <CodeSandboxOutlined style={{fontSize: '30px', color: 'blue '}}/>

                    </Menu.Item>
                    <Menu.Item key="timetable" style={this.navStudentHandler()} icon={<CalendarOutlined/>}>
                        Tvarkaraštis
                    </Menu.Item>
                    <Menu.Item key="material" icon={<BookOutlined/>}>
                        Pamokų medžiaga
                    </Menu.Item>
                    <Menu.Item key="achievements" icon={<TrophyOutlined/>}>
                        Pasiekimai
                    </Menu.Item>
                    <Menu.Item key="forum" icon={<FormOutlined/>}>
                        Forumas
                    </Menu.Item>


                    <SubMenu title="Vartotojo parinktys" icon={<Avatar size="large">{this.props.username}</Avatar>}
                             style={{color: 'grey', float: 'right'}}>
                        <Menu.ItemGroup>
                            <Menu.Item key="logout" style={{margin: 'auto'}}>
                                <a
                                    type="primary"
                                    onClick={this.handleClickLogout}
                                >
                                    Atsijungti
                                </a>
                            </Menu.Item>
                        </Menu.ItemGroup>

                    </SubMenu>

                    <Menu.Item style={{float: 'right'}}>
                        <Button type="primary" icon={<VideoCameraOutlined/>}>
                            Į pamoką
                        </Button>
                    </Menu.Item>

                </Menu>
            </Header>
        );
    }

    private readonly handleClickLogout = (): void => {
        navigationService.redirectToLogoutPage();
    };
    private readonly navStudentHandler = (): any => {
        return this.props.userRoles[0] === 'STUDENT' ? {display: 'none'} : null;
    };
    private readonly handleClickToDefaultPage = (): void => {
        navigationService.redirectToDefaultPage();
    };
}

export { TopNavBar };
