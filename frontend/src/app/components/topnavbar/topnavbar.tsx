import React from "react";
import { Avatar, Button, Layout, Menu } from "antd";
import { CodeSandboxOutlined, VideoCameraOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";

import { navigationService } from "app/service/navigation-service";
import { connectContext, SettingsProps } from "app/context";
import { Clock } from "app/components/clock/clock";
import { Logo } from "app/components/logo/logo";

import styles from "./topnavbar.module.scss";

const { SubMenu } = Menu;
const { Header } = Layout;

interface OwnProps {}

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
    const { currentLesson, username, userRoles, teacherLessons, firstName } = this.props;

    return (
      <Header className={styles.header}>
        <Menu mode="horizontal" className={styles.menu}>
          <Menu.Item key="logo">
            <Link to={navigationService.redirectToDefaultPage}>
              <Logo fontSize={"1.5rem"} />
            </Link>
          </Menu.Item>
          <Menu.Item key="home" style={{ fontWeight: "bold" }}>
            <Link to={navigationService.redirectToDefaultPage}>Home</Link>
          </Menu.Item>
          <Menu.Item key="timetable">
            <Link to={navigationService.redirectToCalendarPage}>Schedule</Link>
          </Menu.Item>
          <Menu.Item key="forum">
            <Link to={navigationService.redirectToChatRoom}>Chat Room</Link>
          </Menu.Item>

          <Menu.Item style={{ display: "block", float: "right" }}>
            <LogoutOutlined data-tip="Logout" onClick={this.handleClickLogout} style={{ fontSize: "1rem" }} />
          </Menu.Item>

          <li style={{ display: "block", float: "right", paddingLeft: "1em", paddingTop: ".6em" }}>
            <Avatar className={styles.avatar} size="large" icon={<UserOutlined className={styles.userIcon} style={{ fontSize: "25px" }} />} style={{ color: "grey", float: "right" }} />
          </li>

          <li style={{ display: "block", float: "right", paddingLeft: "1em" }}>
            {teacherLessons && userRoles.includes("STUDENT") ? teacherLessons[0].className : ""}
            {teacherLessons && userRoles.includes("TEACHER") ? firstName : ""}
          </li>
          <li style={{ display: "block", float: "right" }}>
            <Link to={navigationService.redirectToVideoChat(currentLesson)}>
              <Button disabled={currentLesson === 0 ? true : false} shape="round" type="primary">
                Join a Class
              </Button>
            </Link>
          </li>
          <Menu.Item style={{ display: "block", float: "right", paddingTop: "5px" }}>
            <Link to={navigationService.redirectToVideoChat(currentLesson)}>
              <Button size="large" type="link" className={styles.cameraButton} shape="circle" icon={<VideoCameraOutlined style={{ fontSize: "25px", color: "#000" }} />} disabled={currentLesson === 0 ? true : false} />
              <div className={currentLesson === 0 ? styles.cameraStatusDisabled : styles.cameraStatus} />
            </Link>
          </Menu.Item>
          <li className={styles.modifiedItem}>
            <Clock />
          </li>
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
  firstName: user.firstName,
  userRoles: user.roles,
  currentLesson
});

const TopNavBar = connectContext(mapContextToProps)(TopNavBarComponent);

export { TopNavBar };
