import React from "react";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

interface Props {
  channels: Api.Subject[];
  currentChannel: number;
  onChannelChange: any;
}

class Channels extends React.Component<Props> {
  public componentDidMount() {
    // const { currentChannel } = this.state;
  }

  public render(): React.ReactNode {
    const { channels, currentChannel, onChannelChange } = this.props;
    return (
      <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline">
        <SubMenu key="sub1" title="Channels">
          {this.props.channels &&
            this.props.channels.map(channel => (
              <Menu.Item onClick={() => this.props.onChannelChange(channel.id)} key={channel.id}>
                {channel.name}
              </Menu.Item>
            ))}
        </SubMenu>
      </Menu>
    );
  }
}

export { Channels };
